# 29 Next Developer Docs

Developer documentation for the 29 Next platform, built with [Fumadocs](https://fumadocs.vercel.app) and [Next.js](https://nextjs.org).

## Stack

- **[Fumadocs](https://fumadocs.vercel.app)** — docs framework (UI, MDX processing, OpenAPI rendering)
- **[Next.js](https://nextjs.org)** — framework
- **[Algolia DocSearch](https://docsearch.algolia.com)** — site search, indexed via GitHub Actions on push to `main`

## Development

Install dependencies:

```bash
npm install
```

Run the dev server (also generates API reference docs from OpenAPI specs):

```bash
npm run dev
```

## Validate Links

Check for broken internal links:

```bash
node scripts/validate-links.mjs
```

## Search Index

The Algolia search index is updated automatically via the `Build Search Index` GitHub Actions workflow on every push to `main`. It uses the `algolia.json` config and requires `ALGOLIA_APPLICATION_ID` and `ALGOLIA_API_KEY` secrets.

## Build

```bash
npm run build
```
