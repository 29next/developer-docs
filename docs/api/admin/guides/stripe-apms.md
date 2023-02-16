---
sidebar_label: Stripe APMs
sidebar_position: 2
---
# Stripe APMs Admin API Guide

**Stripe Alternative Methods (APMs)** are a fully integrated payment methods supported both in the storefront checkout and the Admin API. Stripe APM transactions process the customer through a redirect flow with the resulting order information provided back to your application.


:::info
Your store must have a Stripe Gateway enabled with the appropriate Stripe APM to be able to use on the Admin API.
:::

:::tip
Stripe APMs redirect flow follows the same principles as [Apple Pay](/api/admin/guides/apple-pay.md), [3DS2](/api/admin/guides/3ds2.md) and [PayPal](/api/admin/guides/paypal.md), implementing payment redirect flow is recommended to easily cover many payment methods.
:::

### Supported Stripe Alternative Payment Methods

| Payment Method | Payment Method Code | Stripe Docs |
| ---- | ---- | ---- |
| Klarna Payments | `klarna` | [Stripe Docs](https://stripe.com/docs/payments/klarna) |
| iDEAL | `ideal` | [Stripe Docs](https://stripe.com/docs/payments/ideal) |
| Bancontact | `bancontact` | [Stripe Docs](https://stripe.com/docs/payments/bancontact) |


### API Payment Redirect Flow

```mdx-code-block

import RedirectPaymentFlow from '@site/_snippets/_redirect-payment-flow.mdx';

<RedirectPaymentFlow />

```


### Create Order on Admin API

When creating a new order using a Stripe APM, you’ll need to specify the `payment_method=<payment method code>` as well as provide a `payment_return_url`. The `payment_return_url` is your endpoint that will receive a POST request containing the final order data.

```json title="Payment Details for Order with Stripe APMs"
{
    "payment_method": "<payment method code>",
    "payment_details": {
        "payment_return_url": "<external checkout url>",
        "payment_gateway": "<gateway id>", // optional
        "payment_gateway_group": "<gateway group id>" // optional

    }
}
```
:::tip
You can optionally provide a `payment_gateway` or `payment_gateway_group` when creating the order to use a specific Stripe Gateway configured in the store.
:::

### Redirect Customer to Payment Complete URL
The response when creating the order will provide a `payment_complete_url`. Your application should redirect the customer to this URL for completing the payment on the store's Stripe APM checkout flow.

```json title="Response with Payment Complete URL"
{
    "reference_transaction_id": null,
    "payment_complete_url": "https://<domain>/stripe/checkout/<unique payment id>/"
}
```

### Receiving Order Data
```mdx-code-block

import RedirectPaymentStep3 from '@site/_snippets/_redirect-payment-flows-step-3.mdx';

<RedirectPaymentStep3 />

```
