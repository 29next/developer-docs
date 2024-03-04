---
title: Object Reference
---

Intro to object context available...

```mdx-code-block

import IntroTheme from '@site/_snippets/_view-intro-theme.mdx';

<IntroTheme />

```

:::caution
This documentation is in progress.
:::

## Global Objects

Global objects are available across all templates and pages enabling theme developers to create dynamic custom pages powered by the store data.

### currencies

Returns a list of active storefront currencies you can iterate over, see [currency](#currency).

<details>
  <summary>Example Usage</summary>
  <div>

```django title="Example Storefront Change Currency Form"
{% if currencies and currencies|length > 1 %}
<li>
    <form action="{% url 'core:set-currency' %}" method="post" id='set-currency' class="px-2">
        {% csrf_token %}
        <select class="form-select form-select-sm" name="currency">
            {% for currency in currencies %}
            <option value="{{ currency.code }}" {% if request.CURRENCY_CODE == currency.code %} selected {% endif %}>
                {{ currency.symbol }} {{ currency.code }}
            </option>
            {% endfor %}
        </select>
    </form>
</li>
{% endif %}
```

  </div>
</details>


### languages_active_storefront

Returns a list of active storefront languages you can iterate over, see [language](#language).


<details>
  <summary>Example Usage</summary>
  <div>

```django title="Example Storefront Change Language Form"
{% if languages_active_storefront %}
<li>
    <form action="{% url 'set_language' %}" method="post" id='set-language' class="px-2">
        {% csrf_token %}
        <input name="next" type="hidden" value="{{ language_neutral_url_path }}">
        <select class="form-select form-select-sm" aria-label="language" name="language">
        {% for language_code, name in languages_active_storefront %}
            <option value="{{ language_code }}" {% if request.LANGUAGE_CODE == language_code %} selected {% endif %}>
                {{ name }}
            </option>
        {% endfor %}
        </select>
    </form>
</li>
{% endif %}
```

  </div>
</details>


### products
Returns a list of products you can iterate over, see [product](#product).

<details>
  <summary>Example Usage</summary>
  <div>

```django title="Example Storefront Products Query and Loop"
{% where products 'title' 'contains' 'featured' as products_filtered %}
{% for product in products %}
<div class="col">
    <div class="card h-100">
        {% with image=product.primary_image %}
        {% image_thumbnail image.original "350x350" crop="center" upscale=True as thumb %}
        <a href="{{ product.get_absolute_url }}">
            <img src="{{ thumb.url }}" alt="{{ product.get_title }}" class="card-img-top">
        </a>
        {% endwith %}
        <div class="card-body d-flex flex-column">
            <div class="card-title">
                <a href="{{ product.get_absolute_url }}" title="{{ product.get_title }}">{{ product.get_title|truncatewords:4 }}</a>
            </div>
            <div class="mt-auto">
                <div class="d-block">
                    {% purchase_info_for_product request product as session %}
                    {% if session.price.exists %}
                        {{ session.price.price|currency:session.price.currency }}
                    {% else %}
                </div>
            </div>
        </div>
    </div>
</div>
{% endfor %}
```

  </div>
</details>


### product_categories
Returns a list of product categories you can iterate over, see [product_category](#product_category).

<details>
  <summary>Example Usage</summary>
  <div>

```django title="Example Storefront Product Categories Query and Loop"
{% where product_categories 'id' 'exact' 1 as homepage_categories %}
{% for category in homepage_categories  %}
<div class="col">
    <div class="card bg-light h-100">
        {% with image=category.image %}
        {% if image %}
        {% image_thumbnail image "350x350" crop="center" upscale=True as thumb %}
        <a href="{{ category.get_absolute_url }}">
            <img  src="{{ thumb.url }}" alt="{{ category.name }}" class="card-img-top">
        </a>
        {% endif %}
        {% endwith %}
        <div class="card-body">
            <h5 class="card-title">{{ category.name }}</h5>
            {{ category.description|safe }}
            <a href="{{ category.get_absolute_url }}" class="card-link">Shop now</a>
        </div>
    </div>
</div>
{% endfor %}
```

  </div>
</details>

### posts
Returns a list of blog posts you can iterate over, see [post](#post).

<details>
  <summary>Example Usage</summary>
  <div>

```django title="Example Storefront Recent Blog Posts Query and Loop"
{% for post in posts|slice:"3" %}
<div class="col">
    <div class="card border-0 shadow-sm h-100  d-flex flex-column">
        {% with image=post.featured_image %}
            {% if image %}
            {% image_thumbnail image "400x250" upscale=False crop="top" as thumb %}
                <a href="{{post.get_absolute_url}}"><img src="{{ thumb.url }}" alt="{{ post.title }}" class="card-img-top"></a>
            {% endif %}
        {% endwith %}
        <div class="p-3">
            <div class="card-text text-muted fs-7">{{post.posted_date|date:"M d, Y"}}</div>
            <div class="card-title fs-5"><a href="{{post.get_absolute_url}}">{{ post.title }}</a></div>
            <div class="text-muted">{{ post.content|striptags|truncatechars_html:140  }}</div>
        </div>
    </div>
</div>
{% endfor %}
```

  </div>
</details>


### privacy_policy

Content from store Privacy Policy settings, typically used in a "Privacy Policy" page to automatically pull content in from settings.


<details>
  <summary>Example Usage</summary>
  <div>

```django
{{ privacy_policy }}
```

  </div>
</details>

### store

Returns the store object with general information about the store and the contact details.

| Property | Type | Description |
| ----- | ------ | ------ |
| `address` | object | The store address object see [address](#address). |
| `branding` | object | The store branding object, see [branding](#branding). |
| `name` | string | General name of the store defined in settings. |
| `tagline` | string | Store tagline defined in settings. |
| `legal_name` | string | Legal name of the store. |
| `phone` | string |Store phone number. |
| `email` | string |Store email address. |
| `timezone` | string |Store timezone. |
| `get_meta_title` | string |Store SEO meta title. |
| `get_meta_description` | string |Store SEO meta description. |

### storefront_geos

Returns a list of configured markets, see [geos](#geo)

<details>
  <summary>Example Usage</summary>
  <div>

```django title="Example Storefront Geo Switcher"
{% if storefront_geos and storefront_geos|length > 1 %}
<li class="nav-item dropdown">
    <a class="nav-link has-icon dropdown-toggle" id="langCurrencyDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <span class="flag-icon flag-icon-{{ request.COUNTRY_CODE|lower }} me-2 me-md-0"></span>&nbsp;<span class="d-md-none">Language/Currency</span>
    </a>
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="langCurrencyDropdown">

        <form action="{% url 'core:set-storefront' %}" method="post" id='set-storefront'>
            {% csrf_token %}
            <input name="country" type="hidden" value="" />
            <input name="language" type="hidden" value="" />
            <input name="currency" type="hidden" value="" />
            <input name="next" type="hidden" value="{{ language_neutral_url_path }}">
            {% for storefront in storefront_geos %}
                <a class="dropdown-item" href="#" data-country="{{ storefront.country.code }}" data-language="{{ storefront.get_language }}" data-currency="{{ storefront.currency.code }}">
                    <span class="flag-icon flag-icon-{{ storefront.country.code|lower }}"></span>
                    &nbsp;&nbsp;
                    <span> {{ storefront.country }}</span>
                </a>
            {% endfor %}
        </form>
    </ul>
</li>
{% endif %}
```

  </div>
</details>


### subscription_terms_and_conditions

Content from store Subscription Terms and Conditions settings, typically used in a "Subscription Terms & Conditions" page to automatically pull content in from settings.

<details>
  <summary>Example Usage</summary>
  <div>

```django
{{ subscription_terms_and_conditions }}
```

</div>
</details>

### terms_and_conditions

Content from store Terms and Conditions settings, typically used in a "Terms & Conditions" page to automatically pull content in from settings.

<details>
  <summary>Example Usage</summary>
  <div>

```django
{{ terms_and_conditions }}
```
</div>
</details>

## Objects

Object have many properties that can be accessed in templates.


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
| `logo` | file | Store branding logo, use `.url` to access the CDN file link. |
| `icon` | file | Store branding icon, use `.url` to access the CDN file link. |
| `primary_color` | string | Store branding primary color, returns a HEX code. |
| `accent_color` | string | Store branding accent color, returns a HEX code.  |


### currency

| Property | Type | Description |
| ----- | ------ | ------ |
| `name` | string | |
| `code` | string |  |
| `symbol` | string |  |

### country

| Property | Type | Description |
| ----- | ------ | ------ |
| `name` | string | |
| `code` | string |  |

### geo

| Property | Type | Description |
| ----- | ------ | ------ |
| `id` | string | |
| `country` | string | |
| `get_language` | file | |
| `currency` | object | |
| `get_description` | string | |

### image

| Property | Type | Description |
| ----- | ------ | ------ |
| `id` | string | |
| `url` | string | The full CDN link to render the image. |
| `get_title` | string | |
| `primary_image` | file | |
| `get_all_images` | object | |
| `get_description` | string | |

### language

| Property | Type | Description |
| ----- | ------ | ------ |
| `name` | string | |
| `language_code` | string | |

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
| `unit_price_incl_tax` | string |  |

### page

| Property | Type | Description |
| ----- | ------ | ------ |
| `title` | string | |
| `content` | string | |
| `get_meta_title` | string | Page SEO meta title. |
| `get_meta_description` | string | Page SEO meta description. |

### paginator

The `paginator` object is available on "list views" where the items to display are paginated from the backend, works in tandem with [page_obj](#page_obj).

| Property | Type | Description |
| ----- | ------ | ------ |
| `num_pages` | string | |
| `page_range` | string | |


### page_obj

The `page_obj` object is available on "list views" where the items to display are paginated from the backend, works in tandem with [paginator](#paginator).

| Property | Type | Description |
| ----- | ------ | ------ |
| `number` | string | |
| `has_next` | string | |
| `has_previous` | string | |
| `next_page_number` | string | |
| `previous_page_number` | string | |

<details>
  <summary>Example Usage</summary>
  <div>

```django
{% if paginator.num_pages > 1 %}
<div class="my-3">
    <nav class="store_pagination" role="navigation" aria-label="store pagination">
        <ul class="pagination">
            {% with ''|center:paginator.num_pages as range %}
                {% for _ in range %}
                    <li class="page-item {% if forloop.counter == page_obj.number %}active{% endif %}" {% if forloop.counter == page_obj.number %}aria-current="page"{% endif %}><a class="page-link" href="?page={{ forloop.counter }}">{{ forloop.counter }}</a></li>
                {% endfor %}
            {% endwith %}
            {% if page_obj.has_next %}
            <li class="page-item"><a href="?page={{ page_obj.next_page_number }}" class="page-link">{% t "navigation.pagination.next" %}</a></li>
            {% endif %}
        </ul>
    </nav>
</div>
{% endif %}
```
</div>
</details>

### post

| Property | Type | Description |
| ----- | ------ | ------ |
| `id` | string | |
| `featured_image` | string | |
| `categories` | List | List of related post categories, see [post_category](#post_category )|
| `get_absolute_url` | string | |
| `title` | string | |
| `content` | string | |
| `get_meta_title` | string | Post SEO meta title. |
| `get_meta_description` | string | Post SEO meta description.|

### post_category

| Property | Type | Description |
| ----- | ------ | ------ |
| `id` | string | |
| `name` | string | |
| `get_absolute_url` | string | |
| `title` | string | |
| `content` | string | |
| `get_meta_title` | string | |
| `get_meta_description` | string | |

### product

| Property | Type | Description |
| ----- | ------ | ------ |
| `id` | string | |
| `get_title` | string | |
| `get_all_images` | List | List of product images, see [image](#image) |
| `get_description` | string | |
| `sku` | string | |
| `categories` | List | List of product categories, see [product_category](#product_category).|
| `parent` | Object | Parent product if product is variant (child), see [product](#product). |
| `primary_image` | file | |
| `is_child` | boolean |  |
| `get_absolute_url` | string | |
| `num_approved_reviews` | int | Count of approved product reviews. |
| `rating` | string | |
| `reviews` | string | List of product reviews, see [review](#review) |
| `get_meta_title` | string | Product SEO meta title. |
| `get_meta_description` | string | Product SEO meta description. |

### product_category

| Property | Type | Description |
| ----- | ------ | ------ |
| `id` | string | |
| `name` | string | |
| `description` | string | |
| `image` | string | |
| `get_absolute_url` | string | |
| `get_meta_title` | string | |
| `get_meta_description` | string | |

### price

| Property | Type | Description |
| ----- | ------ | ------ |
| `currency` | string | |
| `price` | string | |
| `price_retail` | string | |

### request
| Property | Type | Description |
| ----- | ------ | ------ |
| `user` | Object | Current authenticated user, see [user](#user). |
| `get_host` | string | |
| `path` | string | |
| `COUNTRY_CODE` | string | |
| `CURRENCY_CODE` | string | |
| `LANGUAGE_CODE` | string | |


### review

| Property | Type | Description |
| ----- | ------ | ------ |
| `id` | string | |
| `title` | string | |
| `score` | string | |
| `user` | string | The customer that created the review, see [user](#user) |


### user

User in storefront context is the same as the "customer".

| Property | Type | Description |
| ----- | ------ | ------ |
| `id` | string | Customer's unique id. |
| `first_name` | string | Customer's first name. |
| `last_name` | string | Customer's last name. |
| `email` | string | Customer's email address. |
| `phone_number` | string | Customer's phone number in e.164 format. |
| `language` | string |  Customer's preferred communication language. |
| `accepts_marketing` | string | Wether or not the customer accepts marketing communications. |
| `ip` | string | Customer's most recently used IP address. |
| `user_agent` | string | Customer's most recently used user agent string. |

### voucher
| Property | Type | Description |
| ----- | ------ | ------ |
| `voucher` | Object |  |
| `title` | string |  |
