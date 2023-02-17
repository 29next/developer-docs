---
sidebar_label: External Checkout Flow
sidebar_position: 1
---
# External Checkout Flow

In this guide, we'll cover the best practices when building an external checkout flow in the context of our Admin API to give your the most data and functionality within the platform and external integrations.


### Single Page Checkout + Upsell Flow

Most external checkouts can create a new order with a single API call to [orders_create](/docs/api/admin/reference/#tag/orders/operation/orders_create) that will create the customer and order within a single request. After the initial order is created, you can use the [order_add_line_items](/docs/api/admin/reference/#tag/orders/operation/orders_add_line_items) API to add additional line items (and charges) to the original order.

**Example Checkout Flow**

``` mermaid

flowchart LR
    Checkout --> |orders_create|Upsell
    Upsell --> |orders_add_line_items|Confirmation

```
```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

#### Creating the Order

Below is an example `orders_create` request to create an order on the Admin API that we'll use as the example to break down the details for each data point.

``` json title="Request"
POST https://<store>.29next.store/api/admin/orders/ -H "Authorization: Bearer <API ACCESS TOKEN>"
{
    "lines": [
        {
            "product_id": 1,
            "currency": "USD",
            "quantity": 1,
            "price": 33.44,
            "subscription": {
                "interval": "day",
                "interval_count": 30
            }
        },
        {
            "product_id": 2,
            "currency": "USD",
            "quantity": 1,
            "is_upsell": true
        }
    ],
    "user":{
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@gmail.com",
        "language": "en",
        "accepts_marketing": true,
        "ip": "123.123.123.123",
        "user_agent": "Mozilla/5.0..."

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
    },
    "attribution": {
        "funnel": "Funnel Offer V2",
        "metadata": {
            "custom_meta_field": "Custom meta data attached to order"
        }
    }
}
```

### Order lines
Order line items represent the products the customer is purchasing, at the core, order line items represent a stock record. Products have multiple stock records which are combination of `SKU + Currency + Price` to support multiple currency pricing and regional fulfillment partners.

**Acceptable Line Combinations for a Product**

<Tabs>
<TabItem value="parent" label="product_id + currency">

```json
"lines": [
    {
        "product_id": 1,
        "currency": "USD",
        "quantity": 1,
        "price": 33.44 // optional
    }
]
```
</TabItem>
<TabItem value="sku" label="sku + currency">

```json
"lines": [
    {
        "sku": "DEMO-SKU",
        "currency": "USD",
        "quantity": 1,
        "price": 33.44 // optional
    }
]
```
</TabItem>
<TabItem value="stockrecord_id" label="stockrecord_id">

```json
"lines": [
    {
        "stockrecord_id": 23,
        "quantity": 1,
        "price": 33.44 // optional
    }
]
```
</TabItem>
</Tabs>

Lines also accept an optional `subscription` object to specify the subscription that will be automatically created after the initial order is successfully created.

```json

"lines": [
    {
        "product_id": 1,
        "currency": "USD",
        "quantity": 1,
        "price": 33.44,
        "subscription": {
            "interval": "day", // day, month, year
            "interval_count": 30  // interval counter, ie 30 days
        }
    }
]
```

### Order user

The `user` object on the order represents the **customer** which includes their contact details.  Below are the recommended fields to pass for the user for ease of use and supporting external integrations that may rely on the data, ie `user_agent`.

:::info
Users are first checked for an existing user by `email` before creating a new user. Successive `order_create` calls with the same user details will reference the same user.
:::

```json
"user":{
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@gmail.com",
    "language": "en", // used for localized email notifications
    "accepts_marketing": true, // used by external integrations
    "ip": "123.123.123.123", // used by external integrations
    "user_agent": "Mozilla/5.0..." // used by external integrations
}
```
:::caution
**It is not recommended to pass `phone_number` directly to the user when creating an order, we recommend passing a local phone number in the `shipping_address` instead.** Address fields have country context which allows local phone numbers passed and converted to [E.164 format](https://en.wikipedia.org/wiki/E.164) before being saved. A `phone_number` passed to the `user` object directly must be in E.164 format.
:::



### Order shipping_address & billing_address
The `shipping_address` object on the order represents the address where the order will be shipped and similarly for the `billing_address`. The first `shipping_address` and `billing_address` create for a user is automatically set as their default shipping and billing address, [see API Reference](/docs/api/admin/reference/#tag/orders/operation/orders_create).

:::tip
You can use the `billing_same_as_shipping_address` to forgoe passing a full duplicate address for `billing_address`.
:::

```json
"shipping_address": {
    "first_name": "John",
    "last_name": "Doe",
    "line1": "9975 Berkshire Dr.",
    "line4": "Monsey", // city
    "postcode": "10952",
    "phone_number": "2025550140",
    "state": "NY",
    "country": "US"
},
"billing_same_as_shipping_address": true,
```
:::info
User phone_number is automatically saved from their first address if they do not have an existing `phone_number`.
:::


### Order payment_method & payment_details

The order `payment_method` and `payment_details` objects work in tandom to specify the payment method for the order and provide any additional info required per payment method. The example below uses a [Test Card](https://docs.29next.com/features/orders/test-orders) to create a **Test Order**. See our other guides on creating orders with [Card Tokens](/docs/api/admin/guides/iframe-payment-form.md) or payment methods that use a redirect flow: [PayPal](/docs/api/admin/guides/paypal.md), [Apple Pay](/docs/api/admin/guides/apple-pay.md), [Stripe APMs](/docs/api/admin/guides/stripe-apms.md), and [3DS2](/docs/api/admin/guides/3ds2.md).

```json
"payment_method": "bankcard",
"payment_details": {
    "card_name": "John Doe",
    "card_number": "6011111111111117",
    "card_cvv": 879,
    "card_expiry_month": 7,
    "card_expiry_year": 2029,
    "save_card": true
},
```

### Order attribution
The order `attribution` object sets the [marketing attribution](https://docs.29next.com/features/marketing-attribution) on the order for tracking the source of your orders and order reporting. You can also pass in [metadata](https://docs.29next.com/start-here/technical-settings/metadata-fields) fields that are configured on the store to track custom attribution parameters and integrate external tracking platforms.

```json
"attribution": {
    "funnel": "Funnel Offer V2",
    "metadata": {
        "custom_meta_field": "Custom meta data attached to order"
    }
}
```

### Adding Upsells

Additional products (line items) can be added to the original order through the [order_add_line_items](/docs/api/admin/reference/#tag/orders/operation/orders_add_line_items) API. Adding items to the order will automatically re-use the order's initial payment method to collect payment for the additional products.


``` json title="Request"
POST https://<store>.29next.store/api/admin/orders/<NUMBER>/add-line-items/ -H "Authorization: Bearer <API ACCESS TOKEN>"
{
  "lines": [
    {
            "product_id": 2,
            "currency": "USD",
            "quantity": 1,
            "price": 10.33
        }
  ]
}
```
:::caution
The `order_add_line_items` API requires the order initial **payment method** support merchant initiated charges. Current supported payment methods are `bankcard` and `paypal` (with Reference Transactions enabled).
:::
