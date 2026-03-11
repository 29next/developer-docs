/**
 * Generates fumadocs-openapi MDX pages from the OpenAPI YAML specs.
 * Run before `next build` — already wired into the "build" npm script.
 *
 * Output locations (under content/docs/):
 *   admin-api/reference/          ← 2024-04-01 (stable, shown in sidebar)
 *   admin-api/reference/2023-02-10/  ← hidden from sidebar
 *   admin-api/reference/unstable/    ← hidden from sidebar
 *   campaigns/api/reference/         ← v1 (only version, shown in sidebar)
 */

import { generateFiles } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';
import { readdirSync, writeFileSync, mkdirSync, readFileSync, rmSync, existsSync } from 'fs';
import { join } from 'path';

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

const VERSION_SUBFOLDERS = ['2023-02-10', 'unstable'];

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
    output: 'content/docs/campaigns/api/reference',
    urlBase: '/docs/campaigns/api/reference',
  },
];

const allMethods = {};

for (const spec of specs) {
  console.log(`Generating API docs from ${spec.input[0]}...`);
  const openapi = createOpenAPI({ input: spec.input });
  await generateFiles({
    input: openapi,
    output: spec.output,
  });
  console.log(`  → ${spec.output}`);

  collectMethods(spec.output, spec.urlBase, allMethods);
}

// For the default admin-api reference dir, write a meta.json with root:true
const refDir = 'content/docs/admin-api/reference';
const tagFolders = readdirSync(refDir, { withFileTypes: true })
  .filter(e => e.isDirectory() && !VERSION_SUBFOLDERS.includes(e.name))
  .map(e => e.name)
  .sort();
writeFileSync(
  join(refDir, 'meta.json'),
  JSON.stringify({ pages: tagFolders }, null, 2),
);
console.log(`Wrote reference/meta.json with tag folders: ${tagFolders.join(', ')}`);

// For each versioned subfolder, write a meta.json listing tag folders
for (const version of VERSION_SUBFOLDERS) {
  const versionDir = join(refDir, version);
  if (!existsSync(versionDir)) continue;
  const versionTagFolders = readdirSync(versionDir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name)
    .sort();
  writeFileSync(
    join(versionDir, 'meta.json'),
    JSON.stringify({ pages: versionTagFolders }, null, 2),
  );
  console.log(`Wrote reference/${version}/meta.json`);
}

// Write the URL → method map for the sidebar badges
mkdirSync('lib/generated', { recursive: true });
writeFileSync('lib/generated/api-methods.json', JSON.stringify(allMethods, null, 2));
console.log(`Wrote lib/generated/api-methods.json (${Object.keys(allMethods).length} endpoints)`);

console.log('API docs generation complete.');
