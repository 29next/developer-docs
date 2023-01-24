---
---
# Getting Started with OAuth

Server-side Apps that use Stores' Admin API must obtain authorization using OAuth 2.0 ([see overview](/apps/oauth/index.md)). This guide shows you how to authorize your app and retrieve your Access Token to access the Admin API.

### Step 1: Retrieve API Credentials

To get started, make sure that you have your Apps' `client_id` and `client_secret` available on the App details in your Partner account.

### Step 2: App Permissions Setup

During the App installation flow, Apps that have `oauth` configured will be redirected to the configured `oauth:app_url`.

:::caution

Your app should redirect the user back to the store authorization view configured with the scope permissions your app requires.
:::

``` title="Authorization Link Format"
https://{network_domain}/oauth2/authorize/?response_type=code&client_id={client_id}&redirect_uri={redirect_uri}&scope={scopes}
```

|Parameter|Description|
|-----|-----|
|`network_domain`| The store network domain that is installing the app. Can be referenced from the `store` url parameter sent to your `oauth:app_url`.  |
|`response_type`| Must be `code`, which only authorization flow supported at this time. |
|`client_id`| Your app `client_id` found in in your partner account.|
|`redirect_uri`|The url you want to receive the Authorization Code in your app. **Must be listed in your manifest's oauth:redirect_uris**. |
|`scope`| A space separated list of scopes such as `orders:read orders:write users:read users:write`. [See list of all available scopes](/api/admin/permissions.md). |


### Step 3: Confirm Installation

After user click's Authorize to confirm App installation, it will redirect to the `redirect_uri` with `?store={network_domain}&code={authorize_code}` appended.

``` title="Example"
https://yourapp.com/setup/authorize/?store={network_domain}&code={authorization_code}
```

|Parameter|Description|
|-----|-----|
|`network_domain`| The store network domain that is installing the app. Can be referenced from the `store` url parameter sent to your `oauth:redirect_uri`.  |
|`authorization_code`| The authorization code used to retrieve the Access Token in the next step.  |

### Step 4: Retrieve Access Token

After you have the `authorization_code`, you then need to retrieve the access token to gain access to the Admin API.

**Send a POST Request to `https://{network_domain}/oauth2/token/`**

```json title="Request Body to Retrieve Access Token"
{
    "grant_type": "authorization_code",
    "client_id": "{client_id}",
    "client_secret": "{client_secret}",
    "redirect_uri": "{redirect_uri}",
    "code": "{authorize_code}"
}
```

A successful request will have the following response.

```json title="Response with Access Token"
{
    "access_token": "{access_token}",
    "expires_in": 15778476000,
    "token_type": "Bearer",
    "scope": "{scopes}",
    "refresh_token": "{refresh_token}"
}
```

Save the `access_token` to your app to use with requests to the [Admin API](/api/admin/index.md) for the store. :clap:

!!! example "See Example App"

    To see this in action, see the [Example App](https://github.com/29next/example-app) on Github.
