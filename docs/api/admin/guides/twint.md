---
sidebar_label: Twint
sidebar_position: 5
tags:
 - Guide
---

# Twint Admin API Guide

**Twint** is a fully integrated payment method via NEXT Payments supported both in the storefront checkout, and via the Admin API. 

Twint transactions send the customer through a Twint redirect flow, with the resulting order information provided back to your application.  Below are the steps needed to get Twint set up and working on the Admin API.


### API Payment Redirect Flow

```mdx-code-block

import RedirectPaymentFlow from '@site/_snippets/_redirect-payment-flow.mdx';

<RedirectPaymentFlow />
```

### Create Order on Admin API

When creating a new order using Twint using the orders_create API method, you must specify the `payment_method=twint` as well as provide a `payment_return_url`. The `payment_return_url` is your endpoint that will receive a POST request containing the final order data.


```json title="Payment Details for Order with Twint"
{
    "payment_method": "twint",
    "payment_details": {
        "payment_return_url": "<external checkout url>",
        "payment_gateway": "<gateway id>", // optional
        "payment_gateway_group": "<gateway group id>" // optional
    }
}
```

:::tip
You can optionally provide a `payment_gateway` when creating the order to use a Twint account connected to a specific gateway. 

:::

### Redirect Customer to Twint
The response when creating the order will provide a `payment_complete_url`. Your application should redirect the customer to this URL for completing the payment on Twint.

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

Twint supports one-click upsells through the [ordersAddLineItemsCreate](/docs/api/admin/reference/#/operations/ordersAddLineItemsCreate) API, enabling additional items to be added to the order with a payment transaction.


### Recurring

Twint via NEXT Payments supports recurring transactions and can be used as a payment method for an order with subscription items. 
