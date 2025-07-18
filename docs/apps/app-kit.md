---
sidebar_label: App Kit
sidebar_position: 7
tags:
 - Tools
---
# App Kit

App Kit is a command line tool for developers to build and maintain apps that extend storefront themes with [Event Trackers](/docs/apps/event-tracking.md).

:::caution Not Required for Server to Server Apps
App Kit is only required for Apps that extend to the storefront with App Snippets, [Server to Server Apps](/docs/apps/guides/server-to-server-apps/) do not need to use App Kit to complete the Oauth Flow for your App to access the Admin API.
:::


:::info
[See Full Instructions on Github](https://github.com/29next/app-kit) or [Install App Kit from PyPi](https://pypi.org/project/next-app-kit/)
:::

## Installation

App Kit is a python package available on [PyPi](https://pypi.org/project/next-app-kit/)

If you already have `python` and `pip`, install with the following command:

```
pip install next-app-kit
```

#### Mac OSX Requirements
See how to install `python` and `pip` with [HomeBrew](https://docs.brew.sh/Homebrew-and-Python#python-3x). Once you have completed this step you can install using the `pip` instructions above.

#### Windows Requirements
See how to install `python` and `pip` with [Chocolatey](https://python-docs.readthedocs.io/en/latest/starting/install3/win.html). Once you have completed this step you can install using the `pip` instructions above.

## Usage
With the package installed, you can now use the commands inside your app directory to build and push your app updates.


| Commands | Description |
|-----|-----|
|`nak setup` | Configure current directory with an app in your account |
|`nak build` | build new app zip file |
|`nak push` | push latest app zip file to Next Commerce platform |


#### Setup
Configures the current directory with necessary data to push the app files to Next Commerce.

**Data collected by the `setup` command:**

- **App Client ID** - retrieve this from the app in your partner account.
- **Email** - your email used to access your partner account.
- **Password** - your password used to access your partner account.

#### Build
Creates a new version (zip of the current directory files) to prepare your app to be pushed to Next Commerce.

#### Push
Pushes the latest version to Next Commerce and to your development stores to review and test your app.
