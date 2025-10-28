---
sidebar_label: iDEAL
sidebar_position: 5
tags:
 - Guide
---

# iDEAL Admin API Guide

**iDEAL** is a fully integrated payment method that is supported both in the storefront checkout, and via the Admin API.

iDEAL transactions send the customer through a iDEAL redirect flow, with the resulting order information provided back to your application.  Below are the steps needed to get iDEAL set up and working on the Admin API.


### API Payment Redirect Flow

```mdx-code-block

import RedirectPaymentFlow from '@site/_snippets/_redirect-payment-flow.mdx';

<RedirectPaymentFlow />
```

### Create Order on Admin API

When creating a new order using iDEAL using the orders_create API method, you must specify the `payment_method=ideal` as well as provide a `payment_return_url`. The `payment_return_url` is your endpoint that will receive a POST request containing the final order data.


```json title="Payment Details for Order with iDEAL"
{
    "payment_method": "ideal",
    "payment_details": {
        "payment_return_url": "<external checkout url>",
        "payment_gateway": "<gateway ID with iDEAL account>" // optional
    }
}
```

:::tip
You can optionally provide a `payment_gateway` when creating the order to use a iDEAL account connected to a specific gateway. 

:::

### Redirect Customer to iDEAL
The response when creating the order will provide a `payment_complete_url`. Your application should redirect the customer to this URL for completing the payment on iDEAL.

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

Upsells are not supported with iDEAL payments.
