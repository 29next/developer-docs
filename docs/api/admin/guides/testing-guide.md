---
sidebar_label: Testing Guide
sidebar_position: 1
tags:
 - Guide
---

# Test Order Flows

Testing your integration is a critical step when developing on the Next Commerce platform. There are two distinct paths to creating Test Orders, Transactions, and Subscriptions through the Admin API or storefront checkout flow.

:::info Card Tokenization
Cards must be tokenized before submitting on the Admin API, see [iframe card tokenization](/docs/api/admin/guides/iframe-payment-form.md) guide.
:::

### Test Cards

Test cards can be used on live stores and live integrations to create **Test Orders** with the exception they do not touch the gateway and have no attached transactions.

| Test Card Number | Expiration | CVV | Use Case |
| ---- | ---- | ---- | ---- |
| 6011111111111117 | Any Future Date | Any | Test payment success flow without transaction. |
| 6011000990139424 | Any Future Date | Any |Test 3DS payment flow without transaction.  |

:::tip
Test cards can be used to test your live integration flows without changing any store payment settings. **Test cards are generally safe to use to test your flows.**
:::

### Test Card Tokens

Test card tokens can be used on the API directly without needing to tokenize the card before submitting the create order request.

| Test Card Number | Use Case |
| ---- | ---- |
| `test_card` | Test payment success flow without transaction. |
| `test_3ds_card` | Test 3DS payment flow without transaction. |

:::tip
Use the test card tokens before you've integrated the [iFrame Card Tokenization](/docs/api/admin/guides/iframe-payment-form.md) to validate your API requests.
:::

### Test Gateway

The Test Gateway behaves exactly as a regular gateway, when orders are created using the `test` gateway, they also have associated Test transactions.

| Test Card Number | Expiration | CVV | Use Case |
| ---- | ---- | ---- | ---- |
| 4111111111111111 | Any Future Date | Any | Test standard payment flow with successful transaction. |
| 5555555555554444 | Any Future Date | Any | Test 3DS payment flow with successful transaction. |
| 4012888888881881 | Any Future Date | Any | Test standard payment declined flow with failed transaction.  |

#### Setup Test Gateway

To setup the test gateway, go to **Settings > Payments > Add Gateway** to add the Test Gateway to your store. Next, add the Test Gateway to your default gateway group or use the gateway ID directly through the Admin API.

:::caution
The `test` gateway path requires setting up the gateway and can negatively impact your store's live order flows. **Use with caution if your store has live traffic.**
:::

### Test Subscriptions

Subscriptions can be created with both the [Test Gateway](#test-gateway) and [Test Cards](#test-cards), however there are some small behavior differences at this time.

| Test Card Number| Expiration | CVV | Use Case |
| ---- | ---- | ---- | ---- |
| 4111111111111111 | Any Future Date | Any | Test subscription can create renewal orders. |
| 6011111111111117 | Any Future Date | Any | Test subscription **cannot** create renewal orders. |
