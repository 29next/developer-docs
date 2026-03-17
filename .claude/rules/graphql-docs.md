# Storefront GraphQL API Docs Generator

## Overview

The Storefront GraphQL API reference docs are auto-generated from the live schema at build time. The pipeline introspects `https://aptest.29next.store/api/graphql/`, generates MDX scaffold pages via `@graphql-markdown/cli`, then post-processes them into a custom two-column layout with inline type expansion and example code panels.

The GraphQL endpoint is available on every store at `https://{subdomain}.29next.store/api/graphql/` — the subdomain is the only thing that changes per store.

## Architecture

### Generation pipeline (`npm run generate-graphql-docs`)

Runs `scripts/generate-graphql-docs.mjs` which executes three phases:

1. **`gqlmd graphql-to-doc`** — Uses `@graphql-markdown/cli` with config from `graphql.config.mjs` to introspect the schema and generate raw MDX pages into `content/docs/storefront/graphql/`.

2. **Flatten & clean** — Moves `operations/queries/` and `operations/mutations/` up to top level, deletes `types/`, `directives/`, and `operations/` directories. Writes a clean `index.md` landing page and `meta.json`.

3. **Introspect & rewrite operations** — Fetches the schema again via introspection query, then for each query/mutation:
   - Builds structured field data (args + return fields) with **full recursive type expansion** and cycle detection via `seen` set
   - Generates example operation signature (GraphQL), variables (JSON), and response (JSON)
   - Rewrites each `.mdx` file with the `<GraphQLOperation>` component, passing all data as props
   - Sets `full: true` in frontmatter for full-width layout

### Key files

| File | Purpose |
|------|---------|
| `scripts/generate-graphql-docs.mjs` | Main generation + post-processing script |
| `graphql.config.mjs` | `@graphql-markdown/cli` config — schema URL, output path, MDX formatter |
| `lib/graphql-mdx-formatter.cjs` | Maps graphql-markdown admonitions/badges to fumadocs `<Callout>` components |
| `components/graphql-operation.tsx` | Client component — two-column layout with inline accordions + code panels |
| `components/mdx.tsx` | Registers `GraphQLOperation` in the MDX component map |
| `content/docs/storefront/graphql/` | Generated output directory |
| `content/docs/storefront/meta.json` | Parent sidebar config (includes `"graphql"` in pages array) |

### Output structure

```
content/docs/storefront/graphql/
├── index.md          ← Landing page
├── meta.json         ← Sidebar: { title: "Storefront GraphQL API", pages: ["queries", "mutations"] }
├── queries/
│   ├── cart.mdx
│   ├── me.mdx
│   ├── product.mdx
│   └── products.mdx
└── mutations/
    ├── add-cart-lines.mdx
    ├── create-cart.mdx
    └── ... (13 total)
```

### Operation page layout (`GraphQLOperation` component)

Two-column layout using `@container` queries (breaks out of prose with `not-prose max-w-none`):

- **Left column**: Description, Arguments (with recursive inline accordions), Return type (with recursive inline accordions)
- **Right column** (sticky): Query/Mutation Reference (`DynamicCodeBlock` graphql), Variables (`DynamicCodeBlock` json), JSON Response (`DynamicCodeBlock` json)

All types expand inline via accordion — no separate type pages. Cycle detection prevents infinite recursion on self-referencing types.

### Build integration

Wired into `package.json` scripts:
```
"dev": "node scripts/generate-api-docs.mjs && npm run generate-graphql-docs && next dev --turbopack"
"build": "node scripts/generate-api-docs.mjs && npm run generate-graphql-docs && next build"
"generate-graphql-docs": "node scripts/generate-graphql-docs.mjs"
```

### Dependencies

- `@graphql-markdown/cli` — Generates initial MDX scaffold from schema introspection
- `@graphql-tools/url-loader` — Fetches schema from live HTTP endpoint

## Important conventions

- The schema source of truth is `https://aptest.29next.store/api/graphql/` (the `aptest` store)
- Generated files in `content/docs/storefront/graphql/` are committed to git (same convention as REST API docs)
- The `meta.json` title is "Storefront GraphQL API" (set by the user, do not override)
- Operation filenames use kebab-case derived from the camelCase operation name (e.g., `createCart` → `create-cart.mdx`)
- The `full: true` frontmatter flag triggers full-width layout (hides TOC, sets max-width 1400px)
- Link styling matches the docs prose defaults: `text-fd-foreground underline decoration-fd-primary decoration-[1.5px] underline-offset-[3.5px]`
- `source.config.ts` includes `graphql` in the syntax highlighting languages list
