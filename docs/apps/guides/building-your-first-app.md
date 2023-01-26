---
title: Building Your First App
sidebar_position: 10
tags:
 - Guide
---

# Building Your First App

In this guide, we'll show you how to create your first app to get you up and running and familiar with many of the concepts.

### Preparation

1. If you haven't done so already, create your [29 Next account](https://accounts.29next.com) and complete your [Partner Registration](https://accounts.29next.com/partners/).

2. Install [App Kit](/apps/app-kit.md) on your local machine.

3. Make sure you have access to a store you plan to use for development - you will use this in later steps.


### Create Your App

1. Inside your Partner Account, navigate to Apps and then Create App. Follow the form to create your first app, don't worry about the App name and details, you can change this later.

2. After creating your App, you'll be able to see your App details. Take note of your `Client ID` as it will be used to connect your local machine to the app on 29 Next.

3. Add your development store to the "Development Stores" section. This will ensure that your app is automatically pushed to your development store for review and testing.

```mdx-code-block

import DevelopmentStore from '@site/_snippets/_offer-development-store.mdx';

<DevelopmentStore name="Development Store Offer" />

```

### Configure App on Local

Now it's time to configure your local machine to connect to your app on 29 Next.

1. In your local terminal, navigate to your app directory.

2. Run `nak setup` and follow the prompts to configure your local app directory to push your app code to 29 Next.

3. Add your app `snippets`, `assets`, and `manifest.json` to your current directory.


### Build & Push App Bundle

After you've added all of your app files, you're ready push your app bundle to 29 Next.

1. Run `nak build` to compile your app bundle.

2. Run `nak push` to push your app bundle to 29 Next.


### Test App On Development Store

Your app should now be installed and ready to test on your development store. :raised_hands:
