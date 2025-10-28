---
sidebar_label: Bancontact
sidebar_position: 5
tags:
 - Guide
---

# Bancontact Admin API Guide

**Bancontact** is a fully integrated payment method that is supported both in the storefront checkout, and via the Admin API. 


Bancontact transactions send the customer through a Bancontact redirect flow, with the resulting order information provided back to your application.  Below are the steps needed to get Bancontact set up and working on the Admin API.


### API Payment Redirect Flow

```mdx-code-block

import RedirectPaymentFlow from '@site/_snippets/_redirect-payment-flow.mdx';

<RedirectPaymentFlow />
```

### Create Order on Admin API

When creating a new order using Bancontact using the orders_create API method, you must specify the `payment_method=bancontact` as well as provide a `payment_return_url`. The `payment_return_url` is your endpoint that will receive a POST request containing the final order data.


```json title="Payment Details for Order with Bancontact"
{
    "payment_method": "bancontact",
    "payment_details": {
        "payment_return_url": "<external checkout url>",
        "payment_gateway": "<gateway id>", // optional
        "payment_gateway_group": "<gateway group id>" // optional
    }
}
```

:::tip
You can optionally provide a `payment_gateway` when creating the order to use a Bancontact account connected to a specific gateway. 

:::

### Redirect Customer to Bancontact
The response when creating the order will provide a `payment_complete_url`. Your application should redirect the customer to this URL for completing the payment on Bancontact.

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

Upsells are not supported with Bancontact payments.
