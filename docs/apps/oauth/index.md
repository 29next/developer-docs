---
sidebar_position: 2
---

# OAuth Overview

This guide introduces OAuth Authentication for Server-side Apps to access the Admin API.

### Introduction to OAuth

OAuth 2.0 is the industry standard protocol for authorizing and assigning permissions to 3rd party apps. There are many great guides on the internet regarding OAuth 2.0, such as this [OAuth 2.0 introduction guide from Auth0.com](https://auth0.com/intro-to-iam/what-is-oauth-2/). Your Server-side App's language most likely has pre-built packages to assist with handling Oauth 2.0 Authentication flows.


### Access Tokens

OAuth 2.0 uses **Access Tokens** which represent authorization to access resources on behalf of the end-user, ie access the Admin API. During the setup flow for your app, you'll be able to obtain request required permissions, get authorization from a user and retrieve a long lived access token to use for all future access to the Admin API.


### OAuth Setup Flow

29 Next uses OAuth 2.0's Authorization Code Flow to issue an access token on behalf of users.

##### Authorization Flow

``` mermaid
sequenceDiagram
  autonumber
  User->>Store: Initiate App install
  Store->>App: Redirects to App oauth:app_url
  App->>Store: Redirect to store App Authorize View
  User->>Store: Authorizes the App
  Store->>App: Redirect to redirect_uri with Authorize Code
  App->>Store: App requests Access Token with Authorize Code
  Store->>App: Store responds with Access Token
  App->>Store: App can now access Admin API with Access Token
```

##### Authorization Flow Step Detail

1. User initiates the App installation process.
2. Store redirects to the oauth:app_url configured in [mainfest.json](/apps/manifest.md)
3. App redirects to the store to load the OAuth Authorization view and requests the merchant to authorize app and permission required scopes, [see authorization link example](/apps/oauth/getting-started.md#step-2-app-permissions-setup).
4. User authorizes the app and requested permission scopes in the store dashboard.
5. Store redirects to the app oauth:app_url with an [Authorization Code](https://oauth.net/2/grant-types/authorization-code/), a temporary credential representing the authorization, [see authorization code example](/apps/oauth/getting-started.md#step-3-confirm-installation).
6. The app requests an Access Token using the Authorization Code, [see example access token request](/apps/oauth/getting-started.md#step-4-retrieve-access-token).
7. Store returns an Access Token, [see example access token response](/apps/oauth/getting-started.md#step-4-retrieve-access-token).
8. The app can now access the Admin API using the Access Token, [see Admin API examples](/api/admin/index.md#basic-examples).


### Oauth Guides

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```
