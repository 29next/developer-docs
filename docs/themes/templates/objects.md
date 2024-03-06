---
title: Object Reference
---

Objects are template variables you can use to dynamically populate templates in your storefront theme. See documentation below and details of available template objects and their properties.

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

### post_categories

Returns a list of post categories you can iterate over, see [post_category](#post_category).

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



### request

The current session active request context.

| Property | Type | Description |
| ----- | ------ | ------ |
| `user` | Object | Current authenticated user, see [user](#user). |
| `get_host` | String | Current host domain. |
| `path` | String | Current url path. |
| `COUNTRY_CODE` | String | Current active geo country code, see [geo](#geo). |
| `CURRENCY_CODE` | String | Current active currency code. |
| `LANGUAGE_CODE` | String | Current active language code. |

### store

Returns the store object with general information about the store and the contact details.

| Property | Type | Description |
| ----- | ------ | ------ |
| `address` | object | The store address object see [address](#address). |
| `branding` | object | The store branding object, see [branding](#branding). |
| `name` | String | General name of the store defined in settings. |
| `tagline` | String | Store tagline defined in settings. |
| `legal_name` | String | Legal name of the store. |
| `phone` | String |Store phone number. |
| `email` | String |Store email address. |
| `timezone` | String |Store timezone. |
| `get_meta_title` | String |Store SEO meta title. |
| `get_meta_description` | String |Store SEO meta description. |

### storefront_geos

Returns a list of configured markets, see [geos](#geo).

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
            {% for geo in storefront_geos %}
                <a class="dropdown-item" href="#" data-country="{{ geo.country.code }}" data-language="{{ geo.language }}" data-currency="{{ geo.currency.code }}">
                    <span class="flag-icon flag-icon-{{ geo.country.code|lower }}"></span>
                    &nbsp;&nbsp;
                    <span> {{ geo.country }}</span>
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

Content from store subscription terms and conditions settings, typically used in a "Subscription Terms & Conditions" page to automatically pull content in from settings.

<details>
  <summary>Example Usage</summary>
  <div>

```django
{{ subscription_terms_and_conditions }}
```

</div>
</details>

### terms_and_conditions

Content from store terms and conditions settings, typically used in a "Terms & Conditions" page to automatically pull content in from settings.

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
| `line_1` | String | Address line 1. |
| `line_2` | String | Address line 2. |
| `city` | String | Address City. |
| `state` | String | Address State. |
| `postcode` | String | Address Postcode. |
| `country` | String | Address Country. |

### branding

Store branding properties accessed through the [store](#store) object to leverage within templates.

| Property | Type | Description |
| ----- | ------ | ------ |
| `logo` | File | Store branding logo, use `.url` to access the file link. |
| `icon` | File | Store branding icon, use `.url` to access the file link. |
| `primary_color` | String | Store branding primary color, returns a HEX code. |
| `accent_color` | String | Store branding accent color, returns a HEX code.  |


### currency

Currency object accessed through [currencies](#currencies).

| Property | Type | Description |
| ----- | ------ | ------ |
| `code` | String |  Name of the currency, ie `USD`. |
| `symbol` | String |  The symbol of the currency, ie `$`. |

### country

Country object to access properties about a country, see [storefront_geos](#storefront_geos) for example usage.

| Property | Type | Description |
| ----- | ------ | ------ |
| `code` | String | Two letter [ISO 3166](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) country code. |
| `name` | String | Full name of the country. |

### geo

A `geo` is a combination of a language and currency typically associated with a market, see full example in [storefront_geos](#storefront_geos).

| Property | Type | Description |
| ----- | ------ | ------ |
| `currency` | object | The currency object, see [currency](#currency). |
| `country` | object | The country object, see [country](#country) |
| `language` | String | Two letter [ISO 639](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) language code. |


### image

Product images, see example usage below.

<details>
  <summary>Example Usage</summary>
  <div>

```django
{% with all_images=product.get_all_images %}
{% for image in all_images %}{% image_thumbnail image.original "100x100" crop="center" as thumb %}
    <div id="{{ image.id }}">
        <img src="{{ thumb.url }}" alt="{{ product.get_title }}" class="img-fluid">
    </div>
    {% endfor %}
</div>
{% endif %}
{% endwith %}
```

</div>
</details>

| Property | Type | Description |
| ----- | ------ | ------ |
| `original` | File | The original image file, typically used when creating a thumbnail. |
| `url` | String | The full CDN link to render the image. |




### order

Order object available on the order confirmation view, typically used in tandem with javascript conversion snippets through apps or custom theme implementations, see example usage below.

<details>
  <summary>Example Usage</summary>
  <div>

```django
<script>
    dataLayer.push({ ecommerce: null });
    dataLayer.push({
        event: 'purchase',
         ecommerce: {
            transaction_id: '{{ order.number|escapejs }}',
            value: {{ order.total_incl_tax | unlocalize | escapejs }},
            tax: {{ order.total_tax|unlocalize|escapejs }},
            shipping: '{{ order.shipping_incl_tax|unlocalize|escapejs }}',
            currency: '{{ order.currency|escapejs }}',
            coupon: '{% if order.voucherapplication_set.first.voucher.code %}{{ order.voucherapplication_set.first.voucher.code }}{% endif %}',
            items: [
                {% for line in order.lines.all %}
                {
                    index: {{ forloop.counter0 }},
                    item_id: '{{ line.product.id|escapejs }}',
                    item_name: '{{ line.title|escapejs }}',
                    affiliation: '{{ store_name|escapejs }}',
                    category: '{{ line.product.categories.first|default:'Uncategorised'|escapejs }}',
                    price: '{{ line.unit_price_incl_tax_incl_discount|unlocalize|escapejs }}',
                    quantity: {{ line.quantity | escapejs }}
                }{% if not forloop.last %}, {% endif %}
                {% endfor %}
            ]
         }
    });
</script>
```

</div>
</details>


| Property | Type | Description |
| ----- | ------ | ------ |
| `number` | String | Order number. |
| `currency` | String | Order currency. |
| `lines` | List | List of order line items, see [order line](#order-line). |
| `user` | Object | The order customer, see [user](#user). |
| `total_excl_tax` | String | Order total excluding tax. |
| `total_incl_tax` | String | Order total including tax. |
| `total_tax` | String | Order total tax. |
| `shipping_incl_tax` | String | Order shipping including tax. |
| `shipping_excl_tax` | String | Order shipping excluding tax. |
| `voucherapplication_set` | List | Order voucher discounts applied, see [voucher](#voucher). |
| `shipping_address` | Object | Order shipping address, see [address](#address). |
| `billing_address` | Object | Order billing address, see [address](#address). |


### order line

Order line object details accessed through an order. See [order](#order) for example usage.

| Property | Type | Description |
| ----- | ------ | ------ |
| `product` | Object | Line item product, see [product](#product). |
| `title` | String | The order line title, full product name at time of sale. |
| `quantity` | String | Product quantity. |
| `unit_price_incl_tax_incl_discount` | String | Per unit price including tax, including discounts. |
| `unit_price_excl_tax` | String | Per unit price excluding tax. |
| `unit_price_incl_tax` | String | Per unit price including tax. |

### page

Storefront Page object details available in the `pages/page.html` template and custom page templates.

| Property | Type | Description |
| ----- | ------ | ------ |
| `title` | String | Page title. |
| `content` | String | Page content. |
| `get_meta_title` | String | Page SEO meta title. |
| `get_meta_description` | String | Page SEO meta description. |

### paginator

The `paginator` object is available on "list views" where the items to display are paginated from the backend, works in tandem with [page_obj](#page_obj).

| Property | Type | Description |
| ----- | ------ | ------ |
| `num_pages` | Integer | Number of pages in pagination set. |


### page_obj

The `page_obj` object is available on "list views" where the items to display are paginated from the backend, works in tandem with [paginator](#paginator).

| Property | Type | Description |
| ----- | ------ | ------ |
| `number` | Integer | Current page number. |
| `has_next` | Object | Next page object. |
| `has_previous` | Object | Previous page. |
| `next_page_number` | Integer | Next page number. |
| `previous_page_number` | Integer | Previous page number. |

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

Blog post properties available through global [post](#posts) context and the `blog/post.html` and `blog/index.html` templates.

| Property | Type | Description |
| ----- | ------ | ------ |
| `id` | String | The post ID. |
| `featured_image` | File | Blog post featured image file, use `.url` to access full file link. |
| `categories` | List | List of related post categories, see [post_category](#post_category ). |
| `get_absolute_url` | String | A full path link to the blog post. |
| `title` | String | The post title. |
| `content` | String | Post content. |
| `slug` | String | Post url slug. |
| `get_meta_title` | String | Post SEO meta title. |
| `get_meta_description` | String | Post SEO meta description.|

### post_category

Blog post category properties available through global [post_categories](#post_categories) context and the `blog/post.html` and `blog/index.html` templates.

| Property | Type | Description |
| ----- | ------ | ------ |
| `id` | String | Blog post category ID. |
| `name` | String | Blog post category name. |
| `get_absolute_url` | String | Blog post category canonical url link. |

### product

Product configured in the store.

| Property | Type | Description |
| ----- | ------ | ------ |
| `id` | String | Product ID. |
| `title` | String | Product title. |
| `get_title` | String | Product title. |
| `get_all_images` | List | List of product images, see [image](#image). |
| `get_description` | String | Product description. |
| `sku` | String | Product stock keeping unit (sku). |
| `categories` | List | List of product categories, see [product_category](#product_category).|
| `parent` | Object | Parent product if product is variant (child). |
| `is_child` | Boolean | Product structure indicating this is a variant product. |
| `primary_image` | File | Primary image of the product, use `.url` to access a full file link. |
| `get_absolute_url` | String | Product canonical url link. |
| `num_approved_reviews` | Integer | Count of approved product reviews. |
| `rating` | Integer | Product rating as a number between 1 and 5. |
| `reviews` | Integer | List of product reviews, see [review](#review). |
| `get_meta_title` | String | Product SEO meta title. |
| `get_meta_description` | String | Product SEO meta description. |

### product_category

Product category object.

| Property | Type | Description |
| ----- | ------ | ------ |
| `id` | String | Category ID. |
| `name` | String | Category name. |
| `description` | String | Category description. |
| `image` | File | Category image, use `.url` to access image link. |
| `get_absolute_url` | String | Category canonical url link. |
| `get_meta_title` | String | Category SEO meta title. |
| `get_meta_description` | String | Category SEO meta description. |

### price

Product price object.

| Property | Type | Description |
| ----- | ------ | ------ |
| `currency` | String | Price currency. |
| `price` | String | Price that will be charged. |
| `price_retail` | String | Suggested retail price. |


### review

Product review object.

| Property | Type | Description |
| ----- | ------ | ------ |
| `id` | String | Review ID. |
| `title` | String | Review title. |
| `score` | Integer | Review score. |
| `user` | Object | The customer that created the review, see [user](#user). |


### user

User in storefront context is the same as "customer".

| Property | Type | Description |
| ----- | ------ | ------ |
| `id` | String | Customer's unique id. |
| `first_name` | String | Customer's first name. |
| `last_name` | String | Customer's last name. |
| `email` | String | Customer's email address. |
| `phone_number` | String | Customer's phone number in e.164 format. |
| `language` | String |  Customer's preferred communication language. |
| `accepts_marketing` | String | Wether or not the customer accepts marketing communications. |
| `ip` | String | Customer's most recently used IP address. |
| `user_agent` | String | Customer's most recently used user agent String. |

### voucher

Voucher object.

| Property | Type | Description |
| ----- | ------ | ------ |
| `title` | String | Voucher title. |
| `code` | String | Voucher code. |
