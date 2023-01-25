---
title: Apps
sidebar_title: Apps
---

:::info
Apps and supporting tools are in Public Beta, if you have questions or run into any issues, don't hesitate to reach out to support@29next.com. More documentation, more examples, and more tools are on the way.
:::

Apps allow you to extend built-in functionality of the 29 Next platform to solve merchant challenges and create new functionality all wrapped into an easily installed App.

**Apps Allow you to:**

* **Extend Storefront Themes** - use [App Snippets](#app-snippets) with storefront locations to inject HTML/CSS/JS into themes.
* **Extend Core Functionality** - use [Webhooks](/webhooks.md) to subscribe to events and the [Admin API](/api/admin/index.md) to add new logic and integrations.


### Example Apps

| Example Apps | Description | Link |
| ------ | ------ | ----- |
| Example S2S App | Server to Server demonstration of [OAuth Flow](/apps/oauth/index.md), [Session Tokens](/apps/oauth/session-auth.md), [Remote Settings](/apps/settings.md), [Webhook Setup](/webhooks.md) and [Verification](/webhooks.md#verifying-webhook-requests) | [View](https://github.com/29next/example-app) |
| Google Tag Manager | Demonstrates [App Snippets](/apps/snippets.md) and [Theme App Hooks](/apps/snippets.md#locations) to add custom javascript events to storefronts. | [View](https://github.com/29next/google-tag-manager) |


### Getting Started

[Building Your First App](/apps/guides/index.md)
In this guide we'll go over all of the steps to get started building your first app to introduce many of the core app framework concepts and how to use them.


```mdx-code-block

import DevelopmentStore from '@site/_snippets/_offer-development-store.mdx';

<DevelopmentStore name="Development Store Offer" />

```

### App Layout Overview

Let's take a look at the basic file structure of apps to understand how to get started creating our first app.

```title="Example App Structure"
your-app
 ├── assets
 │   └──  my-app.js
 ├── snippets
 │   └──  global-header.html
 └── manifest.json
```

#### Assets

The asset directory is meant to contain any static assets needed for your app, such as images, css, or javascript that is referenced in your app snippets.

[See Assets Guide](/apps/assets.md)

#### Snippets

The snippets directory is meant to contain HTML snippets your app uses to extend storefront themes and add custom functionality. App snippets should follow the same coding practices as [Theme Templates](/themes/templates/index.md).

[See Snippets Guide](/apps/snippets.md)

#### Manifest.json

A manifest.json file specifies the configuration and metadata needed to install and configure your app.

[See Manifest Reference](/apps/manifest.md)


### App Developer Reference Guides

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```
