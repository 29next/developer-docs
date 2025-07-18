---
title: Server to Server Apps
sidebar_position: 0
tags:
 - Guide
---

# Building Server to Server Apps

Server to Server apps are those that leverage the [Oauth flow](/apps/oauth/index.md) to obtain API Access and then use the [Admin APIs](/api/admin/index.md) and [Webhooks](/webhooks.md) to subscribe to store event activity.


:::info
Server to Server apps don't need to upload any "code" or files to Next Commerce, their apps are fully external and simply use Oauth to obtain Admin API access.
:::

In this guide, we'll show you how to create your first app to get you up and running and familiar with many of the concepts.

### Preparation

1. If you haven't done so already, create your [Next Commerce account](https://accounts.29next.com) and complete your [Partner Registration](https://accounts.29next.com/partners/).

2. Make sure you have access to a store you plan to use for development - you will use this in later steps.

```mdx-code-block

import DevelopmentStore from '@site/_snippets/_offer-development-store.mdx';

<DevelopmentStore name="Development Store Offer" />

```

### Create Your App

1. Inside your Partner Account, navigate to Apps and then Create App. Follow the form to create your first app, don't worry about the App name and details, you can change this later.

2. After creating your App, you'll be able to see your App details. Take note of your `Client ID` and `Client Secret` which are used in the [OAuth flow](/apps/oauth/index.md) to retrieve an API Access Token during the [App Install flow](/docs/apps/oauth/getting-started.md).


### Configure App Oauth

Server-to-Server apps use follow the [OAuth flow](/apps/oauth/index.md) to get and Admin API Access Token, let's add the [Oauth 2.0 <debugger/>](https://oauthdebugger.com/) urls to our app to simulate the install flow.

1. In **App > Settings** add `https://oauthdebugger.com/debug` as your App URL and Redirect URL to configure you app to use oauth debugger.

2. Install your app on your store using the **Install Link** tool on your App Overview.


### Test App On Development Store

1. You can now use [Oauth Debugger](https://oauthdebugger.com/) to simulate the Oauth flow.


Your app should now be installed and ready to testing and further development to build the Oauth. :raised_hands:
