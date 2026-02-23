# Next Commerce Developer Documentation — Agent Context

> This file is a contextual reference for AI agents and onboarding developers. It maps the platform architecture, documentation structure, conventions, and known gaps to enable effective navigation, contribution, and refactoring of the developer docs.

## Platform Overview

Next Commerce is a multi-channel ecommerce platform. Merchants manage a single store while selling through multiple independent sales channels. All channels funnel orders, customers, and transaction data into the central store.

Three sales channels and three APIs form the core developer surface:

```
┌─────────────────────────────────────────────────────────┐
│                    Next Commerce Store                   │
│         (Orders, Products, Customers, Subscriptions)    │
├──────────────┬──────────────────┬───────────────────────┤
│  Storefront  │    Campaigns     │      Admin API        │
│   Themes     │  (External DTC   │  (Server-to-Server)   │
│ (Catalog +   │   Funnels)       │                       │
│  Checkout)   │                  │                       │
├──────────────┼──────────────────┼───────────────────────┤
│ Storefront   │  Campaigns API   │     Admin API         │
│ API (GraphQL)│  (REST, CORS)    │  (REST, OAuth 2.0)    │
└──────────────┴──────────────────┴───────────────────────┘
         ▲               ▲                ▲
         │               │                │
    Webhooks ─────── Event Backbone ──────┘
    (23 event types, HMAC signed, versioned)
```

---

## Sales Channels

### 1. Storefront Themes

Full-featured online store with product catalog, collections, customer accounts, and built-in checkout.

- **Template language** — Jinja-like with custom tags, filters, and objects (products, cart, customer, etc.)
- **Theme Kit CLI** — local development, watch mode, Git-based deployment
- **Theme structure** — `assets/`, `checkout/`, `configs/`, `layouts/`, `locales/`, `partials/`, `sass/`, `templates/`
- **Settings** — `settings_schema.json` defines merchant-configurable options rendered in the dashboard
- **Storefront API** — GraphQL API accessible within the storefront context for cart mutations and data queries
- **CDN & caching** — built-in asset CDN with cache management

**Primary audience:** Theme developers building branded shopping experiences.

### 2. Campaigns

Isolated external sales funnels for DTC (direct-to-consumer) marketers. Each campaign has its own packages, offers, shipping options, and API key. No backend required — campaigns run entirely client-side.

**Core concepts:**
- **Campaign** — top-level config tying together packages, offers, shipping, payment methods, currency
- **Packages** — virtual product+quantity+price bundles (not actual products; mapped to store variants)
- **Offers** — automatic or code-based discounts based on package quantity
- **Flow** — Landing → Checkout → Upsell(s) → Receipt

**Two integration approaches:**

| Approach | Method | Best For |
|----------|--------|----------|
| **Campaign Cart SDK** | Declarative HTML `data-next-*` attributes + optional JS API | Fast development, no custom JS needed |
| **Campaigns API** | Headless REST API (CORS-enabled, API key auth) | Full programmatic control |

**Campaign Cart SDK features:**
- `window.nextConfig` or meta tag configuration
- Data attributes for actions, display, checkout, profiles, state
- JavaScript API with methods and events (`add_to_cart`, `begin_checkout`, `purchase`)
- Analytics integrations (GTM, Meta Pixel, GA4, RudderStack, custom webhooks)
- Utilities: FOMO notifications, exit intent, loading states, debugger
- Post-purchase upsell flows

**Primary audience:** DTC marketers and frontend developers building high-converting campaign funnels.

### 3. Admin API (as Sales Channel)

The Admin API supports a complete order creation flow with payment processing, enabling fully custom checkout experiences built server-side. This makes it a sales channel in its own right — not just a management API.

**Key capabilities as a channel:**
- Create orders with payment (credit card, PayPal, Klarna, Apple Pay, Google Pay, etc.)
- External checkout flow with server-side control
- 3DS2 authentication support
- Subscription/recurring billing creation
- iFrame payment form for PCI-compliant card collection

**Primary audience:** Backend developers building custom commerce applications, integrations, and services.

---

## APIs

### Storefront API
- **Type:** GraphQL
- **Auth:** Accessible only within storefront context (on the store domain)
- **Capabilities:** Cart management (`createCart`, `addCartLines`, `removeCartLines`), product/collection queries
- **Discovery:** GraphiQL explorer available in-browser on the storefront
- **Docs:** `docs/storefront/api.md` (single file)
- **Note:** External access planned but not yet available

### Campaigns API
- **Type:** REST, CORS-enabled (browser-safe)
- **Auth:** Campaign API key
- **Capabilities:** Cart creation, order creation, upsell creation, order retrieval, session tracking, shipping options
- **OpenAPI spec:** `static/api/campaigns/v1.yaml`
- **Docs:** `docs/api/campaigns.md`

### Admin API
- **Type:** REST
- **Auth:** OAuth 2.0 with permission scoping
- **Rate limit:** 4 requests/second
- **Versions:**
  - `2023-02-10` — stable
  - `2024-04-01` — stable, recommended
  - `unstable` — development
- **Capabilities:** Full CRUD on all store resources (orders, products, customers, subscriptions, fulfillments, gateways, webhooks, etc.)
- **OpenAPI specs:** `static/api/admin/2023-02-10.yaml`, `static/api/admin/2024-04-01.yaml`, `static/api/admin/unstable.yaml`
- **Docs:** `docs/api/admin/` (overview, permissions, 15 feature guides)

**Admin API guides focus areas:**
- Payment methods: Apple Pay, Google Pay, PayPal, Klarna, Bancontact, iDEAL, SEPA Debit, TWINT, 3DS2
- Core features: External Checkout, Order Management, Subscription Management, Testing
- Payment collection: iFrame Payment Form

---

## Webhooks

Event-driven notifications for external systems to stay synced with store activity.

- **23 event types** spanning: app, cart, customer, dispute, fulfillment, gateway, order, product, subscription, store, ticket, transaction
- **Payload structure:** `{ object, data, event_id, event_type, webhook, api_version }`
- **Verification:** HMAC SHA256 via `X-29Next-Signature` header
- **Retry policy:** Up to 10 retries with exponential backoff; failing webhooks trigger admin email notifications and eventual deactivation
- **Versioning:** Payload data structures align with Admin API versions
- **Setup:** Dashboard (Settings > Webhooks) or Admin API
- **Docs:** `docs/webhooks.md` (single comprehensive file)

---

## Apps

Apps extend platform functionality by combining Admin API, Webhooks, and Storefront hooks into installable packages.

**Two app types:**
- **Server-to-Server** — backend integrations (fulfillment services, dispute management, external reporting)
- **Storefront Extensions** — inject snippets, scripts, and event tracking into themes

**App infrastructure:**
- OAuth 2.0 authorization code flow for installation
- Manifest-driven configuration
- Remote settings management
- Asset hosting for static files
- Snippet injection into storefronts
- Event tracking integration
- App review process for publishing

**Docs:** `docs/apps/` (18 files covering development flow, OAuth, manifests, settings, guides)

---

## Documentation Structure

```
docs/
├── index.md                    → Getting Started landing page
├── api/
│   ├── index.md                → APIs overview
│   ├── campaigns.md            → Campaigns API overview + endpoints
│   ├── checkout-links.md       → Checkout Links feature
│   └── admin/
│       ├── index.md            → Admin API overview + auth
│       ├── permissions.md      → OAuth permission scopes
│       └── guides/             → 15 feature guides (payments, orders, subscriptions)
├── apps/
│   ├── index.md                → Apps overview
│   ├── app-kit.md              → App development framework
│   ├── app-development-flow.md → End-to-end dev process
│   ├── manifest.md             → App manifest spec
│   ├── settings.md             → Remote settings
│   ├── assets.md               → Asset hosting
│   ├── snippets.md             → Storefront code injection
│   ├── event-tracking.md       → Storefront event hooks
│   ├── review.md               → App review process
│   ├── oauth/                  → OAuth flows (4 files)
│   └── guides/                 → App pattern guides (4 files)
├── campaigns/
│   └── index.md                → Campaign concepts + getting started
├── campaign-cart/              → Campaign Cart SDK (largest section, ~48 files)
│   ├── index.md                → Quick start + configuration
│   ├── data-attributes/        → HTML attribute reference (8 files)
│   ├── javascript-api/         → JS API reference (5 files)
│   ├── analytics/              → Analytics integrations (9+ files)
│   ├── guides/                 → Implementation guides
│   ├── utilities/              → FOMO, exit intent, loading, debugger
│   └── upsells/                → Post-purchase upsell flows
├── storefront/
│   ├── index.md                → Storefront overview
│   ├── api.md                  → Storefront GraphQL API
│   ├── event-tracking.md       → Event tracking
│   └── themes/
│       ├── index.md            → Theme structure + basics
│       ├── settings.md         → Theme settings schema
│       ├── theme-kit.md        → Theme Kit CLI
│       ├── cdn-and-caching.md  → CDN strategies
│       ├── translations.md     → Multi-language
│       ├── templates/          → Template language reference (5 files)
│       └── guides/             → Theme how-to guides (4 files)
└── webhooks.md                 → Webhook events + verification

static/api/
├── admin/
│   ├── 2023-02-10.yaml         → Admin API v1 OpenAPI spec
│   ├── 2024-04-01.yaml         → Admin API v2 OpenAPI spec
│   └── unstable.yaml           → Admin API unstable spec
└── campaigns/
    └── v1.yaml                 → Campaigns API OpenAPI spec
```

---

## Documentation Conventions

### Tooling
- **Docusaurus** with MDX support
- **Stoplight Elements** for rendering OpenAPI specs inline
- **Algolia** for search
- **Tailwind CSS** for custom components
- **Sidebar:** auto-generated from directory structure (`sidebars.js`)

### Content Patterns
- **Frontmatter:** `title`, `sidebar_label`, `sidebar_position`
- **Admonitions:** `:::tip`, `:::caution`, `:::info` for callouts
- **Diagrams:** Mermaid (`graph`, `sequenceDiagram`) for flows and architecture
- **Code examples:** JavaScript, Python, cURL — fenced with language + optional `title="..."`
- **Tables:** Markdown tables for comparisons, event lists, attribute references
- **Cross-links:** Relative markdown links (`[text](/docs/path/to/file.md)`)
- **API references:** Link to Stoplight-rendered specs (`/docs/api/admin/reference/#/...`)
- **MDX components:** `DocCardList`, `IntroCards` for auto-generated navigation cards

### URL Structure
All published docs follow: `https://developers.29next.com/docs/{section}/{path}`

Key redirects configured in `docusaurus.config.js`:
- `/api/` → `/docs/api`
- `/api/admin` → `/docs/api/admin/`
- `/themes` → `/docs/storefront/themes`
- `/webhooks` → `/docs/webhooks`

---

## Documentation Gaps & Refactoring Opportunities

### High Priority

1. **Storefront API is underdocumented**
   - Currently a single brief file (`docs/storefront/api.md`) pointing to GraphiQL
   - Needs: query/mutation reference, authentication details, available types and fields, usage examples
   - Consider: auto-generated reference from GraphQL schema, tutorial-style guides for common operations

2. **Admin API guides skew toward payment methods**
   - 15 guides, most are payment-specific (Apple Pay, Google Pay, PayPal, Klarna, etc.)
   - Missing guides for common workflows: product CRUD, customer management, bulk operations, inventory management
   - Opportunity: add "Getting Started with Admin API" tutorial covering basic resource operations

3. **No error handling guide**
   - No comprehensive documentation on error response formats, common error codes, or handling strategies across APIs
   - Each API should document its error format and common failure scenarios

### Medium Priority

4. **Rate limiting & quotas**
   - Admin API mentions 4 req/s but no strategies for handling limits, queuing, or backoff
   - No rate limit documentation for Campaigns API or Storefront API

5. **No troubleshooting or FAQ sections**
   - Common issues (webhook delivery failures, OAuth token expiry, theme deployment problems) lack dedicated troubleshooting docs

6. **Security best practices**
   - Beyond "don't expose tokens" and webhook HMAC verification, no comprehensive security guide
   - Topics: API key rotation, OAuth token storage, CSP headers for campaign pages, PCI considerations

7. **Testing guide is isolated**
   - Single testing guide in Admin API section; no testing guidance for campaigns, themes, or apps
   - Opportunity: cross-cutting testing guide or per-section testing docs

### Lower Priority

8. **Getting Started page is thin**
   - `docs/index.md` relies on an `IntroCards` component — could benefit from a brief narrative overview of the platform before the cards

9. **Campaign Cart SDK docs could use restructuring**
   - At 48 files it's the largest section but has some organizational inconsistencies
   - Analytics subsection is thorough but could link back to concepts more clearly

10. **Cross-linking between related sections**
    - Campaigns intro (`docs/campaigns/`) could link more explicitly to both SDK and API docs
    - Webhook docs could link to app guides that consume webhooks (fulfillment service, dispute service)
    - Admin API guides could cross-reference relevant webhook events

---

## Key Repositories

| Repository | Purpose |
|------------|---------|
| `developer-docs` | This documentation site (Docusaurus) |
| `campaign-cart-example` | Campaign Cart starter template |
| `intro` / `intro-bootstrap` | Starter storefront themes |
| Open-source example apps | Referenced in app documentation |
