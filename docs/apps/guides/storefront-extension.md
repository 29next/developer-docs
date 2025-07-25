---
title: Storefront Extension Apps
sidebar_position: 0
tags:
 - Guide
---

In this guide we'll go over all of the steps to get started building an app that extends storefront functionality to introduce many of the core app framework concepts and how to use them.

### Common Use Cases

Storefront extensions are commonly used for but not limited to:

- Install javascript tracking snippets to storefront and checkout flow, see [event tracking](/docs/apps/event-tracking.md).

### Preparation

1. If you haven't done so already, create your [Next Commerce account](https://accounts.29next.com) and complete your [Partner Registration](https://accounts.29next.com/partners/).

2. Make sure you have access to a store you plan to use for development - you will use this in later steps.

```mdx-code-block

import DevelopmentStore from '@site/_snippets/_offer-development-store.mdx';

<DevelopmentStore name="Development Store Offer" />


### App Layout Overview

Let's take a look at the basic file structure of apps to understand how to get started creating our first app.

```title="Example App Structure"
your-app
 ├── assets
 │   └──  my-app.js
 └── manifest.json
```

#### Manifest.json

A manifest.json file specifies the configuration and metadata needed to install and configure your app. [See Manifest Reference](/docs/apps/manifest/)


### App Kit

App Kit is a tool you install on your local machine to assist with bundling your app files and pushing them to the platform so they can be installed on a store.


### Setup App
Now that you have your app files, it's time to configure your app on your local to link it to your App `Client ID`.



```
App Client ID:  // your app client id
accounts.29next.com Email: your user account email
accounts.29next.com Password: your user account password

```




### Build Your App Bundle

Using App Kit, create a build of your app using the command line from your app directory.

```
nak build
```

### Push App
Now, push your app to your our platform using your username and password credentials for your account at `accounts.29next.com`.


