/**
 * Generates fumadocs-openapi MDX pages from the OpenAPI YAML specs.
 * Run before `next build` — already wired into the "build" npm script.
 *
 * Output locations (under content/docs/):
 *   admin-api/reference/             ← 2024-04-01 (stable, REST endpoints only)
 *   admin-api/reference/2023-02-10/  ← REST endpoints only
 *   admin-api/reference/unstable/    ← REST endpoints only
 *   campaigns/api/                   ← stable (current version)
 *   campaigns/api/<version>/         ← future versioned releases
 *   webhooks/reference/              ← webhook events from 2024-04-01, grouped by tag
 *   webhooks/reference/2023-02-10/   ← webhook events, legacy version
 *   webhooks/reference/unstable/     ← webhook events, unstable version
 *
 * Versioning strategy (consistent across Admin API, Campaigns, Webhooks):
 *   - Stable content lives directly in the base output dir (reference/ or api/)
 *   - Each additional version gets its own subdir with root:true in meta.json
 *   - root:true version subdirs are discovered automatically by fumadocs — they
 *     are NOT listed in the parent pages array (that would make them appear as
 *     duplicate sidebar items)
 *   - DocsLayout sidebar.tabs.transform filters version roots from the section dropdown
 */

import { generateFiles } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';
import { readdirSync, writeFileSync, mkdirSync, readFileSync, rmSync, existsSync } from 'fs';
import { join } from 'path';
import yaml from 'js-yaml';

/**
 * Fix webhook schemas in admin API YAML files so fumadocs-openapi renders them correctly.
 * The Python webhooks.py tool historically generated schemas without `type: object` on the
 * root and used array-style types like `["string"]` instead of `"string"`.
 */
function fixWebhookSchemas(specPath) {
  const raw = readFileSync(specPath, 'utf8');
  const spec = yaml.load(raw);
  if (!spec.webhooks) return;
  const version = spec.info?.version ?? '';

  for (const [eventName, pathItem] of Object.entries(spec.webhooks)) {
    const post = pathItem.post;
    if (!post) continue;

    // Fix responses misplaced at path-item level (should be inside post)
    if (pathItem.responses && !post.responses) {
      post.responses = pathItem.responses;
      delete pathItem.responses;
    }

    const contentJson = post.requestBody?.content?.['application/json'];
    if (!contentJson) continue;
    const schema = contentJson.schema;
    if (!schema) continue;

    // Add missing type: object to root schema
    if (!schema.type) schema.type = 'object';

    // Recursively fix type arrays → strings
    fixTypes(schema);

    // Generate example payload if not already present
    if (!contentJson.example) {
      const dataSchema = schema.properties?.data;
      const objectName = schema.properties?.object?.examples?.[0] ?? eventName.split('.')[0];
      contentJson.example = {
        api_version: version,
        object: objectName,
        data: generateExample(dataSchema, 0),
        event_id: 'a7a26ff2-e851-45b6-9634-d595f45458b7',
        event_type: eventName,
        webhook: {
          id: 1,
          store: 'example',
          events: [eventName],
          target: 'https://example.com/webhook/',
        },
      };
    }
  }

  writeFileSync(specPath, yaml.dump(spec, { lineWidth: -1 }));
}

function generateExample(schema, depth) {
  if (!schema || typeof schema !== 'object' || depth > 4) return null;
  const t = Array.isArray(schema.type) ? schema.type.filter(x => x !== 'null')[0] : schema.type;
  if (schema.example !== undefined) return schema.example;
  if (schema.examples?.length) return schema.examples[0];
  if (t === 'object' || schema.properties) {
    const props = schema.properties ?? {};
    return Object.fromEntries(Object.entries(props).map(([k, v]) => [k, generateExample(v, depth + 1)]));
  }
  if (t === 'array') return schema.items ? [generateExample(schema.items, depth + 1)].filter(x => x !== null) : [];
  if (t === 'integer') return schema.default ?? 0;
  if (t === 'number') return schema.default ?? 0.0;
  if (t === 'boolean') return schema.default ?? false;
  if (t === 'string') {
    const fmt = schema.format ?? '';
    if (fmt === 'date-time') return '2024-01-01T00:00:00Z';
    if (fmt === 'date') return '2024-01-01';
    if (fmt === 'uuid') return 'a7a26ff2-e851-45b6-9634-d595f45458b7';
    if (fmt === 'uri') return 'https://example.com';
    if (fmt === 'email') return 'user@example.com';
    if (fmt === 'decimal') return '0.00';
    return schema.default ?? 'string';
  }
  return null;
}

function fixTypes(obj) {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) { obj.forEach(fixTypes); return; }
  if (Array.isArray(obj.type)) {
    obj.type = obj.type.filter(t => t !== 'null')[0] ?? 'string';
  }
  if (Array.isArray(obj.format)) obj.format = obj.format[0];
  for (const val of Object.values(obj)) fixTypes(val);
}

// Remove stale directories from previous generation layout
const STALE_DIRS = [
  'content/docs/admin-api/reference/2024-04-01',
  'content/docs/campaigns/api/reference/v1',
];
for (const dir of STALE_DIRS) {
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true });
    console.log(`Removed stale directory: ${dir}`);
  }
}

// Admin API + Webhooks share date-based versioning (2023-02-10, unstable)
const VERSION_SUBFOLDERS = ['2023-02-10', 'unstable'];

// Campaigns version subfolders — empty now (v1 is the stable/base), add future versions here
// e.g. ['2025-01-01', 'unstable'] when a new version is introduced
const CAMPAIGNS_VERSION_SUBFOLDERS = [];

// Webhook event file names (dot-separated) to exclude from REST reference generation
// and redirect to the webhooks section instead
function isWebhookFile(filename) {
  return filename.includes('.');
}

/**
 * Extract the tag order from an OpenAPI spec by first-appearance in paths.
 * Returns an array of tag names in spec order.
 */
function getTagOrder(specPath) {
  const raw = readFileSync(specPath, 'utf8');
  const spec = yaml.load(raw);
  if (spec.tags?.length) return spec.tags.map(t => t.name);
  const seen = [];
  for (const methods of Object.values(spec.paths ?? {})) {
    for (const op of Object.values(methods)) {
      if (!op || typeof op !== 'object') continue;
      for (const tag of op.tags ?? []) {
        if (!seen.includes(tag)) seen.push(tag);
      }
    }
  }
  return seen;
}

/**
 * Sort tag folders to match spec order; any folders not in spec go at the end alphabetically.
 */
function sortBySpecOrder(folders, specOrder) {
  return [
    ...specOrder.filter(t => folders.includes(t)),
    ...folders.filter(t => !specOrder.includes(t)).sort(),
  ];
}

/**
 * Scan generated MDX files and return a map of URL path → HTTP method.
 * urlBase is the /docs/... prefix for this output directory.
 */
function collectMethods(dir, urlBase, map = {}) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      collectMethods(fullPath, `${urlBase}/${entry.name}`, map);
    } else if (entry.name.endsWith('.mdx')) {
      const content = readFileSync(fullPath, 'utf8');
      const match = content.match(/^_openapi:\s*\n(?:[ \t]+\S[^\n]*\n)*?[ \t]+method:\s*(\w+)/m);
      if (match) {
        const slug = entry.name.replace(/\.mdx$/, '');
        map[`${urlBase}/${slug}`] = match[1].toUpperCase();
      }
    }
  }
  return map;
}

const specs = [
  {
    input: ['public/api/admin/2024-04-01.yaml'],
    output: 'content/docs/admin-api/reference',
    urlBase: '/docs/admin-api/reference',
  },
  {
    input: ['public/api/admin/2023-02-10.yaml'],
    output: 'content/docs/admin-api/reference/2023-02-10',
    urlBase: '/docs/admin-api/reference/2023-02-10',
    hidden: true,
  },
  {
    input: ['public/api/admin/unstable.yaml'],
    output: 'content/docs/admin-api/reference/unstable',
    urlBase: '/docs/admin-api/reference/unstable',
    hidden: true,
  },
  {
    input: ['public/api/campaigns/v1.yaml'],
    output: 'content/docs/campaigns/api',
    urlBase: '/docs/campaigns/api',
  },
];

// Fix webhook schemas in admin API YAML files before generating MDX
for (const adminSpec of ['public/api/admin/2024-04-01.yaml', 'public/api/admin/2023-02-10.yaml', 'public/api/admin/unstable.yaml']) {
  fixWebhookSchemas(adminSpec);
  console.log(`Fixed webhook schemas in ${adminSpec}`);
}

const allMethods = {};

// Pre-clean admin-api reference dirs before regeneration so stale flat camelCase
// files from old generator runs don't linger alongside the tag-grouped subfolders.
function cleanRefDir(dir, keepSubdirs = []) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!keepSubdirs.includes(entry.name)) rmSync(full, { recursive: true });
    } else if (entry.name.endsWith('.mdx') || entry.name === 'meta.json') {
      rmSync(full);
    }
  }
}

// Clean stable reference dir (preserve versioned subdirs; they're regenerated separately)
cleanRefDir(specs[0].output, VERSION_SUBFOLDERS);
// Clean versioned subdirs entirely (regenerated fresh below)
for (const version of VERSION_SUBFOLDERS) {
  const vdir = join(specs[0].output, version);
  if (existsSync(vdir)) rmSync(vdir, { recursive: true });
  mkdirSync(vdir, { recursive: true });
}

// Generate REST endpoint docs (excluding webhook event files), grouped by tag
for (const spec of specs) {
  console.log(`Generating API docs from ${spec.input[0]}...`);
  const openapi = createOpenAPI({ input: spec.input });
  await generateFiles({
    input: openapi,
    output: spec.output,
    groupBy: 'tag',
    beforeWrite(files) {
      const keep = files.filter(f => !isWebhookFile(f.path.split('/').pop().replace('.mdx', '')));
      files.splice(0, files.length, ...keep);
    },
  });
  console.log(`  → ${spec.output}`);

  collectMethods(spec.output, spec.urlBase, allMethods);
}

// Generate webhook docs for all API versions, grouped by tag
const WEBHOOK_SPECS = [
  { input: 'public/api/admin/2024-04-01.yaml', output: 'content/docs/webhooks/reference' },
  { input: 'public/api/admin/2023-02-10.yaml', output: 'content/docs/webhooks/reference/2023-02-10' },
  { input: 'public/api/admin/unstable.yaml',   output: 'content/docs/webhooks/reference/unstable' },
];

// Clean up stable output dir before regenerating; versioned dirs cleaned per-run below
const webhookOutput = 'content/docs/webhooks/reference';
if (existsSync(webhookOutput)) rmSync(webhookOutput, { recursive: true });
mkdirSync(webhookOutput, { recursive: true });

function webhookBeforeWrite(files) {
  // Keep only webhook event files (dot-separated names like cart.abandoned.mdx)
  const keep = files.filter(f => isWebhookFile(f.path.split('/').pop().replace('.mdx', '')));
  files.splice(0, files.length, ...keep);
  // Replace generated title (e.g. "Created") with the full event name (e.g. "gateway.created")
  for (const file of files) {
    const eventName = file.path.split('/').pop().replace('.mdx', '');
    file.content = file.content.replace(/^title:.*$/m, `title: ${eventName}`);
  }
}

for (const wspec of WEBHOOK_SPECS) {
  console.log(`Generating webhook docs from ${wspec.input}...`);
  mkdirSync(wspec.output, { recursive: true });
  const wOpenapi = createOpenAPI({ input: [wspec.input] });
  await generateFiles({
    input: wOpenapi,
    output: wspec.output,
    groupBy: 'tag',
    beforeWrite: webhookBeforeWrite,
  });
  console.log(`  → ${wspec.output}`);

  // Write meta.json for this version's tag subfolders
  const tagFolders = readdirSync(wspec.output, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name)
    .sort();
  // root:true version subdirs are discovered automatically by fumadocs — don't add to pages array
  const pages = tagFolders;
  // Version subdirectories get root:true so fumadocs treats them as separate section roots
  const metaObj = wspec.output === webhookOutput
    ? { title: 'Webhook Event Reference', pages }
    : { root: true, title: 'Webhook Event Reference', pages };
  writeFileSync(
    join(wspec.output, 'meta.json'),
    JSON.stringify(metaObj, null, 2),
  );
  console.log(`Wrote ${wspec.output}/meta.json with tags: ${tagFolders.join(', ')}`);
}

// For the default admin-api reference dir, write a meta.json listing tag folders
const refDir = 'content/docs/admin-api/reference';
const stableTagOrder = getTagOrder(specs[0].input[0]);
const tagFolders = sortBySpecOrder(
  readdirSync(refDir, { withFileTypes: true })
    .filter(e => e.isDirectory() && !VERSION_SUBFOLDERS.includes(e.name))
    .map(e => e.name),
  stableTagOrder,
);
// root:true version subdirs are discovered automatically — don't add to pages array
writeFileSync(
  join(refDir, 'meta.json'),
  JSON.stringify({ title: 'API Reference', pages: tagFolders }, null, 2),
);
console.log(`Wrote reference/meta.json with tag folders: ${tagFolders.join(', ')}`);

// For each admin-api versioned subfolder, write a meta.json with root:true
for (const version of VERSION_SUBFOLDERS) {
  const versionDir = join(refDir, version);
  if (!existsSync(versionDir)) continue;
  const versionSpecPath = specs.find(s => s.output === versionDir)?.input[0] ?? specs[0].input[0];
  const versionTagOrder = getTagOrder(versionSpecPath);
  const versionTagFolders = sortBySpecOrder(
    readdirSync(versionDir, { withFileTypes: true })
      .filter(e => e.isDirectory())
      .map(e => e.name),
    versionTagOrder,
  );
  writeFileSync(
    join(versionDir, 'meta.json'),
    JSON.stringify({ root: true, title: 'API Reference', pages: versionTagFolders }, null, 2),
  );
  console.log(`Wrote reference/${version}/meta.json`);
}

// For the campaigns api dir, write a meta.json listing tag folders (same pattern as admin-api)
const campaignsApiDir = 'content/docs/campaigns/api';
const campaignsTagOrder = getTagOrder(specs.find(s => s.output === campaignsApiDir).input[0]);
const campaignsTagFolders = sortBySpecOrder(
  readdirSync(campaignsApiDir, { withFileTypes: true })
    .filter(e => e.isDirectory() && !CAMPAIGNS_VERSION_SUBFOLDERS.includes(e.name))
    .map(e => e.name),
  campaignsTagOrder,
);
// root:true version subdirs are discovered automatically — don't add to pages array
writeFileSync(
  join(campaignsApiDir, 'meta.json'),
  JSON.stringify({ title: 'API Reference', pages: campaignsTagFolders }, null, 2),
);
console.log(`Wrote campaigns/api/meta.json with tag folders: ${campaignsTagFolders.join(', ')}`);

// For each campaigns versioned subfolder, write a meta.json with root:true
for (const version of CAMPAIGNS_VERSION_SUBFOLDERS) {
  const versionDir = join(campaignsApiDir, version);
  if (!existsSync(versionDir)) continue;
  const versionTagFolders = readdirSync(versionDir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name)
    .sort();
  writeFileSync(
    join(versionDir, 'meta.json'),
    JSON.stringify({ root: true, title: 'API Reference', pages: versionTagFolders }, null, 2),
  );
  console.log(`Wrote campaigns/api/${version}/meta.json`);
}

// Write the URL → method map for the sidebar badges
mkdirSync('lib/generated', { recursive: true });
writeFileSync('lib/generated/api-methods.json', JSON.stringify(allMethods, null, 2));
console.log(`Wrote lib/generated/api-methods.json (${Object.keys(allMethods).length} endpoints)`);

// Collect endpoint data for AI search indexing (stable specs only — no duplicates from old versions)
function collectEndpointData(spec, urlBase) {
  const endpoints = [];
  for (const [path, methods] of Object.entries(spec.paths ?? {})) {
    for (const [method, op] of Object.entries(methods)) {
      if (!op || typeof op !== 'object' || !op.operationId) continue;
      // Skip webhook events (dot-separated operationIds)
      if (op.operationId.includes('.')) continue;
      const tag = op.tags?.[0];
      if (!tag) continue;

      const url = `${urlBase}/${tag}/${op.operationId}`;

      // Query/path parameters (skip generic header params)
      const params = (op.parameters ?? [])
        .filter(p => p.in !== 'header')
        .map(p => `${p.name} (${p.in})${p.description ? ': ' + p.description.split('\n')[0].slice(0, 80) : ''}`);

      // Request body fields (shallow — resolve one level of $ref)
      const bodyFields = [];
      const bodyContent = op.requestBody?.content;
      if (bodyContent) {
        const schema = bodyContent['application/json']?.schema ?? bodyContent['multipart/form-data']?.schema;
        if (schema) {
          let resolved = schema;
          if (schema.$ref) {
            const schemaName = schema.$ref.split('/').pop();
            resolved = spec.components?.schemas?.[schemaName] ?? {};
          }
          for (const [fieldName, fieldDef] of Object.entries(resolved.properties ?? {})) {
            const desc = fieldDef.description ? ': ' + fieldDef.description.split('\n')[0].slice(0, 80) : '';
            bodyFields.push(`${fieldName}${desc}`);
          }
        }
      }

      const contentParts = [`${method.toUpperCase()} ${path}`, op.description || op.summary || ''];
      if (params.length) contentParts.push(`Parameters: ${params.join(', ')}`);
      if (bodyFields.length) contentParts.push(`Request fields: ${bodyFields.join(', ')}`);

      endpoints.push({
        url,
        title: `${method.toUpperCase()} ${path}`,
        description: op.description || op.summary || '',
        content: contentParts.join('\n'),
      });
    }
  }
  return endpoints;
}

const allEndpoints = [];
for (const spec of specs.filter(s => !s.hidden)) {
  const specData = yaml.load(readFileSync(spec.input[0], 'utf8'));
  allEndpoints.push(...collectEndpointData(specData, spec.urlBase));
}
writeFileSync('lib/generated/api-endpoints.json', JSON.stringify(allEndpoints, null, 2));
console.log(`Wrote lib/generated/api-endpoints.json (${allEndpoints.length} endpoints)`);

console.log('API docs generation complete.');
