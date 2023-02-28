---
sidebar_label: Apple Pay
sidebar_position: 3
tags:
 - Guide
---
# Apple Pay Admin API Guide

**Apple Pay** is a fully integrated payment app, supported both in the storefront checkout, and via the Admin API. Apple Pay transactions process the customer through the Apple Pay payment flow, with the resulting order information provided back to your application. Below are the steps needed to get Apple Pay set up and working on the Admin API.

For custom checkouts using the Admin API, there are two flows available -- the standard method where a user enters their shipping address, chooses products, and then checks out via Apple Pay; and the "One-Click" method, where the user is not required to enter shipping information before being redirected to Apple Pay checkout.

:::info
Your store must have a Apple Pay setup and enabled with a gateway to use the Apple Pay payment method. The user device must also be an Apple Device with Touch ID enabled. See more on [displaying Apple Pay buttons](https://developer.apple.com/documentation/apple_pay_on_the_web/displaying_apple_pay_buttons_using_css) or the [Apple Pay Demo](https://applepaydemo.apple.com/).
:::

### API Payment Redirect Flow

```mdx-code-block

import RedirectPaymentFlow from '@site/_snippets/_redirect-payment-flow.mdx';

<RedirectPaymentFlow />
```

### Create Order on Admin API

When creating a new order using Apple Pay, you’ll need to specify the `payment_method=apple_pay` as well as provide a `payment_return_url`. The `payment_return_url` is your endpoint that will receive a POST request containing the final order data.

```json title="Payment Details for Order with Apple Pay"
{
    "payment_method": "apple_pay",
    "payment_details": {
        "payment_return_url": "<external checkout url>",
        "payment_gateway": "<gateway id>", // optional
        "payment_gateway_group": "<gateway group id>" // optional
    }
}
```

### Redirect Customer to Payment Complete URL
The response when creating the order will provide a payment_complete_url. Your application should redirect the customer to this URL for completing the payment on the store's Apple Pay Checkout page.

```json title="Response with Payment Complete URL"
{
    "reference_transaction_id": null,
    "payment_complete_url": "https://<domain>/checkout/apple-pay/<transaction token>/"
}
```

### Receiving Order Data

```mdx-code-block

import RedirectPaymentStep3 from '@site/_snippets/_redirect-payment-flows-step-3.mdx';

<RedirectPaymentStep3 />

```
