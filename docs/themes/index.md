---
title: Themes
sidebar_title: Themes
---
# Getting Started with Themes

:::tip
We highly recommend using Theme Kit to manage your store theme for the best developer experience from your favorite IDE. [Install Theme Kit](https://github.com/29next/theme-kit)
:::

```mdx-code-block

import IntroTheme from '@site/_snippets/_view-intro-theme.mdx';

<IntroTheme />

```

### Layout & Structure
The Storefront theme framework has a set guideline for the base directories of your theme for your assets, html, and settings.

```shell title="Storefront Theme Structure"
theme
 ├── assets
 ├── checkout
 ├── configs
 ├── layouts
 ├── locales
 ├── partials
 ├── sass
 └── templates
```


### Assets
The assets directory is used to upload static asset files used in the theme such as images, stylesheets, web fonts, and javascript files. The assets directory works in conjunction with the [`asset_url` template filter](/themes/templates/filters.md#asset_url) to render the full path on your storefront.

```django title="Example link in template to /assets/css/style.css"
{{ 'css/style.css'|asset_url }}
```

### Checkout
The checkout is used to add a customized `checkout.html` template to override the built in checkout template.

```shell title="Checkout Directory"
checkout
  └── checkout.html
```

[See Checkout Customization Guide](/themes/guides/checkout.md)

### Configs
The configs directory is used to store your theme settings options and also the settings data as they should be configured with the theme.

- `settings_schema.json` is used to generate the theme settings form
- `setting_data.json` is used data storage for the the theme settings

```shell title="Config Directory"
configs
 ├── settings_data.json
 └── settings_schema.json
```
[See Theme Settings Guide](themes/settings.md)

### Locales

The `locales` directory is used to for storefront theme translation json files. The translation files are used in conjunction with the translation template tag to support multiple languages for your storefront.

Translation files should be named according to the ISO 639-1 2 letter language code standard. The default or fallback language should be denoted with a .default in the file name as shown below. See the [Translations guide](themes/translations.md) for more examples on how to localize your theme content.

```shell title="Locale Files Example"
locales
 ├── en.default.json
 ├── de.json
 ├── es.json
 ├── it.json
 └── fr.json
```
[See Translations Guide](themes/translations.md)

### Layouts
The `layouts` directory is used to store base templates that are then extended from in view specific templates, see extends and block template tags for more on template inheritance. See the [`extends` template tag](themes/templates/tags.md#extends-block) for more on template inheritance.

```shell title="Layouts Directory Example"
layouts
 └── base.html
```

### Partials
The partials directory is used to store reusable which are reusable snippets of code that can be used in tandem with the include template tag for reuse across many templates. See the includes template tag for more on template inheritance with partials.

```shell title="Partials Directory Example"
partials
 ├── header.html
 ├── footer.html
 └── pagination.html
```

```django title="Example Partial Include Another Template"
<html lang="en">
<body>
    {% include "partials/footer.html" %}
</body>
</html>
```


### Templates
The templates directory is used to store all templates for a theme, see [URLs and Template Paths](themes/templates/urls-and-template-paths.md) for reference.

```shell title="Templates Directory Example"
templates
 ├── 403.html
 ├── 404.html
 ├── 500.html
 ├── blog
 │   ├── index.html
 │   └── post.html
 ├── cart.html
 ├── catalogue
 │   ├── category.html
 │   ├── index.html
 │   └── product.html
 ├── index.html
 ├── pages
 │   └── page.html
 ├── reviews
 │   ├── form.html
 │   ├── index.html
 │   └── review.html
 ├── search.html
 └── support
     ├── article.html
     ├── category.html
     └── index.html
```

### Sass

The sass directory accepts scss files for use in in a theme. See Theme Kit for more details on local sass compiling.

:::caution
Sass files are not automatically compiled in the platform and must be compiled to css files locally for use in templates from the assets directory.
:::

### Theme Kit

[Theme Kit](https://github.com/29next/theme-kit) is a command line tool for developers to build an maintain storefront themes programmatically, allowing theme developers to:

- Work on theme templates and assets using their local code editor or favorite IDE.
- Use git version control to work on a theme collectively with many theme collaborators.
- Use a pipeline to manage deployments of theme updates.


:::tip

See Theme Kit installation instructions on [Github](https://github.com/29next/theme-kit).
:::
