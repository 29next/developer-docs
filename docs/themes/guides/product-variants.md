---
sidebar_label: Product Variants
tags:
 - Guide
---
# Product Variants Guide


Products with multiple variants are very common, for example, a shirt with 3 colors (Blue, Green, Red) and 4 sizes (S,M,L,XL) would have a total of 12 actual product choices (SKUs). Presenting the variant choices to users can add significant complexity for theme developers to create great user experiences for customers within the catalogue. Let's go over how Products with variants and their attributes can be mapped together in the storefront product details template.

### Variant Attribute Choices

The first step to adding variant support is adding the Variant Attribute Selectors in your product template to allow a user to see the variant attribute choices.Looping over the `variant_form` template object provides a path to dynamically creating the variant attribute choice selectors driven by the product configuration.

```django title="templates/catalogue/product.html"

{% for field in variant_form %}
    {% if 'attr' in field.id_for_label %}
        {% include "partials/form_field.html" with field=field %}
    {% endif %}
{% endfor %}

```

:::tip
Using the choice fields from the template is entirely optional. Theme developers can create their own custom choice selectors using the `product.data` json object for a more customized user experience.
:::

### Map Choices to Variants

With the variant choices now available in the template, it is now necessary to map choices from the `variant_form` choices to variant product IDs.


*Accessing all variant product data*

Use the `product.data` object in your template to generate a detailed json object of the product images, variant attributes, variant prices, and variant availability.

```django
{{ product.data|json_script:"product-data" }}
```

Use javascript in your template to map the variant select fields to the available product ID and update the add-to-cart form to add the chosen variant. See full example in our Base Theme.

