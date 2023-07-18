---
sidebar_label: App Kit
sidebar_position: 7
tags:
 - Tools
---
# App Kit

App Kit is a command line tool for developers to build and maintain apps that extend storefront themes with [App Snippets](/docs/apps/snippets.md).

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
|`nak push` | push latest app zip file to 29 Next platform |


#### Setup
Configures the current directory with necessary data to push the app files to 29 Next.

**Data collected by the `setup` command:**

- **App Client ID** - retrieve this from the app in your partner account.
- **Email** - your email used to access your partner account.
- **Password** - your password used to access your partner account.

#### Build
Creates a new version (zip of the current directory files) to prepare your app to be pushed to 29 Next.

#### Push
Pushes the latest version to 29 Next and to your development stores to review and test your app.
