---
sidebar_label: Google Pay
sidebar_position: 3
tags:
 - Guide
---
# Google Pay Admin API Guide

**Google Pay** is a fully integrated payment app, supported both in the storefront checkout, and via the Admin API. Google Pay transactions process the customer through the Google Pay payment flow, with the resulting order information provided back to your application. Below are the steps needed to get Google Pay set up and working on the Admin API.

For custom checkouts using the Admin API, there are two flows available -- the standard method where a user enters their shipping address, chooses products, and then checks out via Google Pay; and the "One-Click" method, where the user is not required to enter shipping information before being redirected to Google Pay checkout.

:::info
Your store must have a Google Pay setup and enabled with a gateway to use the Google Pay payment method and the user device must use Chrome browser or Android with Google Pay setup.
:::

### API Payment Redirect Flow

```mdx-code-block

import RedirectPaymentFlow from '@site/_snippets/_redirect-payment-flow.mdx';

<RedirectPaymentFlow />
```

### Create Order on Admin API

When creating a new order using Google Pay, you’ll need to specify the `payment_method=google_pay` as well as provide a `payment_return_url`. The `payment_return_url` is your endpoint that will receive a POST request containing the final order data.

```json title="Payment Details for Order with Google Pay"
{
    "payment_method": "google_pay",
    "payment_details": {
        "payment_return_url": "<external checkout url>",
        "payment_gateway": "<gateway id>", // optional
        "payment_gateway_group": "<gateway group id>" // optional
    }
}
```

:::tip
To test Google Pay as a payment method, you can use the `test` gateway with your real credit card in your Google Pay account, your card will not be charged.
:::

### Redirect Customer to Payment Complete URL
The response when creating the order will provide a payment_complete_url. Your application should redirect the customer to this URL for completing the payment on the store's Google Pay Checkout page.

```json title="Response with Payment Complete URL"
{
    "reference_transaction_id": null,
    "payment_complete_url": "https://<domain>/checkout/google-pay/<transaction token>/"
}
```

### Receiving Order Data

```mdx-code-block

import RedirectPaymentStep3 from '@site/_snippets/_redirect-payment-flows-step-3.mdx';

<RedirectPaymentStep3 />

```
