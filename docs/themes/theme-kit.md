---
sidebar_label: Theme Kit
sidebar_position: 4
---
# Theme Kit

[Theme Kit](https://github.com/29next/theme-kit) is a command line tool for developers to build an maintain storefront themes programmatically, allowing theme developers to:

- Work on theme templates and assets using their local code editor or favorite IDE.
- Use git version control to work on a theme collectively with many theme collaborators.
- Use a pipeline to manage deployments of theme updates.

[See Full Instructions on Github](https://github.com/29next/theme-kit) or [Install Theme Kit from PyPi](https://pypi.org/project/next-theme-kit/)


### Installation

Theme Kit is a python package available on [PyPi](https://pypi.org/project/next-theme-kit/)

If you already have `python` and `pip`, install with the following command:

```
pip install next-theme-kit
```

#### Mac OSX Requirements
See how to install `python` and `pip` with [HomeBrew](https://docs.brew.sh/Homebrew-and-Python#python-3x). Once you have completed this step you can install using the `pip` instructions above.

#### Windows Requirements

* **Option 1 (Recommended)** - Windows 10 and above feature WSL (Windows Subsystem for Linux) which provides a native Linux environment, see how to [Install WSL with Ubuntu](https://docs.microsoft.com/en-us/windows/wsl/install). Once you have installed WSL, follow the [best practice guides to configure and use with VS Code](https://docs.microsoft.com/en-us/windows/wsl/setup/environment) and then follow the `pip` instructions above to install Theme Kit.

* **Option 2** - Installing `python` in Windows natively can be done with through the [Windows App Store](https://apps.microsoft.com/store/detail/python-39/9P7QFQMJRFP7?hl=en-us&gl=us). Recommend using [Windows Powershell](https://apps.microsoft.com/store/detail/powershell/9MZ1SNWT0N5D?hl=en-us&gl=us). This route is a little more tricky and some knowledge on how to manage python in windows will be required.

:::tip
**Use Python Virtual Environments** - For Mac, Windows, and Linux, it's a best practice to use a Python Virtual Environment to isolate python packages and dependecies to reduce potential conflicts or errors, [more on creating a Python Virutal Environment](https://www.freecodecamp.org/news/how-to-setup-virtual-environments-in-python/).
:::

### Generate an API Key
Store authentication uses [Oauth](https://auth0.com/intro-to-iam/what-is-oauth-2/) and requires creating a store Oauth App with `theme:read` and `theme:write` permissions.

1. In the Storefornt admin area create an Oauth App from **Settings>API Access** by clicking **Create App**
2. From the **Create Oauth App** window give the app a name and assign a user from the select field
3. In the new app's **Permissions** tab enable the `theme:read` and `theme:write` permissions.
4. Click **save** and this will generate the API key needed for the themekit commands

### Usage
With the package installed, you can now use the commands inside your theme directory and work on a storefront theme.

:::tip
You must pass the `apikey` and `store` parameters for all commands **if** there is not an existing `config.yml` file in your current directory.
:::

| Command      | Description                          |
| ----------- | ------------------------------------ |
| `ntk init`       | Initialize a new theme  |
| `ntk list`       | List all available themes |
| `ntk checkout`    | Checkout an existing theme |
| `ntk pull`       | Download existing theme or theme file |
| `ntk push`       | Push current theme state to store |
| `ntk watch`    | Watch for local changes and automatically push changes to store |
| `ntk sass`       | Process sass to css, see [Sass Processing](#sass-processing) |


### Sass Processing
Theme kit includes support for Sass processing via [Python Libsass](https://sass.github.io/libsass-python/). Sass processing includes support for variables, imports, nesting, mixins, inheritance, custom functions, and more.

:::caution
Sass processing is only supported on local, files in the `sass` directory are uploaded to your store for storage but cannot be edited in the store theme editor.
:::

**How it works**

1. Put `scss` files in top level `sass` directory.
2. Run `ntk sass` or `ntk watch` to process theme `sass` files.
3. Top level `scss` files will be processed to `css` files in the asset directory with the same name.

**Example Theme with Sass Structure**
```
├── assets
│   ├── main.css // reference this asset file in templates
├── sass
│   ├── _base.scss
│   ├── _variables.scss
│   └── main.scss // processed to assets/main.css
```
