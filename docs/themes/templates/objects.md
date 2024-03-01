---
title: Object Reference
---

:::caution
This documentation is in progress.
:::


### store

| Property | Type | Description |
| ----- | ------ | ------ |
| `name` | string | Name of the store defined in settings. |
| `tagline` | string | Store tagline defined in settings. |
| `legal_name` | string |Legal name of the store. |
| `phone` | string |Store phone number. |
| `email` | string |Store phone number. |
| `timezone` | string |Store phone number. |
| `get_meta_title` | string |Store phone number. |
| `get_meta_description` | string |Store phone number. |
| `address` | object | The store address object see [address](#address). |
| `branding` | object | The store branding object, see [branding](#branding). |


### address

| Property | Type | Description |
| ----- | ------ | ------ |
| `line_1` | string | Address line 1. |
| `line_2` | string | Address line 2. |
| `city` | string | Address City. |
| `state` | string | Address State. |
| `postcode` | string | Address Postcode. |
| `country` | string | Address Country. |

### branding

| Property | Type | Description |
| ----- | ------ | ------ |
| `logo` | file | Store branding logo. |
| `icon` | file | Store branding icon. |
| `primary_color` | string | Store branding primary color. |
| `accent_color` | string | Store branding accent color. |

### products

| Property | Type | Description |
| ----- | ------ | ------ |
| `id` | string | |
| `get_title` | string | |
| `primary_image` | file | |
| `get_all_images` |  | |
| `get_description` | string | |
| `sku` | string | |
| `parent` | Object | Parent product if product is variant (child). |
| `categories` | List | List of categories, see [product_categories](#product_categories)|
| `is_child` | boolean |  |
| `get_absolute_url` | string | |
| `num_approved_reviews` | string | |
| `rating` | string | |
| `reviews` | string | |
| `num_approved_reviews` | int | |
| `get_meta_title` | string | |
| `get_meta_description` | string | |


### image

| Property | Type | Description |
| ----- | ------ | ------ |
| `id` | string | |
| `get_title` | string | |
| `primary_image` | file | |
| `get_all_images` | object | |
| `get_description` | string | |


### reviews

| Property | Type | Description |
| ----- | ------ | ------ |
| `id` | string | |
| `title` | string | |
| `score` | string | |
| `user` | string | The customer that created the review, see [user](#user) |

### product_categories

| Property | Type | Description |
| ----- | ------ | ------ |
| `id` | string | |
| `name` | string | |
| `description` | string | |
| `image` | string | |
| `get_absolute_url` | string | |
| `get_meta_title` | string | |
| `get_meta_description` | string | |

### user

| Property | Type | Description |
| ----- | ------ | ------ |
| `id` | string | |
| `first_name` | string | |
| `last_name` | string | |
| `email` | string | |
| `phone_number` | string | |
| `accepts_marketing` | string | |

### page

| Property | Type | Description |
| ----- | ------ | ------ |
| `title` | string | |
| `content` | string | |
| `get_meta_title` | string | |
| `get_meta_description` | string | |

### posts

| Property | Type | Description |
| ----- | ------ | ------ |
| `id` | string | |
| `featured_image` | string | |
| `get_absolute_url` | string | |
| `title` | string | |
| `content` | string | |
| `get_meta_title` | string | |
| `get_meta_description` | string | |

### post_categories

| Property | Type | Description |
| ----- | ------ | ------ |
| `id` | string | |
| `name` | string | |
| `get_absolute_url` | string | |
| `title` | string | |
| `content` | string | |
| `get_meta_title` | string | |
| `get_meta_description` | string | |


### order

| Property | Type | Description |
| ----- | ------ | ------ |
| `number` | string | |
| `currency` | string | |
| `lines` | List | |
| `user` | Object | The order customer, see [user](#user) |
| `total_excl_tax` | string | |
| `total_incl_tax` | string | |
| `total_tax` | string | |
| `shipping_incl_tax` | string | |
| `shipping_excl_tax` | string | |
| `voucherapplication_set` | List | |
| `shipping_address` | Object | |
| `billing_address` | Object | |

### order line
| Property | Type | Description |
| ----- | ------ | ------ |
| `product` | Object | see [product](#product) |
| `title` | string |  |
| `quantity` | string |  |
| `unit_price_incl_tax_incl_discount` | string |  |
| `unit_price_excl_tax` | string |  |
| `title` | string |  |
| `title` | string |  |


### voucher
| Property | Type | Description |
| ----- | ------ | ------ |
| `voucher` | Object | see [product](#product) |
| `title` | string |  |


### session
| Property | Type | Description |
| ----- | ------ | ------ |
| `price` | string | |

### price
| Property | Type | Description |
| ----- | ------ | ------ |
| `currency` | string | |
| `price` | string | |
| `price_retail` | string | |


### request
| Property | Type | Description |
| ----- | ------ | ------ |
| `get_host` | string | |
| `path` | string | |
| `price_retail` | string | |


### languages_active_storefront

### terms_and_conditions
### privacy_policy
### subscription_terms_and_conditions



### storefront_geos
### currencies

### primary_domain
### DEFAULT_LANGUAGE
### paginator
