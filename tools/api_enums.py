CAMPAIGNS_API_SPEC_SOURCE = "https://campaigns.apps.29next.com/api/schema/"

CAMPAIGNS_API_SPEC_ADDITIONS = {
    "servers": [{"url": "https://campaigns.apps.29next.com", "description": ""}],
    "security": [{"API Authentication": []}],
}

CAMPAIGNS_API_DESCRIPTION = """
## Overview
Campaigns API is a headless API for developers to easily create complex external checkout flows using javascript, **no backend server-side integration required**.

Before using the Campaigns API, you'll need to install the **Campaigns App** on your store and create a campaign to retrieve your API Key.

## Authentication

Campaigns API uses unique API Keys for authentication to access campaign details and execute the checkout flow with your configured packages.

## Rate Limiting

Campaign APIs are rate-limited to maintain the stability for all users. We employ a number of methods to enforce rate limits including API Keys and IP Address.

| Identifier | Rate Limit Method | Limit |
| ---- | ---- | ---- |
| IP Address | Request-based | 4 requests/second |

### Sample

The following sample shows the API response for the status code 429.

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 1
```

### Why Rate Limits?

Rate limiting is required to prevent the network and application services from becoming overloaded.

Setting a rate limit helps to prevent API abuse and provide overall fairness of use across the platform.
"""


ADMIN_API_SPEC_SOURCE = "https://sandbox.29next.store/api/schema/admin/"

ADMIN_API_SPEC_ADDITIONS = {
    "servers": [
        {
            "url": "https://{store}.29next.store/api/admin/",
            "description": "",
            "variables": {
                "store": {
                    "default": "example",
                    "description": "Store unique subdomain used to identify the store.",
                }
            },
        }
    ],
    "security": [{"oauth2": []}],
}

ADMIN_API_DESCRIPTION = """
## Authentication
The Admin API uses Oauth 2 Bearer Access Tokens to manage access to your store's resources. Oauth Apps (and associated access tokens) can be tailored with object-level permission to ensure that each integrated service only has access to necessary objects.

Before using the Admin API, you'll need to create a store and create an OAuth App necessary for API access.

To create an OAuth App, navigate to **Settings > API Access** and create a new Oauth App with applicable [permission scopes](https://developers.29next.com/docs/api/admin/permissions/) to retrieve your Access Token.

It's recommended to create unique Oauth Apps per external system so that you can revoke as needed.

## Versioning

API versioning allows 29 Next to continuously evolve the platform while maintaining predictable behavior for existing APIs with a path for upgrades and deprecations.

To specify a version, pass the `X-29Next-Api-Version` header with your desired API version.

## Rate Limiting

Admin APIs are rate-limited to maintain the stability and equity of our platform for all users. We employ a number of methods to enforce rate limits including API Access Token and IP Address.

| Identifier | Rate Limit Method | Limit |
| ---- | ---- | ---- |
| Access Token | Request-based | 4 requests/second |

### Sample

The following sample shows the API response for the status code 429.

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 1
```

### Why Rate Limits?

Rate limiting is required to prevent the network and application services from becoming overloaded.

Setting a rate limit helps to prevent API abuse and provide overall fairness of use across the platform.
"""
