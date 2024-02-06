---
sidebar_label: URLs & Template Paths
title: URLs & Template Paths
---

Use the URL and Template Path reference below when building your theme to ensure that your templates load for the correct storefront URL paths.

```mdx-code-block

import IntroTheme from '@site/_snippets/_view-intro-theme.mdx';

<IntroTheme />

```

:::caution
Ensure your template paths match with expected template paths for built-in storefront views. Use the public themes on [Github](https://github.com/29next/) as a reference guide and starting point. All URL paths are automatically localized to the users language following your store's Localization settings.
:::


### Blog

| URL Name | URL Path & Arguments | Template Path |
| --- | --- | --- |
| blog:blog-list | /blog/ | templates/blog/index.html |
| blog:blog-detail | /blog/detail/:post_slug/ | templates/blog/post.html |

### Cart

| URL Name | URL Path | Template Path |
| --- | --- | --- |
| basket:summary | /basket/ | templates/cart.html |

### Catalogue

| URL Name | URL Path & Arguments | Template Path |
| --- | --- | --- |
| catalogue:index | /catalogue/ | templates/catalogue/index.html |
| catalogue:category | /catalogue/category/:category_slug/ | templates/catalogue/category.html |
| catalogue:detail | /catalogue/:product_slug/ | templates/catalogue/product.html |



### Checkout

| URL Name | URL Path & Arguments | Template Path |
| --- | --- | --- |
| checkout:shipping-address | checkout/* | checkout/checkout.html |

### Pages

| URL Name | URL Path & Arguments | Template Path |
| --- | --- | --- |
| N/A | /:page_slug | templates/pages/page.html |


### Reviews
| URL Name | URL Path & Arguments | Template Path |
| --- | --- | --- |
| catalogue:reviews-list | /catalogue/:product_slug/reviews/ | templates/reviews/index.html |
| catalogue:reviews-detail | /catalogue/:product_slug/reviews/:id/ | templates/reviews/review.html |
| catalogue:reviews-add | /catalogue/:product_slug/reviews/add/ | templates/reviews/form.html |

### Search

| URL Name | URL Path | Template Path |
| --- | --- | --- |
| search:search | /search/ | templates/search.html |

### Support

| URL Name | URL Path | Template Path |
| --- | --- | --- |
| support:cateogry-list | /support/categories/ | templates/support/index.html |
| support:article-list | /support/categories/:category_slug/ | templates/support/category.html |
| support:article-detail | /support/articles/:article_slug/ | templates/support/article.html |

### Error Pages

| URL Name | URL Path | Template Path |
| --- | --- | --- |
| N/A | /:any-403-error | templates/403.html |
| N/A | /:any-404-error | templates/404.html |
| N/A | /:any-500-error | templates/500.html |

