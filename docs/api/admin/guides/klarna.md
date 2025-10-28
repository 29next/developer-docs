---
sidebar_label: Klarna
sidebar_position: 4
tags:
 - Guide
---

# Klarna Admin API Guide

**Klarna** is a fully integrated payment method via NEXT Payments and Stripe, supported both in the storefront checkout and via the Admin API.

Klarna transactions send the customer through a Klarna redirect flow, with the resulting order information provided back to your application.  Below are the steps needed to get Klarna set up and working on the Admin API.

### API Payment Redirect Flow

```mdx-code-block

import RedirectPaymentFlow from '@site/_snippets/_redirect-payment-flow.mdx';

<RedirectPaymentFlow />
```

### Create Order on Admin API

When creating a new order using Klarna using the orders_create API method, you must specify the `payment_method=klarna` as well as provide a `payment_return_url`. The `payment_return_url` is your endpoint that will receive a POST request containing the final order data.


```json title="Payment Details for Order with Klarna"
{
    "payment_method": "klarna",
    "payment_details": {
        "payment_return_url": "<external checkout url>",
        "payment_gateway": "<gateway id>", // optional
        "payment_gateway_group": "<gateway group id>" // optional
    }
}
```

:::tip
You can optionally provide a `payment_gateway` when creating the order to use a Klarna account connected to a specific gateway. 

:::

### Redirect Customer to Klarna
The response when creating the order will provide a `payment_complete_url`. Your application should redirect the customer to this URL for completing the payment on Klarna.

```json title="Response with Payment Complete URL"
{
    "reference_transaction_id": null,
    "payment_complete_url": "<unique checkout url>"
}
```

### Receiving Order Data
```mdx-code-block

import RedirectPaymentStep3 from '@site/_snippets/_redirect-payment-flows-step-3.mdx';

<RedirectPaymentStep3 />

```

### Upsells

Klarna supports one-click upsells through the [ordersAddLineItemsCreate](/docs/api/admin/reference/#/operations/ordersAddLineItemsCreate) API, enabling additional items to be added to the order with a payment transaction.

### Recurring

Klarna via NEXT Payments supports recurring transactions and can be used as a payment method for an order with subscription items. 