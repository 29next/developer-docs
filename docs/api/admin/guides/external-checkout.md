---
sidebar_label: External Checkout Flow
sidebar_position: 1
tags:
 - Guide
---
# External Checkout Flow
```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
In this guide we'll cover the best practices when building an external checkout flow using the 29 Next Admin API. Using the API gives you the most flexibility of data and functionality across the platform and external integrations.

``` mermaid
stateDiagram-v2
    direction LR
    cart: Create Cart
    order: Create Order
    upsell: Add Upsell
    cart --> order
    order --> upsell
    upsell --> Confirmation
```

### Create Cart

Carts are the starting point for all orders, carts are essentially draft orders waiting to be converted into orders. Creating the cart is a vital step in capturing leads and setting up abandoned cart flows.

```json title="Request"
// POST https://<store>.29next.store/api/admin/carts/
// -H "Authorization: Bearer <API ACCESS TOKEN>" -H "X-29Next-Api-Version: 2023-02-10"
{
    "lines": [
        {
            "product_id": 1,
            "currency": "USD",
            "quantity": 1,
            "price": 33.44 // optional
        }
    ],
    "user": {
        "email": "johndoe@gmail.com",
        "first_name": "John",
        "last_name": "Doe",
        "language": "en",
        "ip": "1.1.1.1",
        "accepts_marketing": true,
        "user_agent": "Mozilla/5.0..."
    },
    "attribution": {
        "funnel": "Funnel Offer V2",
        "metadata": {
            "custom_meta_field": "Custom meta data"
        }
    }
}
```
:::info Notes
- The carts create API accepts a user object that will `get or create` the user by their email address making it is safe to use for both new and existing users.
- Attribution added to a cart is carried over to the Orders and Subscriptions created on the users next order, you do not need to pass this data on the order request.
- If you need to capture an address with the cart, use the [usersAddressesCreate](/docs/api/admin/reference/#tag/customers/operation/usersAddressesCreate) endpoint which will create a default address for the user.
:::

### Create Order
Creating an order is the core resource in an external checkout flow, see the example below to familiarize yourself with the [ordersCreate](/docs/api/admin/reference/#tag/orders/operation/ordersCreate) API endpoint.

```json title="Request"
// POST https://<store>.29next.store/api/admin/orders/
// -H "Authorization: Bearer <API ACCESS TOKEN>" -H "X-29Next-Api-Version: 2023-02-10"
{
    "lines": [
        {
            "product_id": 1,
            "currency": "USD",
            "quantity": 1,
            "price": 33.44, // optional
            "subscription": {
                "interval": "month",
                "interval_count": 3
            }
        }
    ],
    "user":{
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
:::info Notes
- Complete User detail is not necessary if the user already exists, you can reference an existing user by `id` or by `email`.
- Attribution detail are not necessary if you have already added it to the users active cart.
- If you already created an address for the user, pass `use_default_shipping_address` and `use_default_billing_address` as true to use their default address for the order.
- For additional payment methods, see our guides on [Card Tokenization](/docs/api/admin/guides/iframe-payment-form.md), [3DS2](/docs/api/admin/guides/3ds2.md), [Apple Pay](/docs/api/admin/guides/apple-pay.md), [PayPal](/docs/api/admin/guides/paypal.md), and [Stripe APMs](/docs/api/admin/guides/stripe-apms.md).
:::

### Add Upsells

Add additional products (line items) to the original order through the [ordersAddLineItemsCreate](/docs/api/admin/reference/#tag/orders/operation/ordersAddLineItemsCreate) API. Adding items to the order will automatically re-use the order's initial payment method to collect payment for the additional products.

``` json title="Request"
// POST https://<store>.29next.store/api/admin/orders/<NUMBER>/add-line-items/
// -H "Authorization: Bearer <API ACCESS TOKEN>" -H "X-29Next-Api-Version: 2023-02-10"
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
The `ordersAddLineItemsCreate` API requires that the order initial **payment method** supports merchant initiated charges. Current supported payment methods are `bankcard` and `paypal` (with Reference Transactions enabled).
:::

### Cart / Order / Upsell lines Detail
Cart, Order, and Upsell line items represent the products the customer is purchasing. At the core, line items represent an order of a stock record, which are the physical (or virtual) items being purchased. Products can have multiple stock records (`Partner + SKU + Currency + Price`) and enables support for multi-currency pricing as well as the use of different regional fulfillment partners for the product.

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

:::caution Deprecation Notice
Using `stockrecord_id` is deprecated and will be removed in the future, use `product_id` and `currency` instead.
:::

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

Lines also accept an optional `subscription` object to specify a subscription that will be automatically created after the initial order is successfully created.

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

### Cart / Order User Detail

The `user` object on carts/orders represents the **customer** which includes their contact details.  Below are the recommended fields to pass for the user for ease of use and support of external integrations that may rely on the data, i.e. `user_agent`.

:::info
Users are first checked for an existing user by `email` before creating a new user. Successive `cartsCreate` and `ordersCreate` API requests with the same user details will reference the same user.
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
**It is not recommended to pass `phone_number` directly on the user when creating a cart or order, we recommend passing a local phone number in the `shipping_address` instead.** Address fields have country context, which allows local phone numbers to be passed and converted to [E.164 format](https://en.wikipedia.org/wiki/E.164) before being saved. A `phone_number` passed to the `user` object directly must be in E.164 format.
:::

### Cart / Order Attribution Detail
Cart and Order `attribution` object sets the [marketing attribution](https://docs.29next.com/features/marketing-attribution) on the order for tracking the source of orders and use in orders reporting. You can also pass in [metadata](https://docs.29next.com/start-here/technical-settings/metadata-fields) fields that are configured on the store to track custom attribution parameters and integrate external tracking platforms.

```json
"attribution": {
    "funnel": "Funnel Offer V2",
    "metadata": {
        "custom_meta_field": "Custom meta data"
    }
}
```

### Order Addresses Detail
The `shipping_address` object on the order represents the address where the order will be shipped, and similarly for the `billing_address`. The first `shipping_address` and `billing_address` created for a user is automatically set as their default shipping and billing address, [see API Reference](/docs/api/admin/reference/#tag/orders/operation/orders_create).

:::tip
Use `billing_same_as_shipping_address` to forego having to pass a full duplicate address for `billing_address`.
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
- User `phone_number` is automatically saved from the user's first address if they do not have an existing `phone_number`.
- In a "Two Step" flow where the customer address is collected before creating the order, create an address for the user and then pass the `use_default_shipping_address` and `use_default_billing_address` as true on the `orders_create` request.
:::



### Order Payment Detail

The order `payment_method` and `payment_details` objects work in tandem to specify the payment method for the order and provide any additional data that may be required per payment method. The example below uses a [Test Card](https://docs.29next.com/features/orders/test-orders) to create a **Test Order**. See our other guides on creating orders with [Card Tokens](/docs/api/admin/guides/iframe-payment-form.md) or payment methods that use a redirect flow: [PayPal](/docs/api/admin/guides/paypal.md), [Apple Pay](/docs/api/admin/guides/apple-pay.md), [Stripe APMs](/docs/api/admin/guides/stripe-apms.md), and [3DS2](/docs/api/admin/guides/3ds2.md).

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