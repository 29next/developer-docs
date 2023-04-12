---
sidebar_label: Manifest
sidebar_position: 3
---
# App Manifest Reference


App manifest.json is used for apps extending the storefront to configure HTML snippets that can be injected into storefront themes through [app_hooks](/themes/templates/tags.md#app_hook). You can also add settings that can generate a settings page in the store dashboard to configure your app in the case your app only extends the storefront and doesn't have a server side integration.


## Manifest Reference
The manifest.json file is used to configure your app.

```json title="Example manifest.json"
{
  "locations": {
    "storefront": {
      "global_header": "snippets/global-header.html",
      "view_product": "snippets/view-product.html"
    }
  },
  "settings_schema": [
     {
        "name": "enable_app",
        "type": "checkbox",
        "label": "Enable Custom Optimizer App",
        "help_text": "",
        "default": false
     },
    {
        "name": "example_setting",
        "type": "text",
        "label": "Example App Text Setting",
        "default": "",
        "required": 1,
        "help_text": "",
        "max_length": 250
    }
  ]
}

```

## Manifest Properties

### locations

Specifies and maps App Snippets that extend Storefront theme templates. See Theme [app_hook reference](/themes/templates/tags.md#app_hook) for a full list of supported Storefront Theme locations.


```json title="Example locations"
"locations": {
    "storefront": {
      "global_header": "snippets/global-header.html",
      "complete_checkout": "snippets/complete-checkout.html"
    }
  },
```


### settings_schema

Specifies the settings schema used for storing local settings data within the app that can be referenced in snippets. The settings schema will generate a form available to store admins to add settings for their store. Server side apps also will have access to an App Settings API that can be used to push settings values directly to stores.

```json title="Example settings_schema"
"settings_schema": [
    {
        "name": "enable_app",
        "type": "checkbox",
        "label": "Enable Custom App",
        "help_text": "",
        "default": false
    },
    {
        "name": "example_setting",
        "type": "text",
        "label": "Example App Text Setting",
        "default": "",
        "required": 1,
        "help_text": "",
        "max_length": 250
    }
],
```
