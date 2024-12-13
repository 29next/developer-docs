---
sidebar_position: 6
---

# Install Flows


### Private Apps
All apps start in a `private` state while the app developer is building and testing their app internally. While an app is `private`, you can use the "Install Link" builder form on your app detail page.

You may also want to trigger the install flow from your app's UI, to do this you can add a form to build the install link for your user to start the install flow on their store.

```python title="Install Link"
https://{store_subdomain}.29next.store/dashboard/apps/install-app/?client_id={client_id}
```

|Parameter|Description|
|-----|-----|
|`store_subdomain`| The store subdomain.  |
|`client_id`| Your app Client ID found on the app detail page. |


### Public Apps

Public apps show in all store dashboards and can be installed by any merchant at any time. If you plan to publish your app, ensure your app handles the install flow with a good user experience that guides the user through the process with your app.
