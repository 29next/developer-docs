---
sidebar_position: 2
---

# Session Token Overview

Session tokens are a method your app can use to authenticate users and requests from Next Commerce and your App.

### How Session Tokens Work

Session tokens follow the [JSON Web Tokens](https://jwt.io/introduction) standard. JWT tokens are signed objects your app can use to authenticate users to your app, see the example decoded token below. The JWT token is appended to requests to your app in the `token` parameter.

The JWT token can be verified with your App `CLIENT ID` and `CLIENT SECRET`, see example below.

```python title="JWT Token Decrypt & Verify"
import jwt

token = jwt.decode(
    <TOKEN>, <APP CLIENT SECRET>,
    audience=<APP CLIENT ID>
    algorithms=["HS256"]
)
print(token)
```

```json title="JWT Token Decoded"
{
  "iss": "https://example.29next.store/dashboard",
  "sub": "https://example.29next.store",
  "aud": "kbCWYEPXMezpXripKyDSlA68fb4auutiaEXmh3Rx",
  "exp": 1660881585,
  "nbf": 1660881525,
  "iat": 1660881525,
  "uid": 3,
  "user_email": "demo@29next.com",
  "store": "example.29next.store"
}
```

Tokens include details of the store and the store user (id & email) making the request. A valid token can be trusted as a verified request from a store with your app installed.


### Token Expiration

Tokens are shortlived with an expiration of 30 seconds, meaning they quickly expire and cannot be reused. It is recommended that you authenticate the users into your App with every request.

### Session Token Flow

Session tokens are generated from the store dashboard and can be used by your App to verify request authenticity before authenticating the user to your app.

``` mermaid
sequenceDiagram
  autonumber
  Store->>App: Redirects to App Oauth App URL with JWT token.
  App->>User: App decrypt/verify JWT token to authorize request
  App->>User: App loads an authenticated view for user.
```

:::tip
To see this in action, see the [Example App](https://github.com/29next/example-app) on Github.
:::
