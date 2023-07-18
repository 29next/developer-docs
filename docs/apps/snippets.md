---
sidebar_label: Snippets
sidebar_position: 5
---
# App Snippets

App Snippets are HTML template files used to extend Storefront Themes.

Snippets follow the same syntax and features of [theme templates](/themes/templates/index.md) which bring a full suite of tools and context available to app developers to leverage when adding custom features to a storefront.

```mdx-code-block

import GoogleTagManager from '@site/_snippets/_view-google-tag-manager.mdx';

<GoogleTagManager />

```

### Locations

Theme's on the 29 Next platform support `app_hooks` which are locations within storefront themes your app can target to include your snippets without needing the customize the theme itself.

:::info
To upload your snippets and manifest.json, install [App Kit](/docs/apps/app-kit.md) to zip your snippet files and push them to 29 Next.
:::

```mdx-code-block

import AppHookLocations from '@site/_snippets/_app-hook-locations.mdx';

<AppHookLocations />

```


### Snippet Usage Example

```mdx-code-block

import AppUsageExample from '@site/_snippets/_app-usage-example.mdx';

<AppUsageExample />

```
