---
sidebar_label: Assets
sidebar_position: 4
description: The asset directory is meant to contain any static assets needed for your app, such as images, css, or javascript that is referenced in your app snippets.
---
# App Assets Reference

App Assets are static files included in an App that can be included in Snippets to extend storefront themes.

:::caution
**App bundle max size is 2MB**, it's important to minimize and reduce the size of the assets in your App to maintain efficiency. If you are compiling CSS or JS bundles locally, it is recommended to not include the raw source files and only include the compiled minified files.

:::


### Asset Usage Example

```mdx-code-block

import AppUsageExample from '@site/_snippets/_app-usage-example.mdx';

<AppUsageExample />

```


### Supported File Types

| File Extension |
|-----|
|`.html`|
|`.json`|
|`.css`|
|`.scss`|
|`.js`|
|`.woff2`|
|`.gif`|
|`.ico`|
|`.png`|
|`.jpg`|
|`.jpeg`|
|`.svg`|
|`.eot`|
|`.tff`|
|`.ttf`|
|`.woff`|
|`.webp`|
|`.mp4`|
|`.webm`|
|`.mp3`|
