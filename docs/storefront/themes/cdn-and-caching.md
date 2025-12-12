---
sidebar_label: CDN & Caching
sidebar_position: 2
title: Storefront CDN & Caching
---

Storefront leverages CDNs and many caching strategies to ensure fast performant user experiences for your end customers. 

:::info Use Network Domain while Building Themes
Always use the store network domain `{store}.29next.store` when developing themes to bypass full page caching and preview your latest updates.
:::

### Asset CDN

All merchant uploaded media assets and theme assets are loaded from our CDN for the fastest performance. 

- **Media** - Links to uploaded media should always use the `cdn.29next.store`
- **Theme Assets** - Theme assets should use the [asset_url](/docs/storefront/themes/templates/filters.md#asset_url) in templates which always generates a full CDN link on the storefront.

### Full Page Caching

All pages on storefront are cached for 5 minutes to ensure popular pages are as fast as possible for customers and minimal impact on the overall platform load. 

- User is Anonymous (unauthenticated).
- Domain is a merchant mapped domain. 
- Page is not dynamic, ie `/cart/`, `/checkout/`, `/accounts/` do not use full page caching. 


:::tip
To skip the cache, you can append a unique querystring such as `?skip_cache` to skip existing cache and see the latest. 
:::

### Template Caching

Themes use many templates ie `layouts`, `partials`, and `assets` that when compiled together create amazing customer experiences. Templates are cached in memory to reduce database queries when compiling templates into the full html response. 

Updating a template through the dashboard or [Theme Kit](/docs/storefront/themes/theme-kit.md) should automatically purge the cache for you to see your latest changes on the network domain, see notes above. 


:::warning
There are a few cases wherein a form on the frontend needs to use a `{% csrf_token %}` field to secure submission to the backend. The platform core JS will automatically replace `{% csrf_token %}` that are in cached versions of pages to ensure the forms still work. 

**It is advisable to not implement custom templates that require `{% csrf_token %}`, we recommend to [Storefront API](/docs/storefront/api.md) instead.**
:::