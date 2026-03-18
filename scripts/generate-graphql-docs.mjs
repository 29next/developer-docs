/**
 * Generates Storefront GraphQL API reference docs using @graphql-markdown/cli,
 * then post-processes the output for fumadocs compatibility:
 *   - Flattens operations/ to just queries/ and mutations/
 *   - Removes types/ and directives/ (all types are inline)
 *   - Preserves hand-written index.mdx and meta.json
 *   - Replaces operation pages with structured two-column layout
 *
 * Run before `next build` — wired into the "build" and "dev" npm scripts.
 *
 * Output: content/docs/storefront/graphql/
 */

import { execSync } from 'child_process';
import {
  writeFileSync, renameSync, existsSync, rmSync, mkdirSync,
  readFileSync, readdirSync,
} from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// ── Paths anchored to project root ──────────────────────────────────────────

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const GRAPHQL_DIR = join(ROOT, 'content/docs/storefront/graphql');
const SCHEMA_URL = 'https://sandbox.29next.store/api/graphql/';

// ── Step 1: Preserve hand-written files ─────────────────────────────────────

const PRESERVE_FILES = ['index.mdx', 'meta.json'];
const preserved = {};
for (const file of PRESERVE_FILES) {
  const p = join(GRAPHQL_DIR, file);
  if (existsSync(p)) {
    preserved[file] = readFileSync(p, 'utf8');
  }
}

// ── Step 2: Generate to temp dir, then swap ─────────────────────────────────

const TEMP_DIR = join(ROOT, 'content/docs/storefront/.graphql-tmp');

// Clean temp dir
if (existsSync(TEMP_DIR)) rmSync(TEMP_DIR, { recursive: true });

// gqlmd reads rootPath from graphql.config.mjs — we need to temporarily
// point it at the temp dir. Instead, generate to the normal dir then move.
// First clean the target.
if (existsSync(GRAPHQL_DIR)) rmSync(GRAPHQL_DIR, { recursive: true });

try {
  execSync('npx gqlmd graphql-to-doc', { stdio: 'inherit', cwd: ROOT });
} catch (err) {
  // Restore preserved files so the site still has a GraphQL section
  console.error('gqlmd failed:', err.message);
  mkdirSync(GRAPHQL_DIR, { recursive: true });
  for (const [file, content] of Object.entries(preserved)) {
    writeFileSync(join(GRAPHQL_DIR, file), content);
  }
  console.warn('Restored preserved files. GraphQL reference pages will be missing until schema is available.');
  process.exit(0);
}

// ── Step 3: Post-process — flatten to just queries & mutations ──────────────

const opsDir = join(GRAPHQL_DIR, 'operations');

// Move queries/ and mutations/ up from operations/ to graphql/
for (const sub of ['queries', 'mutations']) {
  const src = join(opsDir, sub);
  const dest = join(GRAPHQL_DIR, sub);
  if (existsSync(src)) {
    if (existsSync(dest)) rmSync(dest, { recursive: true });
    renameSync(src, dest);
  }
}

// Remove the now-empty operations/, types/ dirs
for (const dir of ['operations', 'types']) {
  const p = join(GRAPHQL_DIR, dir);
  if (existsSync(p)) rmSync(p, { recursive: true });
}

// Remove the generated landing page (we maintain a custom index.mdx)
const generatedPath = join(GRAPHQL_DIR, 'generated.md');
if (existsSync(generatedPath)) rmSync(generatedPath);

// Restore hand-written files that were preserved before the clean
for (const [file, content] of Object.entries(preserved)) {
  writeFileSync(join(GRAPHQL_DIR, file), content);
}

// ── Step 4: Introspect schema ───────────────────────────────────────────────

async function introspectSchema() {
  const query = `{
    __schema {
      queryType { name }
      mutationType { name }
      types {
        name
        kind
        description
        fields { name description type { ...TypeRef } args { name description type { ...TypeRef } defaultValue } }
        inputFields { name description type { ...TypeRef } defaultValue }
        enumValues { name }
      }
    }
  }
  fragment TypeRef on __Type {
    kind name
    ofType { kind name ofType { kind name ofType { kind name ofType { kind name } } } }
  }`;

  const res = await fetch(SCHEMA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) throw new Error(`Schema introspection failed: ${res.status} ${res.statusText}`);
  const json = await res.json();
  return json.data.__schema;
}

function buildTypeMap(schema) {
  const map = {};
  for (const t of schema.types) {
    map[t.name] = t;
  }
  return map;
}

function unwrapType(typeRef) {
  let t = typeRef;
  while (t.ofType) t = t.ofType;
  return t;
}

function printTypeRef(typeRef) {
  if (!typeRef) return 'Unknown';
  if (typeRef.kind === 'NON_NULL') return `${printTypeRef(typeRef.ofType)}!`;
  if (typeRef.kind === 'LIST') return `[${printTypeRef(typeRef.ofType)}]`;
  return typeRef.name || 'Unknown';
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function toKebabCase(name) {
  return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/** Compute badge labels for a type reference. */
function typeBadges(typeRef) {
  const badges = [];
  if (typeRef.kind === 'NON_NULL') badges.push('non-null');
  let t = typeRef;
  while (t.ofType) {
    if (t.kind === 'LIST') badges.push('list');
    t = t.ofType;
  }
  const named = unwrapType(typeRef);
  if (['SCALAR', 'ENUM', 'OBJECT', 'INPUT_OBJECT', 'INTERFACE'].includes(named.kind)) {
    const label = named.kind === 'INPUT_OBJECT' ? 'input' : named.kind.toLowerCase();
    badges.push(label);
  }
  return badges;
}

/**
 * Build structured field data, recursively expanding all object/input types
 * inline so they render as accordions rather than links to separate pages.
 *
 * Uses a `seen` set for cycle detection (self-referencing types like Node).
 */
function buildFieldData(fieldDef, typeMap, seen = new Set()) {
  const named = unwrapType(fieldDef.type);
  const field = {
    name: fieldDef.name,
    type: printTypeRef(fieldDef.type),
    description: fieldDef.description || undefined,
    badges: typeBadges(fieldDef.type),
  };

  // Skip expansion if we've already seen this type (cycle) or it's an introspection type
  if (named.name && !named.name.startsWith('__') && !seen.has(named.name)) {
    const childType = typeMap[named.name];
    const nextSeen = new Set(seen);
    nextSeen.add(named.name);

    if (childType?.kind === 'OBJECT' && childType.fields) {
      field.fields = childType.fields.map(f => buildFieldData(f, typeMap, nextSeen));
    } else if (childType?.kind === 'INPUT_OBJECT' && childType.inputFields) {
      field.fields = childType.inputFields.map(f => buildFieldData(f, typeMap, nextSeen));
    }
  }

  return field;
}

// ── Example value generation ────────────────────────────────────────────────

const SCALAR_EXAMPLES = {
  String: '<your-value>',
  Int: 1,
  Float: 1.0,
  Boolean: true,
  ID: '<id>',
  DateTime: '2026-01-01T00:00:00Z',
  Date: '2026-01-01',
  GenericScalar: {},
  JSONString: '{}',
  UUID: '550e8400-e29b-41d4-a716-446655440000',
  Decimal: '10.00',
  PositiveDecimal: '10.00',
};

function scalarExample(name) {
  return SCALAR_EXAMPLES[name];
}

function exampleValue(typeRef, typeMap, depth = 0) {
  if (!typeRef) return null;
  const isList = typeRef.kind === 'LIST' || (typeRef.kind === 'NON_NULL' && typeRef.ofType?.kind === 'LIST');
  const named = unwrapType(typeRef);

  if (depth > 3) return '...';

  const scalar = scalarExample(named.name);
  if (scalar !== undefined) return isList ? [scalar] : scalar;

  const typeDef = typeMap[named.name];
  if (!typeDef) return null;

  if (typeDef.kind === 'ENUM') {
    const val = typeDef.enumValues?.[0]?.name ?? 'VALUE';
    return isList ? [val] : val;
  }

  if (typeDef.kind === 'INPUT_OBJECT' && typeDef.inputFields) {
    const obj = {};
    for (const field of typeDef.inputFields) {
      obj[field.name] = exampleValue(field.type, typeMap, depth + 1);
    }
    return isList ? [obj] : obj;
  }

  return isList ? [] : null;
}

/**
 * Generate an example response value for output types (OBJECT fields).
 * Similar to exampleValue but expands OBJECT types instead of INPUT_OBJECT.
 */
function exampleResponseValue(typeRef, typeMap, depth = 0, seen = new Set()) {
  if (!typeRef) return null;
  const isList = typeRef.kind === 'LIST' || (typeRef.kind === 'NON_NULL' && typeRef.ofType?.kind === 'LIST');
  const named = unwrapType(typeRef);

  if (depth > 3) return '...';

  const scalar = scalarExample(named.name);
  if (scalar !== undefined) return isList ? [scalar] : scalar;

  const typeDef = typeMap[named.name];
  if (!typeDef) return null;

  if (typeDef.kind === 'ENUM') {
    const val = typeDef.enumValues?.[0]?.name ?? 'VALUE';
    return isList ? [val] : val;
  }

  // Cycle detection
  if (seen.has(named.name)) return isList ? [] : null;
  const nextSeen = new Set(seen);
  nextSeen.add(named.name);

  if (typeDef.kind === 'OBJECT' && typeDef.fields) {
    const obj = {};
    for (const field of typeDef.fields) {
      obj[field.name] = exampleResponseValue(field.type, typeMap, depth + 1, nextSeen);
    }
    return isList ? [obj] : obj;
  }

  if (typeDef.kind === 'INPUT_OBJECT' && typeDef.inputFields) {
    const obj = {};
    for (const field of typeDef.inputFields) {
      obj[field.name] = exampleResponseValue(field.type, typeMap, depth + 1, nextSeen);
    }
    return isList ? [obj] : obj;
  }

  return isList ? [] : null;
}

/**
 * Build a sample JSON response for an operation, wrapping in { "data": { operationName: ... } }.
 */
function buildExampleResponse(operationField, typeMap) {
  const responseValue = exampleResponseValue(operationField.type, typeMap);
  return {
    data: {
      [operationField.name]: responseValue,
    },
  };
}

// ── Operation example builder ───────────────────────────────────────────────

function buildOperationExample(operationField, operationType, typeMap) {
  const name = operationField.name;
  const args = operationField.args || [];
  const returnTypeRef = operationField.type;
  const returnNamed = unwrapType(returnTypeRef);

  // Signature
  const varDefs = args.map(a => `$${a.name}: ${printTypeRef(a.type)}`).join(', ');
  const argPassing = args.map(a => `${a.name}: $${a.name}`).join(', ');

  const returnTypeDef = typeMap[returnNamed.name];
  let selectionFields = '';
  if (returnTypeDef?.fields) {
    const fieldLines = returnTypeDef.fields
      .filter(f => {
        const inner = unwrapType(f.type);
        const innerDef = typeMap[inner.name];
        return !innerDef || innerDef.kind === 'SCALAR' || innerDef.kind === 'ENUM';
      })
      .map(f => `    ${f.name}`)
      .slice(0, 10);
    selectionFields = fieldLines.join('\n');
  }

  const hasArgs = args.length > 0;
  const opType = operationType === 'mutation' ? 'mutation' : 'query';

  let signature = `${opType} ${capitalize(name)}`;
  if (hasArgs) signature += `(${varDefs})`;
  signature += ` {\n  ${name}`;
  if (hasArgs) signature += `(${argPassing})`;
  if (selectionFields) signature += ` {\n${selectionFields}\n  }`;
  signature += '\n}';

  const variables = {};
  for (const arg of args) {
    variables[arg.name] = exampleValue(arg.type, typeMap);
  }

  // Structured arg data
  const argsData = args.map(a => buildFieldData(a, typeMap));

  // Structured return type data
  const returnFields = returnTypeDef?.fields?.map(f => buildFieldData(f, typeMap)) ?? [];

  // Example response JSON
  const exampleResponse = buildExampleResponse(operationField, typeMap);

  return {
    signature,
    variables,
    argsData,
    returnFields,
    returnTypeName: returnNamed.name,
    description: operationField.description || '',
    exampleResponse,
  };
}

// ── Step 5: Rewrite operation pages ─────────────────────────────────────────

async function injectExamples() {
  let schema;
  try {
    schema = await introspectSchema();
  } catch (err) {
    console.warn('Could not introspect schema for examples:', err.message);
    console.warn('Skipping example injection — pages will render without examples.');
    return;
  }

  const typeMap = buildTypeMap(schema);

  const operationTypes = [
    { kind: 'query', typeName: schema.queryType?.name, dir: 'queries' },
    { kind: 'mutation', typeName: schema.mutationType?.name, dir: 'mutations' },
  ];

  let injected = 0;

  for (const { kind, typeName, dir } of operationTypes) {
    if (!typeName) continue;
    const typeDef = typeMap[typeName];
    if (!typeDef?.fields) continue;

    const dirPath = join(GRAPHQL_DIR, dir);
    if (!existsSync(dirPath)) continue;

    for (const field of typeDef.fields) {
      const filename = `${toKebabCase(field.name)}.mdx`;
      const filepath = join(dirPath, filename);
      if (!existsSync(filepath)) continue;

      const {
        signature, variables, argsData, returnFields,
        returnTypeName, description, exampleResponse,
      } = buildOperationExample(field, kind, typeMap);

      const variablesJson = JSON.stringify(variables, null, 2);
      const responseJson = JSON.stringify(exampleResponse, null, 2);
      const argsJson = JSON.stringify(argsData);
      const returnFieldsJson = JSON.stringify(returnFields);

      // Build a complete new MDX file replacing the graphql-markdown output
      const title = field.name;
      const mdx = `---
id: ${toKebabCase(field.name)}
title: ${title}
full: true
---

import { GraphQLOperation } from '@/components/graphql-operation';

<GraphQLOperation
  type="${kind}"
  name="${title}"
  description={${JSON.stringify(description || `${capitalize(kind)} for ${title}`)}}
  signature={${JSON.stringify(signature)}}
  variablesExample={${JSON.stringify(variablesJson)}}
  responseExample={${JSON.stringify(responseJson)}}
  args={${argsJson}}
  returnType="${returnTypeName}"
  returnFields={${returnFieldsJson}}
/>
`;

      writeFileSync(filepath, mdx);
      injected++;
    }
  }

  console.log(`Injected examples into ${injected} operation pages.`);
}

await injectExamples();
console.log(`GraphQL docs post-processed in "${GRAPHQL_DIR}".`);
