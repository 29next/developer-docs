---
sidebar_label: Klarna
sidebar_position: 3
---
# Klarna Admin API Guide

**Klarna Checkout** is a fully integrated payment app, supported both in the storefront checkout, and via the Admin API. Klarna transactions process the customer through the Klarna Checkout redirect flow, with the resulting order information provided back to your application. Below are the steps needed to get Klarna Checkout set up and working on the Admin API.

For custom Klarna checkouts, there are two checkout flows available -- the standard method where a user enters their shipping address, chooses products, and then checks out via Klarna; and the "One-Click" method, where the user is not required to enter shipping information before being redirected to Klarna checkout.

:::info
Your store must have a Klarna Payments enabled to use the Klarna payment method.
:::

### Step 1 - Create Order

When creating a new order using Klarna, you’ll need to specify the `payment_method=klarna` as well as provide a `payment_return_url`. The payment_return_url is your endpoint that will receive a POST request containing the final order data (in Step 3).

```json title="Payment Details for Order with Klarna"
{
    "payment_method": "klarna",
    "payment_details": {
        "payment_return_url": "<YOUR APPLICATION ENDPOINT>"
    }
}
```

### Step 2 - Redirect Customer to Payment Complete URL
The response from Step 1 will provide a payment_complete_url. Your application should redirect the customer to this URL for completing the payment on the store's Klarna Checkout page.

```json title="Response with Payment Complete URL"
{
    "reference_transaction_id": null,
    "payment_complete_url": "https://<domain>/klarna/checkout-order/?order_id=<transaction token>"
}
```

### Step 3 - Receive Order Data
```mdx-code-block

import RedirectPaymentStep3 from '@site/_snippets/_redirect-payment-flows-step-3.mdx';

<RedirectPaymentStep3 />

```
