---
sidebar_label: Event Tracking
sidebar_position: 5
---
# App Event Trackers

Apps can install an [Event Tracker](/docs/themes/event-tracking.md) to add storefront ecommerce Event Tracking as part of their integration.

This makes setting up and using your app easy for merchants requiring fewer manual setup steps and easy configuration through the dashboard.


:::caution
Event trackers and App snippets are not cross compatible as Event Trackers are loaded in their own sandboxed environment for greater security.
:::

### Add Event Tracker to Manifest

When building your app, map a javascript file to be installed as an Event Tracker.

```json title="Example Storefront Event Tracker"
"storefront_event_tracker": "tracking.js",
```

When your app is installed, an event tracker will be automatically created with the content of the javascrpt file mapped to the `storefront_event_tracker` key from your manifest.json.

### Access App Settings Inside Event Tracker

Apps also have Settings that can be used to control the configuration of how the app works.

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
