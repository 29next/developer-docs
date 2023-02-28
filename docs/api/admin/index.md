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

## Examples

### Create Customer

Create a new customer in your store.


```json title="Request"
// POST https://<store>.29next.store/api/admin/users/
// -H "Authorization: Bearer <API ACCESS TOKEN>" -H "X-29Next-Api-Version: 2023-02-10"
{
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@gmail.com",
    "ip": "1.1.1.1",
    "language": "en",
    "accepts_marketing": true
}
```

### Create Cart

Create a new customer with an open cart.

```json title="Request"
// POST https://<store>.29next.store/api/admin/carts/
// -H "Authorization: Bearer <API ACCESS TOKEN>" -H "X-29Next-Api-Version: 2023-02-10"
{
    "lines": [
        {
            "product_id": 1,
            "quantity": 1,
            "currency": "USD",
            "price": "36.88"
        }
    ],
    "send_welcome_email": true,
    "user":{
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@gmail.com",
        "ip": "1.1.1.1",
        "language": "en"
    },
    "attribution": {
        "utm_source": "example",
    }
}
```

### Create Test Order

Create a new test order.

**This example demonstrates the following concepts:**

 - Create a [Test Order](https://docs.29next.com/orders/test-orders) using our built in [Test Cards](https://docs.29next.com/orders/test-orders).
 - Referencing an existing `user` by their `email` because they already exist.
 - Line item including subscription parameters to create a subscription for a specific product.
 - Set `is_upsell` parameter on a line item to designate it was an upsell for reporting.
 - Set a custom shipping price to override the default shipping method price.
 - Set a local phone number in the shipping address that will be automatically converted to [E.164](https://en.wikipedia.org/wiki/E.164) format.
 - Use the `billing_same_as_shipping` attribute to automatically set Billing Address same as Shipping Address.


``` json title="Request"
// POST https://<store>.29next.store/api/admin/orders/
// -H "Authorization: Bearer <API ACCESS TOKEN>" -H "X-29Next-Api-Version: 2023-02-10"
{
    "lines": [
        {
            "sku": "lifted-1bottle",
            "currency": "USD",
            "quantity": 1,
            "subscription": {
                "interval": "month",
                "interval_count": 3
            }
        },
        {
            "sku": "nightcare",
            "currency": "USD",
            "quantity": 1,
            "is_upsell": true
        }
    ],
    "user":{
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@gmail.com"
    },
    "shipping_address": {
        "first_name": "John",
        "last_name": "Doe",
        "line1": "9975 Berkshire Dr.",
        "line4": "Monsey",
        "postcode": "10952",
        "phone_number": "2025550140",
        "state": "NY",
        "country": "US"
    },
    "billing_same_as_shipping_address": true,
    "payment_method": "bankcard",
    "payment_details": {
        "card_name": "John Doe",
        "card_number": "6011111111111117",
        "card_cvv": 879,
        "card_expiry_month": 7,
        "card_expiry_year": 2029,
        "save_card": true
    }
}
```


### Create PayPal Order

Create an order with PayPal One-click flow.

PayPal supports a "One-click" flow wherein all customer and and shipping information is collected in PayPal and therefore is not required when setting up the order.

```json title="Request"
// POST https://<store>.29next.store/api/admin/orders/
// -H "Authorization: Bearer <API ACCESS TOKEN>" -H "X-29Next-Api-Version: 2023-02-10"
{
    "lines": [
        {
            "stockrecord_id": 1,
            "quantity": 1,
        }
    ],
    "payment_method": "paypal",
    "payment_details": {
        "payment_return_url": "<YOUR PAYMENT RETURN URL>"
    }
}
```
