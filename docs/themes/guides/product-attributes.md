---
---

# Product Attributes

Product attributes let you set additional data for a product through a [Product Class](https://docs.29next.com/catalogue#product-classes) and are an important concept for catalogue modeling. As a theme developer, you can leverage product attributes in templates to customize the product display.


### Template Access

Product Attributes have a `code` field which in turn becomes available as a variable in templates for rendering.

```html
{{ product.attr.<code> }}
```

Values set on the product for the given product attribute will render in the product template. This concept can be used to create customized and configurable products in the storefront.

### Example

Let's look at an example of adding support for a **Product Tagline** to a product template that can be set on an individual product basis in the dashboard.

1. **Create Tagline Product Attribute**

    On your Product Class, add a new Text attribute with the code `tagline`.

2. **Add Tagline Attribute Variable to Product Template**

    In your theme's product template, add render the tagline by accessing it with a template variable.

    ```html
    {{ product.attr.tagline }}
    ```

3. **Add Tagline Value to Product**

    In your product, set a value for the Tagline attribute to render the Tagline in your store. :clap:


