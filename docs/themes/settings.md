---
sidebar_label: Settings
sidebar_position: 3
---
# Theme Settings

### Introduction

Theme support dynamic settings for use in in a theme that can be managed in the store dashboard theme editor. Theme settings consist of two JSON files in the config directory.

- `settings_schema.json` - Used to create the settings schema to create the settings form in the dashboard theme editor.

- `settings_data.json` - Used to store theme settings values for access in templates for template compiling.

### Theme settings location

In the `configs` directory of a theme, theme developers can edit/manage dynamic settings that can be used to customize a theme.

```title="Theme settings location"
configs
  └── settings_schema.json
  └── settings_data.json
```

### Using Settings in Templates

Settings are passed to templates settings context variable allowing you to access settings values by their name. See example below of changing the layout by conditionally adding a class based on a radio setting.




```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs>
<TabItem value="settings" label="Settings Schema">

```json
{
    "General": {
        "Settings": [
            {
                "name": "store_name",
                "label": "Store Name",
                "help_text": "Public name of your store.",
                "type": "text",
                "max_length": 250,
                "required": 1,
                "default": "Store Name"
            },
            {
                "name": "layout",
                "label": "Layout Style",
                "help_text": "Control the layout style.",
                "type": "radio",
                "options": [
                    {
                        "name": "Boxed",
                        "value": "boxed"
                    },
                    {
                        "name": "Full Width",
                        "value": "full"
                    }
                ],
                "default": "boxed"
            }
        ]
    }
}
```

</TabItem>
<TabItem value="template" label="Template">

```html
<div class="{% if settings.layout == 'boxed' %}container{% endif %}">
    <h1>Welcome to {{ settings.store_name }}!</h1>
    <div>Contionally boxed or full width content</div>
</div>
```

</TabItem>
</Tabs>

### Attribute Reference

| Attribute       | Required         | Description               |
| -----------| --------------------|---------------- |
|`type`| Yes | Type of form input, see Schema Input Types. |
|`name`| Yes | Name of the setting and key for access in template settings object variable. |
|`label`| Yes | Theme settings form input label. |
|`help_text`| No | Theme settings form input help text that shows below the input. |
|`required`| No | JSON boolean, accepts true or false, false by default.  |
|`default`| No | Default value for the setting.  |
|`options` | No |List of `key:value` pairs for options. Applicable to radio and select field types for their choices.  |
|`max_length` | No | Applicable to `text` field types to limit the length of text input.  |
|`max_value`| No | Applicable to number field types to limit the max value.  |
|`min_value`| No | Applicable to number field types to set a min value. |


## Schema Input Types

Schema input types map to input fields that will be rendered in the theme settings form in the dashboard.



### checkbox

```json
{
    "name": "enable_cookie_msg",
    "label": "Enable Cookie Message Pop",
    "help_text": "Enable cookie message to site visitors.",
    "type": "checkbox",
    "default": true
}
```

### color
```json
{
    "type": "color",
    "name": "btn_primary_color",
    "label": "Primary Button Color",
    "help_text": "Primary color for buttons.",
    "default": ""
}
```

### email

```json
{
    "type": "email",
    "name": "contact_email_address",
    "label": "Public contact email address.",
    "help_text": "Email to show in site footer.",
    "default": ""
}
```

### file

```json
{
    "type": "file",
    "name": "logo",
    "label": "Store Logo",
    "help_text": "Primary logo used throughout the site.",
    "default": "uploads/logo.png"
}
```

### multi-select
```json
{
    "type": "select",
    "multi-select": true,
    "name": "accepted_payment_methods",
    "label": "Accepted Payment Methods",
    "help_text": "Control which payment methods are shown.",
    "options": [
        {
            "name": "Visa",
            "value": "visa"
        },
        {
            "name": "Master Card",
            "value": "mastercard"
        },
        {
            "name": "American Express",
            "value": "amex"
        },
        {
            "name": "Paypal",
            "value": "paypal"
        },
        {
            "name": "Klarna",
            "value": "klarna"
        }
    ],
    "default": [
        "visa",
        "mastercard"
    ]
}
```


### number
```json
{
    "type": "number",
    "name": "homepage_testimonials_count",
    "label": "Homepage Number Testimonials to Show",
    "help_text": "Control the number of homepage testimonials to show",
    "max_value": 10,
    "min_value": 0,
    "default": 3
}
```


### product

```json
{
    "name": "hero_product",
    "label": "Hero Product",
    "type": "product",
    "help_text": "Hero product on homepage banner."
}

```

### products

```json
{
    "name": "featured_products",
    "label": "Featured Products",
    "type": "products",
    "help_text": "Featured products for homepage."
}
```

### product_category

```json
{
    "name": "featured_products",
    "label": "Featured Product Category",
    "type": "product_category",
    "help_text": "Featured product category for homepage"
}
```

### product_categories

```json
{
    "name": "top_product_categories",
    "label": "Top Product Categories",
    "type": "product_categories",
    "help_text": "Featured product categories for homepage"
}
```

### radio

```json
{
    "type": "radio",
    "name": "layout",
    "label": "Layout Style",
    "help_text": "Control the layout style.",
    "options": [
        {
            "name": "Boxed",
            "value": "boxed"
        },
        {
            "name": "Full Width",
            "value": "full"
        }
    ],
    "default": "boxed"
}
```

### select
```json
{
    "type": "select",
    "name": "header_style",
    "label": "Header Style",
    "help_text": "Choose header layout style.",
    "options": [
        {
            "name": "Full Width",
            "value": "full"
        },
        {
            "name": "Boxed",
            "value": "boxed"
        },
        {
            "name": "Overlay",
            "value": "overlay"
        }
    ],
    "default": "full"
}
```

### text

```json
{
    "type": "text",
    "name": "store_name",
    "label": "Store Name",
    "help_text": "Public name for your store.",
    "max_length": 250,
    "required": true,
    "default": "My New Store Name"
}
```

### textarea

```json
{
    "type": "textarea",
    "name": "description",
    "label": "Description",
    "help_text": "Example input textarea",
    "default": "Test"
}
```





### url
```json
{
    "type": "url",
    "name": "social_link",
    "label": "Social Media Link",
    "help_text": "Link to your social media page.",
    "default": ""
}
```
