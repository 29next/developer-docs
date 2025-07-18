---
title: Apps
sidebar_title: Apps
---

:::info
Apps and supporting tools are in Public Beta, if you have questions or run into any issues, don't hesitate to reach out to support@29next.com. More documentation, more examples, and more tools are on the way.
:::

Apps allow you to extend built-in functionality of the Next Commerce platform to solve merchant challenges and create new functionality all wrapped into an easily installed App.

### Apps Allow You To

#### Extend Core Functionality

Use [Webhooks](/webhooks.md) to subscribe to events and the [Admin API](/api/admin/index.md) to add new logic and integrations, see the [Server to Server Guide](/docs/apps/guides/server-to-server-apps/).

#### Extend Storefront Themes
Use [Event Tracking](/docs/apps/event-tracking.md) or [App Snippets](#app-snippets) to extend storefront themes, see the [Storefront Extension Guide](/docs/apps/guides/storefront-extension/).

### Example Apps

We have full featured open source example apps that provide full code examples for many of the concepts required for building apps.

| Example Apps | Description | Link |
| ------ | ------ | ----- |
| Example S2S App | Server to Server demonstration of [OAuth Flow](/apps/oauth/index.md), [Session Tokens](/apps/oauth/session-auth.md), [Remote Settings](/apps/settings.md), [Webhook Setup](/webhooks.md) and [Verification](/webhooks.md#verifying-webhook-requests) | [View](https://github.com/29next/example-app) |
| Google Analytics 4 | Demonstrates [Snippets](/docs/apps/snippets.md) and [Event Tracking](/docs/apps/event-tracking.md) to add javascript events to storefronts. | [View](https://github.com/29next/google-analytics-4) |
| Fulfillment Service App | Demonstrates demonstration of [OAuth Flow](/apps/oauth/index.md) and the [Fulfillment Flow](/docs/apps/guides/fulfillment-service/#fulfillment-flow-overview) using the [Fulfillment APIs](/docs/api/admin/reference/#tag/fulfillment). | [View](https://github.com/29next/demo-fulfillment-service-app) |


```mdx-code-block

import DevelopmentStore from '@site/_snippets/_offer-development-store.mdx';

<DevelopmentStore name="Development Store Offer" />

```

### App Developer Reference Guides

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```
