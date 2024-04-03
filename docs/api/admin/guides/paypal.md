---
sidebar_label: PayPal
sidebar_position: 3
tags:
 - Guide
---

# PayPal Admin API Guide

**PayPal** is a fully integrated payment app that is supported both in the storefront checkout, and via the Admin API.  PayPal transactions send the customer through a PayPal redirect flow, with the resulting order information provided back to your application.  Below are the steps needed to get PayPal set up and working on the Admin API.

:::caution
PayPal custom checkouts require the use of the PayPal NVP/SOAP (Legacy) APIs.  Please ensure that your valid NVP/SOAP credentials are configured in the [Paypal Extension](https://docs.29next.com/payments#paypal) prior to attempting custom checkouts with PayPal over the Admin API.
:::

For custom PayPal checkouts, there are two checkout flows available -- the standard method where a user enters their shipping address, chooses products, and then checks out via PayPal; and the "One-Click" method, where the user is not required to enter shipping information before being redirected to PayPal checkout.


### API Payment Redirect Flow

```mdx-code-block

import RedirectPaymentFlow from '@site/_snippets/_redirect-payment-flow.mdx';

<RedirectPaymentFlow />
```

### Create Order on Admin API

When creating a new order using PayPal using the orders_create API method, you must specify the `payment_method=paypal` as well as provide a `payment_return_url`. The `payment_return_url` is your endpoint that will receive a POST request containing the final order data.


```json title="Payment Details for Order with PayPal"
{
    "payment_method": "paypal",
    "payment_details": {
        "payment_return_url": "<external checkout url>",
        "paypal_account": "<paypal account id>" // optional
    }
}
```

:::tip
You can optionally provide a `paypal_account` when creating the order to use a PayPal account other than the store default PayPal account.
:::


### Redirect Customer to Paypal
The response when creating the order will provide a `payment_complete_url`. Your application should redirect the customer to this URL for completing the payment on PayPal.

```json title="Response with Payment Complete URL"
{
    "reference_transaction_id": null,
    "payment_complete_url": "https://www.paypal.com/checkoutnow?token=<paypal token>"
}
```

### Receiving Order Data
```mdx-code-block

import RedirectPaymentStep3 from '@site/_snippets/_redirect-payment-flows-step-3.mdx';

<RedirectPaymentStep3 />

```

### Upsells

Paypal supports one-click upsells through the [ordersAddLineItemsCreate](/docs/api/admin/reference/#/operations/ordersAddLineItemsCreate) API, enabling additional items to be added to the order with a payment transaction.

:::info
To process upsells, the Paypal account must have [Reference Transactions](https://developer.paypal.com/api/nvp-soap/do-reference-transaction-soap/) enabled and configured on the store.
:::

If the store Paypal account has reference transactions enabled, the [ordersCreate](/docs/api/admin/reference/#/operations/ordersCreate) API response will include `supports_post_purchase_upsells: true`, signaling you can process one-click upsell transactions.
