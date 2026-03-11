---
sidebar_label: Event Tracking
sidebar_position: 5
---
# App Event Trackers

Apps can install an [Event Tracker](/docs/storefront/event-tracking.md) to add storefront ecommerce Event Tracking as part of their integration.

App installed event trackers simplifies the setup flow and makes using your app easy for merchants requiring fewer manual setup steps with easy configuration through the dashboard.


:::caution
Event trackers and App snippets are not cross compatible as Event Trackers are loaded in their own sandboxed environment for greater security.
:::

### Add Event Tracker to Manifest

When building your app, map a javascript file to be installed as an [Event Tracker](/docs/storefront/event-tracking.md).

```json title="Example Storefront Event Tracker"
"storefront_event_tracker": "tracking.js",
"settings_schema": [
     {
        "name": "custom_app_id_enabled",
        "type": "checkbox",
        "label": "Enable Custom App",
        "help_text": "",
        "default": false
     },
    {
        "name": "custom_app_id",
        "type": "text",
        "label": "Example Text Setting",
        "default": "",
        "required": 1,
        "help_text": "",
        "max_length": 250
    }
  ]
```

When your app is installed, an event tracker will be automatically created with the content of the javascrpt file mapped to the `storefront_event_tracker` key from your manifest.json.

### Access App Settings Inside Event Tracker

Apps also have [Settings](/docs/apps/settings.md) that can be used to control the configuration of how the app works, such as enabling or disabling some funcationality, or adding an ID into for the tracking script.

Access the settings keys in your event tracker for configuration variables in your javascript.

```javascript title="Example Settings Usage in Snippet"
// access your app settings through app.settings.<settings name>

if (app.settings.custom_app_id_enabled) {
    console.log(app.settings.custom_app_id);
}
```

```mdx-code-block

import GoogleAnalytics from '@site/_snippets/_view-google-analytics.mdx';

<GoogleAnalytics />

```
