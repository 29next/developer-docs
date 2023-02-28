---
sidebar_label: Custom Product Templates
tags:
 - Guide
---
# Custom Product Templates

Products can have very diverse design requirements that often require custom layouts. In this guide, we'll go over some of the best practices for creating and managing custom product templates.

### Product Templates Location

In the `templates/catalogue` directory of a theme, theme developers can edit/manage the product page templates.

```title="Product Templates Location"
catalogue
  └── product.html (default)
  └── product.<custom1>.html
  └── product.<custom2>.html
```

### Extend & Override

**Create a Custom Product Template**

Create a new product template in the **templates>catalogue** directory with the following naming convention:

```title="Custom Product Template Naming"
templates/catalogue/product.<custom>.html
```

Templates that follow this naming convention will be selectable on the product detail to use on the storefront.


**Extend & Override Default Product Template**

As a best practice, you should [extend](/themes/templates/tags.md#extends-block) the default product template to override the necessary [template blocks](/themes/templates/tags.md#extends-block) to achieve your customization with a limited amount of duplicate code.


```django title="Example Custom Product Template"

{% extends "templates/catalogue/product.html" %}

{% block header %}
    // Custom Product Header Code
{% endblock header %}

{% block product_description %}
    // Custom Product Content Template Code
{% endblock %}


```

This strategy will simplify the creation and management of custom product templates so you can focus on the customized areas for the new custom product template.


**Select Template for Product**

On your product of choice, select your newly created template as the Product Template to activate the template on your product in the storefront.


:::tip

You are not limited to overriding the existing template blocks in the default product template. You can create and add your own to the default template to overide in your custom template. For example, adding `{% block my_custom_block %}{% endblock %}` to product.html, around any area you wish to customize, will allow you to overide it in the custom template
:::
