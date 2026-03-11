---
title: Getting Started
sidebar_position: 0
---

Next Commerce is an ecommerce platform for DTC merchants. It includes a full storefront, checkout, payments, and order management — plus a headless campaigns layer for building custom checkout funnels. Use this guide to find the right starting point for what you're building.

## Platform Overview

Campaigns and storefronts are the customer-facing layer — both produce orders in your Next Commerce store. The Admin API gives you programmatic access to all store data. Apps are how you package and distribute integrations across multiple stores.

## What Are You Building?

---

### Build a Campaign Funnel

Use campaigns to build external checkout experiences that run outside the storefront — landing pages, checkout, upsell flows, and receipt pages. 

**Choose your approach**

| Approach | Best for | Description |
| --- | --- | --- |
| [Campaign Cart SDK](/docs/campaigns/campaign-cart/) | Fastest path | HTML/JS SDK using `data-next-*` attributes — no custom JavaScript required |
| [Campaigns API](/docs/campaigns/api/) | Full control | Headless JS API for custom checkout implementations |

**Get started**

1. In your dashboard, install the **Campaigns App** and create a campaign
2. Add packages linked to product variants in your catalog
3. Get your **API Key** from the campaign's **Integration** tab
4. Clone the [Campaign Cart Starter Template](https://github.com/NextCommerceCo/campaign-cart-example) — a pre-built landing page, checkout, upsell, and receipt flow ready to customize

**Resources**
- [Campaigns overview](/docs/campaigns/) — campaign structure and funnel flow
- [Campaign Cart SDK](/docs/campaigns/campaign-cart/) — data attributes, JS API, and utilities
- [Campaigns API](/docs/campaigns/api/) — REST API reference
- [Analytics](/docs/campaigns/campaign-cart/analytics/) — session tracking, custom events, and third-party integrations

---

### Customize a Storefront Theme

Use themes to control the appearance and behavior of your storefront — product pages, catalog, cart, and storefront checkout flow. Themes use HTML, CSS, JavaScript, and a liquid-like template language with access to storefront objects and a GraphQL API.

**Get started**

1. Install [Theme Kit](/docs/storefront/themes/theme-kit.md), the CLI for local theme development
2. Start from [Intro Bootstrap](https://github.com/NextCommerceCo/intro-bootstrap) starter theme
3. Run `theme pull` to sync files locally, make changes, then `theme push` to deploy

**Resources**
- [Themes overview](/docs/storefront/themes/) — theme structure and Theme Kit
- [Template reference](/docs/storefront/themes/templates/) — tags, objects, filters, and URL routing
- [Theme guides](/docs/storefront/themes/guides/) — custom page templates, product templates, and variants
- [Storefront GraphQL API](/docs/storefront/api.md) — fetch products, cart data, and more
- [Event tracking](/docs/storefront/event-tracking.md) — track storefront events and conversions

---

### Integrate with the Admin API

Use the Admin API to manage store data and build backend integrations — orders, subscriptions, products, customers, and fulfillment. All requests authenticate with OAuth 2.

**Get started**

1. In your dashboard, go to **Settings > API Access** and create an OAuth App
2. Select the [permissions](/docs/admin-api/permissions.md) your integration needs to get an Access Token

**Resources**
- [Admin API overview](/docs/admin-api/) — authentication, versioning, and rate limits
- [API reference](/docs/admin-api/reference/) — full endpoint reference
- [Order management](/docs/admin-api/guides/order-management.md) — create and manage orders
- [Subscription management](/docs/admin-api/guides/subscription-management.md) — recurring billing
- [Payment integrations](/docs/admin-api/guides/) — Apple Pay, Google Pay, PayPal, Klarna, and more

---

### Build an App

Use apps to package an integration as an installable unit that works across multiple stores. An app can combine the Admin API, Webhooks, and storefront extensions, with an OAuth-based install flow that merchants complete in one click.

**When to build an app vs. a direct integration**

- You're distributing your integration to multiple merchants
- Your integration spans both backend logic (Admin API, Webhooks) and storefront UI (snippets, event tracking)
- You need per-store OAuth tokens that merchants can grant and revoke

**Get started**

1. Review the [example apps](#example-apps) to understand the full pattern before writing any code
2. Define your [App Manifest](/docs/apps/manifest.md)
3. Implement the [OAuth install flow](/docs/apps/oauth/getting-started.md)

**Example apps**

| App | What it covers |
| --- | --- |
| [Example S2S App](https://github.com/NextCommerceCo/example-app) | OAuth flow, session tokens, remote settings, webhooks |
| [Google Analytics 4](https://github.com/NextCommerceCo/google-analytics-4) | Snippets and event tracking in storefronts |
| [Fulfillment Service](https://github.com/NextCommerceCo/demo-fulfillment-service-app) | OAuth flow and fulfillment API integration |

**Resources**
- [Apps overview](/docs/apps/)
- [OAuth & install flows](/docs/apps/oauth/)
- [Server-to-server guide](/docs/apps/guides/server-to-server-apps.md)
- [Storefront extension guide](/docs/apps/guides/storefront-extension.md)
- [Webhooks](/docs/webhooks.md)

