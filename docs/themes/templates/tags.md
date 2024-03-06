---
title: Tag Reference
sidebar_label: Tag Reference
sidebar_position: 1
---
```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

### app_asset_url

The `app_asset_url` tag is used to reference asset files included in app snippets.

```django
<script src=="{% app_asset_url 'assets/my-app.js' %}"></script>
```

### app_hook

The `app_hook` tag specifies a theme storefront location Apps can inject snippets into to extend storefront templates from Apps. Theme developers should ensure their templates include all available `app_hooks` to ensure compatability with all Apps.

```django
{% app_hook 'global_header' %}
```

**Available `app_hook` locations include:**

```mdx-code-block

import AppHookLocations from '@site/_snippets/_app-hook-locations.mdx';

<AppHookLocations />

```

### boolean operators
If tags may be used in combination with boolean operators for conditional control flow.

| Operator     | Description                          |
| ----------- | ------------------------------------ |
| `and`       | multiple conditions are true  |
| `or`        | either condition is true |
| `not`       | a condition is not true |
| `in`       | contained within |
| `not in`       | a condition is not true |
| `is`       | two values are the same|
| `is not`       | two values are not the same |
| `==`       | equality |
| `!=`       | inequality |
| `<`       | less than |
| `>`       | greater than |
| `<=`       | less than or equal to |
| `>=`       | greater than or equal to |


### comment

Ignores everything between {% comment %} and {% endcomment %}. An optional note may be inserted in the first tag. For example, this is useful when commenting out code for documenting why the code was disabled.

```django
<p>Rendered text with {{ pub_date|date:"c" }}</p>
{% comment "Optional note" %}
    <p>Commented out text with {{ create_date|date:"c" }}</p>
{% endcomment %}
```

### csrf_token

This tag is used for CSRF protection and required on any template with a form that sends a POST request to the back end.

```django
<form>
    {% csrf_token %}
    <input type="text" id="example" name="Example Input">
    <input type="submit" value="Submit">
</form>
```



### extends & block

Extends and block tags allow you to define blocks of content in a base template that can be overridden by templates that extend from it.

<Tabs>
<TabItem value="parent" label="Parent Template">

```django title="layouts/base.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="{{ 'assets/style.css'|asset_url }}">
    <title>{% block title %}My amazing store{% endblock %}</title>
</head>

<body>
    <div id="sidebar">
        {% block sidebar %}
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/blog/">Blog</a></li>
        </ul>
        {% endblock %}
    </div>

    <div id="content">
        {% block content %}{% endblock %}
    </div>
</body>
</html>
```
</TabItem>
<TabItem value="child" label="Child Template">

```django title="templates/blog.html"
{% extends "layouts/base.html" %}
{% block title %}My Blog Post Title{% endblock %}
{% block sidebar %}
    <div class="sidebar">
        <h4>Custom Sidebar</h4>
    </div>
{% endblock %}
{% block content %}
    <h4>My Blog Post Title...</h4>
{% endblock %}
```

</TabItem>
</Tabs>

### for

Loops over each item in array, making the item available in a context variable. For example, to display a list of products provided in the `{{ products }}` variable.

```django
<ul>
    {% for each in products %}
    <li>{{ each.get_title }} - Rating {{ each.rating }} stars</li>
    {% endfor %}
</ul>
```

### if, elif, & else
Use the if tag to evaluate if a variable is "true" and control the contents displayed.

```django
{% if products_list > 2 %}
    <p>Number of products: {{ products_list|length }}</p>
{% elif products_list %}
    <p>We only have a single product now.</p>
{% else %}
    <p>Sorry, there are no products.</p>
{% endif %}
```

### include

Loads a template and renders it with the current context. This is a way of including other templates within a template.

```django
<html lang="en">
<body>
    {% include "partials/footer.html" %}
</body>
</html>
```

:::caution
A word of caution, multi-level inclusion inside of iterative loops can create performance penalties while rendering a page html for site visitors. Use **includes** sparingly when working inside iterative loops.
:::

### image_thumbnail
The `image_thumbnail` tag is used to resize images dynamically in templates. The tag accepts arguments that control how the image is resized.

```django
{% with image=line.product.primary_image %}
      {% image_thumbnail image.original "200x200" upscale=False as thumb %}
      <a href="{{ line.product.get_absolute_url }}">
         <img class="thumbnail" src="{{ thumb.url }}" alt="{{ product.get_title }}">
      </a>
{% endwith %}
```

| Argument | Description |
| --- | --- |
| size | Example, 100x100 (widthxheight), sets the desired image size in pixels. If width and height are given the image is rescaled to maximum values of height and width given. Aspect ratio preserved. |
| crop | This option is only used if both width and height is given. Crop behaves much like css background-position. The image is first rescaled to minimum values of height and width given, this will be equivalent to the padding box in the above text.  |
| upscale | Upscale is a boolean and controls if the image can be upscaled or not. For example if your source is 100x100 and you request a thumbnail of size 200x200 and upscale is False this will return a thumbnail of size 100x100. If upscale was True this would result in a thumbnail size 200x200 (upscaled). The default value is `True`. |
| quality | Quality is a value between 0-100 and controls the thumbnail write quality. Default value is `95`. |
| progressive |This controls whether to save jpeg thumbnails as progressive jpegs. Default value is `True`.|
| orientation |This controls whether to orientate the resulting thumbnail with respect to the source EXIF tags for orientation. Default value is `True`.|
|format|This controls the write format and thumbnail extension. Formats supported by the shipped engines are 'JPEG' and 'PNG'. Default value is `JPEG`.|
|padding|Padding is a boolean and controls if the image should be padded to fit the specified geometry.|


### now

Displays the current date and/or time, using a format according to the given string. [See available date reference for format options](https://docs.djangoproject.com/en/dev/ref/templates/builtins/#date).



### purchase_info_for_product

The `purchase_info_for_product` tag is used to retrieve the price of a product in the current user session's currency.

```django
{% purchase_info_for_product request product as session %}
{% if session.price.exists %}
    {{ session.price.price|currency:session.price.currency }}
{% else %}
```

| Argument | Description |
| --- | --- |
| request | Must pass the current `request` context object. |
| product | Must pass the current `product` context object. |


### seo
The `seo` tag generates SEO meta data for products in standardized format for consumption by 3rd party systems.

```django
{% seo %}
```
The tag is expected to be added to the top of product details template to generate necessary SEO meta data.


### t

The `t` (translation) tag is used to display localized content from a theme's translations files. The t tag accepts a key and additional replacement variable arguments to access the theme translations and return the language appropriate string for display to the user.

```django
{% t 'customer.orders.order_count' with count=orders.count %}
```

### url

Returns an absolute url path reference matching a given view with parameters. See the URL & Template Path reference for a list of all URL names to use with the `{% url %}` template tag.

```django
<a href="{% url 'blog:blog-list' %}">Blog</a>
```

### where

Queries and filters store objects to dynamically assign objects to a variable.

```django
{% where {{ objects }} {{ field_name }} {{ lookup_expr }} as {{ variable }} %}
```

| Argument | Description |
| --- | --- |
| objects | The global context object. Supported objects include; [`products`](/docs/themes/templates/objects.md#products), [`product_categories`](/docs/themes/templates/objects.md#product_categories), [`posts`](/docs/themes/templates/objects.md#posts), [`post_categories`](/docs/themes/templates/objects.md#post_categories), [`currencies`](/docs/themes/templates/objects.md#currencies), [`storefront_geos`](/docs/themes/templates/objects.md#storefront_geos)  |
| field_name | Object field name to perform the lookup on. |
| lookup_expr | Query lookup expression; `exact` or `contains`. |
| variable | Assigned template variable name, ie `featured_products`. |
