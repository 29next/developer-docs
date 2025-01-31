---
sidebar_label: Settings
sidebar_position: 6
---
# App Settings Reference

App Settings allow you to define settings that you want users to configure and store with your app. Settings should be defined in your [manifest.json](/apps/manifest.md) file which will automatically create a form for your app to be configured in the dashboard.


```mdx-code-block

import GoogleAnalytics from '@site/_snippets/_view-google-analytics.mdx';

<GoogleAnalytics />

```

### Example Usage

At this time, the primary use case of settings is to allow apps to store settings data that can then be used with snippets. This makes it possible to extend storefront theme's natively through the use of that are rendered in themes yet fully contained and controlled by your app. :tada:

```json title="Example Settings Schema"

  "settings_schema": [
     {
        "name": "custom_app_id_enabled",
        "type": "checkbox",
        "label": "Enable My Custom App",
        "help_text": "",
        "default": false
     },
    {
        "name": "custom_app_id",
        "type": "text",
        "label": "Example App Text Setting",
        "default": "",
        "required": 1,
        "help_text": "",
        "max_length": 250
    }
  ]
```

You can then use the settings in your app snippets.

```javascript title="Example Settings Usage in Snippet"
// access your app settings through app.settings.<settings name>

if (app.settings.custom_app_id_enabled) {
    console.log(app.settings.custom_app_id);
}
```

:::info
For Sever to Server Apps with access to the Admin API, you can update the app settings values stored in the database on the Admin API allowing you to configure the app from your external application.
:::

### Reference

| Attribute       | Required         | Description               |
| -----------| --------------------|---------------- |
|`type`| Yes | Type of form input, see Input Types. |
|`name`| Yes | Name of the setting and key for access in template settings object variable. |
|`label`| Yes | Theme settings form input label. |
|`help_text`| No | Theme settings form input help text that shows below the input. |
|`required`| No | JSON boolean, accepts true or false, false by default.  |
|`default`| No | Default value for the setting.  |
|`options` | No |List of `key:value` pairs for options. Applicable to radio and select field types for their choices.  |
|`max_length` | No | Applicable to `text` field types to limit the length of text input.  |
|`max_value`| No | Applicable to number field types to limit the max value.  |
|`min_value`| No | Applicable to number field types to set a min value. |


### Input Types

Settings schema input types map to input fields that will be rendered in the theme settings form in the dashboard.

#### text

```json
{
    "type": "text",
    "name": "custom_app_id",
    "label": "App Account ID",
    "help_text": "Can be found in your app settings.",
    "max_length": 250,
    "required": true,
    "default": ""
}
```


#### textarea

```json
{
    "type": "textarea",
    "name": "description",
    "label": "Description",
    "help_text": "Example input textarea",
    "default": "Test"
}
```

#### checkbox

```json
{
    "name": "enable_cookie_msg",
    "label": "Enable Cookie Message Pop",
    "help_text": "Enable cookie message to site visitors.",
    "type": "checkbox",
    "default": true
}
```
#### number
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


#### email

```json
{
    "type": "email",
    "name": "contact_email_address",
    "label": "Public contact email address.",
    "help_text": "Email to show in site footer.",
    "default": ""
}
```

#### radio

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

#### select
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

#### multi-select
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
        }
    ],
    "default": [
        "visa",
        "mastercard"
    ]
}
```

#### url
```json
{
    "type": "url",
    "name": "social_link",
    "label": "Social Media Link",
    "help_text": "Link to your social media page.",
    "default": ""
}
```


#### color
```json
{
    "type": "color",
    "name": "btn_primary_color",
    "label": "Primary Button Color",
    "help_text": "Primary color for buttons.",
    "default": ""
}
```
