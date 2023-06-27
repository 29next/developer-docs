# Campaigns API

Campaigns App opens up new possibilities for frontend developers to easily create complex external campaign flows using Javascript, **no backend server-side integration required**.

The Campaigns App provides an easy to use CORS enabled API that follows the best practices for integrating to our Admin API for an [External Checkout Flow](/docs/api/admin/guides/external-checkout.md).

### Campaigns App API
Campaigns App API is available through the **Campaigns App**. To enable, install the Campaigns App in your store from the Apps view.

```mdx-code-block

import Link from '@docusaurus/Link';

<Link
    className="button button--primary button--lg"
    to="https://campaigns.apps.29next.com/api/docs/">
    See Campaigns API Reference
</Link>

```

## Campaigns Overview

A "campaign" is a defined set of packages and payment rules as a backend for the HTML/JS webpages of a campaign (or funnel) frontend. You can easily setup multiple campaigns for different product offers, markets, and A/B testing.

### Packages
Each campaign can have multiple "Packages" configured to set quantity based pricing rules for your products. Typically this results in packages such as:
**Example Packages**
- Package 1 - 1x Widget at 10.00
- Package 2 - 3x Widget at 21.00
- Package 3 - 5x Widget at 30.00
- Package 4 - 1x Widget at 8.00 Recurring Every 30 Days

:::info
Package total price needs to be divisible to two digits by the quantity as the total price is sent on a per item level to the store Orders API.
:::


### Shipping Options
Campaigns can have custom shipping prices to optimize shipping fees and methods available on your campaign to override the default pricing configured globally in the store.

**Example Shipping Methods**
- Shipping Method 1 - Default shipping at 7.99
- Shipping Method 2 - Express shipping at 14.99


## Getting Started

To get started, create a new campaign with a package mapped to a product in your account. Use the examples below with your **Campaign API Key** to get started using the Campaigns API.

### Create Cart

```javascript title="Create a Cart"
var payload = {
  "user": {
    "email": "test@email.com",
    "first_name": "John",
    "last_name": "Doe"
  },
  "lines": [
    {
        "package_id": 1
    }
  ],
  "attribution": {
    "utm_source": "Example Campaign"
  }
}
const response = await fetch('https://campaigns.apps.29next.com/api/v1/carts/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": '<YOUR CAMPAIGN API KEY>' // Campaign API Key
    },
    body: JSON.stringify(payload),
});
const result = await response.json()
console.log(result); // Show result in console
```

### Create Order
Creating an order is the core method in an external checkout flow, see the example below to familiarize yourself with the payload data required.

:::info The `success_url` Explained
All orders require a `success_url` to handle payments requiring a redirect flow. The `success_url` should be the absolute URL of the "Next Page" in your campaign flow. In most cases, this should be your first upsell page, see more below in [Adding Upsells](#adding-upsells) on retrieving order details and handling payment methods that support upsells.
:::


```javascript title="Create an Order"
var payload = {
    "user": {
        "email": "test@email.com",
        "first_name": "John",
        "last_name": "Doe"
    },
    "lines": [
        {
            "package_id": 1
        },
        {
            "package_id": 2,
            "is_upsell": true
        }
    ],
    "shipping_address": {
        "first_name": "string",
        "last_name": "string",
        "line1": "string",
        "line4": "string",
        "state": "string",
        "postcode": "string",
        "phone_number": "string",
        "country": "string"
    },
    "billing_same_as_shipping_address": false,
    "payment_detail": {
        "payment_method": "card_token",
        "card_token": "<CARD TOKEN FROM IFRAME>" // See iFrame Payment Form Guide
    },
    "shipping_method": 1,
    "success_url": "https://your-campaign.com/next-page/" // Next Page in Flow
    "attribution": {
        "utm_source": "Example Campaign"
    }
}
const response = await fetch('https://campaigns.apps.29next.com/api/v1/orders/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": '<YOUR CAMPAIGN API KEY>' // Campaign API Key
    },
    body: JSON.stringify(payload),
});
const result = await response.json();
console.log(result); // Show result in console
```
:::info iFrame Payment Form
Bankcard payments require using the [iFrame Payment Form](/docs/api/admin/guides/iframe-payment-form.md) and passing the generated `card_token` for secure transfer of the payment method details. View a fully functional [Demo](https://29next.github.io/demo-iframe-payment-form/).
:::

:::caution You Must Handle the Order Create Response
- If response data has a `number`, order was successfully created, you can redirect to the next page.
- If response data has a `payment_complete_url`, redirect the user to this page. After payment, user will come back to your `success_url`.
:::


### Adding Upsells
To add an upsell to an existing order, first you should check to see if the order payment method `supports_post_purchase_upsells` is `True` in the `orderRetrieve` response.

```javascript title="Retrieve Order Details"
const refId = '<YOUR ORDER REF ID>'
const response = await fetch('https://campaigns.apps-staging.29next.com/api/v1/orders/' + refId + '/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": '<YOUR CAMPAIGN API KEY>' // Campaign API Key
    }
});
const result = await response.json();
console.log(result); // Show result in console
```
If the order `supports_post_purchase_upsells`, you can add an upsell to an order can be done using the `orderUpsellCreate` API endpoint.

```javascript title="Add Upsell to Order"
const refId = '<YOUR ORDER REF ID>'
var payload = {
    "lines": [
        {
            "package_id": 1
        }
    ]
}
const response = await fetch('https://campaigns.apps.29next.com/api/v1/orders/' + refId + '/upsells/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": '<YOUR CAMPAIGN API KEY>' // Campaign API Key
    },
    body: JSON.stringify(payload),
});
const result = await response.json();
console.log(result);

```

### Order Confirmation

On the order confirmation page, you can retrieve the order details and map the values to your template to show an order summary to the customer.

```javascript title="Retrieve Order Details"
const refId = '<YOUR ORDER REF ID>'
const response = await fetch('https://campaigns.apps-staging.29next.com/api/v1/orders/' + refId + '/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": '<YOUR CAMPAIGN API KEY>' // Campaign API Key
    }
});
const result = await response.json();
console.log(result); // Show result in console
```
