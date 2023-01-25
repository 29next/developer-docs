---
sidebar_label: Manifest
sidebar_position: 3
---
# App Manifest Reference

## Manifest Reference
The manifest.json file is used to configure your app.

```json title="Example manifest.json"
{
  "oauth": {
    "app_url": "https://oauthdebugger.com/debug",
    "redirect_uris": [
      "https://oauthdebugger.com/debug"
    ]
  },
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

### oauth

If your app uses OAuth to make API requests to a third-party product, you must specify the details using this property and add a parameter of type "oauth".

If this property is specified, users will go through the OAuth authentication flow during installation of the app where you'll receieve an OAuth Access Token to access the installing store's Admin API.

**See [OAuth Overview](/apps/oauth/index.md) for full setup flow details**


* `app_url` - Your app OAuth setup url, [see app permissions setup](/apps/oauth/getting-started.md#step-2-app-permissions-setup), required.
* `redirect_uris` - a list of urls that are allowed to during setup flow, required.

```json title="Example oauth"
"oauth": {
    "app_url": "https://oauthdebugger.com/debug",
    "redirect_uris": [
      "https://oauthdebugger.com/debug"
    ]
  }
```

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
