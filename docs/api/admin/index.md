---
sidebar_label: Admin API
sidebar_position: 1
---
# Admin API

### Getting Started

At the core of 29 Next is the Admin API.

```mdx-code-block

import Link from '@docusaurus/Link';

<Link
    className="button button--primary button--lg"
    to="/docs/api/admin/reference/">
    See Admin API Reference
</Link>

```

### Authentication


The Admin API uses Oauth 2 authorization protocol to manage access to your store's resources. Oauth Apps (and associated access tokens) can be tailored with object-level permission to ensure that each integrated service only has access to necessary objects.

Before using the Admin API, you'll need to create a store and create an OAuth App necessary for API access. To create an OAuth App, navigate to **Settings > API Access** and create a new Oauth App with applicable [permissions](permissions.md) to retrieve your **Access Token**.  It is recommended to create unique Oauth Apps per external system so that you can revoke as needed.

```curl title="Admin API Path"
https://<store>.29next.store/api/admin/
```


**Use your Oauth App Access Token in the request headers to access the API.**

```curl title="Example Request"
curl -X GET "https://<store>.29next.store/api/admin/" \
-H "Authorization: Bearer <api access token>" \
-H "X-29Next-Api-Version: 2023-02-10"
```

:::caution
Legacy API Tokens are now deprecated in favor of Oauth App Tokens. If you are currently using Legacy API Tokens, it's recommended to update your integration as they will be removed at a future date.
:::

:::info
Access the API explorer on your store at `https://<store>.29next.store/api/docs/admin/` to explore the API interactively with Swagger.
:::

### Versioning

API versioning allows 29 Next to continuously evolve the platform while maintaining predictable behavior for existing APIs with a path for upgrades and deprecations.

**Admin API Versions**

| Version | Status |
| ---- | ---- |
| `2023-02-10` | Stable for production use. |
| `unstable` | Unstable and for testing only. |


**Specify an API Version**

To specify a version, pass the `X-29Next-Api-Version` header with your desired API version.

:::warning
It is **highly recommended** to specify your version on your API requests to ensure consistency for your integration.
:::


### Rate Limits

Admin APIs are rate-limited to maintain the stability and equity of our platform for all users. We employ a number of methods to enforce rate limits.

| API | Rate Limit Method | Limit |
| ---- | ---- | ---- |
| Admin API | Request-based | 4 requests/second |

:::info
Once you reach API rate limits you'll then receive a 429 Too Many Requests response, and a message that a throttle has been applied.
:::


We recommend API users to appropriately limit calls, cache results, and retry requests using strategies that are considered industry best practices,to avoid hitting getting rate limit errors

