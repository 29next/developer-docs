# Admin API & Webhooks Reference Generation

## Overview

The Admin API, Campaigns API, and Webhook reference docs are generated from OpenAPI YAML specs through a two-phase pipeline: Python tools download and enrich the specs, then a Node.js script generates MDX pages for fumadocs.

## Pipeline

### Phase 1: Python — Schema Download & Webhook Generation

Run manually when API specs change:

```bash
cd tools && python update_api_docs.py
```

**Scripts:**
- `tools/update_api_docs.py` — Downloads OpenAPI specs from live endpoints, injects webhook schemas, applies overlays (server definitions, auth, descriptions), saves to `public/api/`
- `tools/config.py` — Central configuration: API versions, remote URLs, webhook event registry (21 events), custom payloads, server/auth overlays
- `tools/webhooks.py` — Generates webhook event schemas by resolving `$ref` chains from REST API object schemas, flattening `allOf`/`oneOf`, and building example payloads

**Remote spec sources:**
- Admin API: `https://sandbox.29next.store/api/schema/admin/`
- Campaigns API: `https://campaigns.apps.29next.com/api/schema/`

**Output:** YAML specs in `public/api/`:
- `public/api/admin/2024-04-01.yaml` (stable)
- `public/api/admin/2023-02-10.yaml` (legacy)
- `public/api/admin/unstable.yaml`
- `public/api/campaigns/v1.yaml`

### Phase 2: Node.js — MDX Generation

Runs automatically before every `npm run dev` and `npm run build`:

```bash
node scripts/generate-api-docs.mjs
```

**Script:** `scripts/generate-api-docs.mjs` (455 lines)

**Steps:**
1. **Fix webhook schemas** — Normalizes malformed schemas from Python output (adds `type: object`, fixes array-style types, generates missing examples)
2. **Clean stale directories** — Removes old versioned layout dirs
3. **Generate REST endpoint pages** — Calls `fumadocs-openapi` `generateFiles()` per spec, grouped by tag, excluding webhook files (detected by dot notation in filename like `cart.abandoned`)
4. **Generate webhook event pages** — Same `generateFiles()` but keeps only webhook files
5. **Write `meta.json` files** — Sets tag order from spec, marks version subdirs with `root: true`
6. **Extract HTTP methods** → `lib/generated/api-methods.json` (for sidebar method badges)
7. **Collect endpoint data** → `lib/generated/api-endpoints.json` (for AI search indexing)

## Output Structure

```
content/docs/admin-api/reference/           ← Stable (2024-04-01)
├── apps/, carts/, orders/, ...             ← Tag folders with .mdx files
├── 2023-02-10/                             ← Legacy version (root: true)
├── unstable/                               ← Dev version (root: true)
└── meta.json

content/docs/campaigns/api/                 ← Campaigns (v1)
├── address/, campaigns/, carts/, orders/
└── meta.json

content/docs/webhooks/reference/            ← Webhook events
├── apps/, carts/, orders/, ...
├── 2023-02-10/                             ← Legacy version (root: true)
├── unstable/                               ← Dev version (root: true)
└── meta.json

lib/generated/
├── api-methods.json                        ← URL → HTTP method map (sidebar badges)
└── api-endpoints.json                      ← Endpoint metadata (AI search)
```

## Versioning Strategy

- **Stable** content lives in the base output directory (no `root: true`)
- **Versioned** directories (2023-02-10, unstable) get `root: true` in `meta.json` so fumadocs treats them as alternate section roots
- Versioned subdirs are NOT listed in the parent `pages` array — fumadocs auto-discovers them
- `DocsLayout` sidebar transform in `app/docs/layout.tsx` filters versioned paths from the section tab dropdown

## Key Files

| File | Purpose |
|------|---------|
| `scripts/generate-api-docs.mjs` | Main MDX generation orchestrator |
| `tools/config.py` | API versions, webhook registry, server/auth overlays |
| `tools/update_api_docs.py` | Downloads and enriches OpenAPI specs |
| `tools/webhooks.py` | Resolves REST schemas into webhook event payloads |
| `components/api-page.tsx` | Two-column React renderer (`APIPage` from fumadocs-openapi) |
| `lib/source.ts` | Sidebar method badges (GET=green, POST=blue, PUT=orange, PATCH=yellow, DELETE=red) |

## Generated MDX Format

**REST endpoint:**
```mdx
---
title: Carts Create
description: Create a new cart.
full: true
_openapi:
  method: POST
  toc: []
---
<APIPage document={"public/api/admin/2024-04-01.yaml"} operations={[{"path":"/carts/","method":"post"}]} />
```

**Webhook event:**
```mdx
---
title: cart.abandoned
description: Triggers when a cart is abandoned.
_openapi:
  method: POST
  webhook: true
---
<APIPage document={"public/api/admin/2024-04-01.yaml"} webhooks={[{"name":"cart.abandoned","method":"post"}]} />
```

## Important Conventions

- REST endpoint filenames use camelCase (`cartsCreate.mdx`), webhook events use dot notation (`cart.abandoned.mdx`) — this is how the script distinguishes them
- Tag ordering in the sidebar follows the order tags appear in the OpenAPI spec
- The `APIPage` component renders a two-column layout: docs on the left, example requests/responses on the right (matching the GraphQL operation pages)
- All generated files are committed to git (not gitignored)
- `components/api-page.tsx` loads all 4 spec files at import time via `createOpenAPI()`
- TypeScript definition generation is disabled (`generateTypeScriptDefinitions: () => undefined`)

## Adding a New API Version

1. Add the version config to `tools/config.py` `API_VERSIONS` array
2. Run `python tools/update_api_docs.py` to download the spec
3. Add the spec path to `scripts/generate-api-docs.mjs` in the `specs` array
4. Add the spec to `components/api-page.tsx` `createOpenAPI({ input: [...] })`
5. Run `npm run generate-api-docs` to generate pages

## Adding a New Webhook Event

1. Add the event to the `WEBHOOKS` list in `tools/config.py` with: event name, object type, schema reference, tag, description
2. Run `python tools/update_api_docs.py` to regenerate specs with the new webhook
3. Run `npm run generate-api-docs` to generate the webhook page
