---
title: Dispute Service Apps
sidebar_position: 1
tags:
 - Guide
---
```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Dispute service apps are integrations that manage the processing of payment disputes (alerts and chargebacks) on behalf of merchants seamlessly within the platform.

:::info
Dispute Service Apps are [Server to Server Apps](/docs/apps/guides/server-to-server-apps.md) that use the Oauth flow to obtain API Access and then use the [Admin APIs](/api/admin/index.md) and [Webhooks](/webhooks.md) to subscribe to store event activity.
:::

### Disputes

Disputes are complaints initiated by the customer against the merchant pertaining to their orders and are categorized into two broad groups by type, Alerts and Chargebacks, see below.

- **Alerts** - disputes that are not yet a chargeback, ie TC40, SAFE, and RDR alerts.
- **Chargeback** - disputes that are registered as a chargeback with the acquiring bank.

### Dispute Flow Overview

Below is a high-level overview of a typical flow for a dispute service app to handle transaction disputes.

``` mermaid
sequenceDiagram
  autonumber
  Customer->>Store: New Transaction Created
  Store->>Dispute Service: transaction.created webhook event
  Processor->>Dispute Service: Receives transaction dispute
  Dispute Service->>Store: Creates dispute (alert or chargeback) in store
  Dispute Service->>Store: Matches dispute to store transaction
  Store-->>Customer: Customer is added to block lists
  Dispute Service-->>Store: Create refund (optional)
  Dispute Service-->>Store: Cancel fulfillment (recommended)
  Dispute Service->>Store: Resolve dispute
```

### Dispute Flow Detail

#### Step 1 - New Transaction Created
There are several scenarios that create new payment transactions:
- Order created - nearly all new orders start with a new payment transaction.
- Upsell created - adding an upsell creates a new payment transaction.
- Refund created - refunding a order creates a refund transaction.

Orders typically have many associated transactions for the payments and refunds.

#### Step 2 - `transaction.created` webhook event
Dispute service apps should subscribe to the `transaction.created` webhook event to be notified of all payment transaction events on a store so that your app is aware of new payments, refunds, and can handle disputes properly.

:::info Use `parent_id` to associate related transactions
Transaction `parent_id` will show the related transaction in the following cases:
- `refund` transactions - the parent is the debit transaction.
- `capture` transactions - the parent is the authorization transaction.
- `void` transactions - the parent is the authorization transaction.
:::

Your app can also subscribe to `order.created` and `order.updated` events to receive more detailed order information such as items purchased, fulfillment tracking numbers, and items that have already been refunded.

Create your webhook after the app is installed using the [webhooksCreate](/docs/api/admin/reference/#/operations/webhooksCreate) Admin API and pass the `transaction.created, order.created, order.updated` to subscribe to these events.


#### Step 3 - Dispute service receives transaction dispute

At this stage, the dispute service is responsible for receiving disputes from their integration partners.

#### Step 4 - Dispute service creates dispute (alert or chargeback) in store

When disputes are identified as belonging to a store, the dispute service should create a new dispute using the [disputesCreate](/docs/api/admin/reference/#/operations/disputesCreate) Admin API.


#### Step 5 - Dispute service matches dispute to transaction

Disputes created in the store need to be matched to the transaction in the store to associate it with the order/customer. Disputes can be matched by passing the `transaction` parameter when creating or with update using the [disputesUpdate](/docs/api/admin/reference/#/operations/disputesUpdate) Admin API. See example below in [Match a Dispute](#matching-disputes).


#### Step 6 - Customer is added to block lists

Merchants can configure their store to automatically add customers to block lists when any of their transactions have been disputed to mitigate future risk from the customer and associated payment methods. See [Block Lists](https://docs.29next.com/features/payments/block-lists) guide in our user docs.


#### Step 7 - Dispute service creates refund

Depending on the type of dispute, the dispute service may need to create a refund using the [transactionsRefundCreate](/docs/api/admin/reference/#/operations/transactionsRefundCreate) Admin API to resolve the dispute. See [Create a Refund](#creating-disputes) detail below.


#### Step 8 - Cancel Order / Cancel Fulfillment 

If the order is not yet fulfilled, it may be ideal to cancel the order or cancel fulfillment to stop the order from being shipped to the customer. See [Canceling Fulfillment](#canceling-fulfillment) detail below.


#### Step 9 - Dispute service resolves dispute

Once the dispute is resolved, the dispute service should set the dispute resolution using the [disputesUpdate](/docs/api/admin/reference/#/operations/disputesUpdate) Admin API. See [Dispute Resolutions](#dispute-resolutions) and [Resolve a Dispute](#resolving-disputes) detail below.


### Creating Disputes

To create a dispute in the store using the [disputesCreate](/docs/api/admin/reference/#/operations/disputesCreate) Admin API, see example below:

```json title="Create dispute"
// POST https://{store}.29next.store/api/admin/disputes/
{
  "type": "alert", // dispute type
  "arn": "string", // optional
  "case_number": "string", // optional
  "happened_at": "2019-08-24T14:15:22Z", // date when dispute occurred
  "amount": "string", // dispute amount, sometimes doesnt match transaction amount
  "currency": "USD", // dispute currency
}
```

### Matching Disputes

To match a dispute to a transaction, pass the `transaction` id to the [disputesUpdate](/docs/api/admin/reference/#/operations/disputesUpdate) API. Matching the dispute to the transaction will match the associated order and customer.

```json title="Match dispute"
// PUT https://{store}.29next.store/api/admin/disputes/{id}/
{
  "transaction": 7388
}
```

### Creating Refunds

To create a refund for a transaction as part of the dispute resolution process, you can use the [transactionsRefundCreate](/docs/api/admin/reference/#/operations/transactionsRefundCreate) Admin API.

```json title="Create a Refund"
// POST https://{store}.29next.store/api/admin/transactions/{id}/refund/
{
    "amount": "XX.XX", // refund amount
}
```

### Canceling Fulfillment

It's desirable to cancel fulfillment for orders that have not shipped yet when they are disputed to prevent additional losses for the merchant.

:::info
To retrieve a list of all fulfillment orders and their status, use the [ordersFulfillmentOrdersRetrieve](/docs/api/admin/reference/?v=2024-04-01#/operations/ordersFulfillmentOrdersRetrieve) endpoint.
:::

<Tabs>
<TabItem value="fulfillment_status-unfulfilled" label="Fulfillment Status - Unfulfilled">

If order `fulfilmlent_status` is `unfulfilled`, your dispute service can stop fulfillment using the [fulfillmentOrdersHold](/docs/api/admin/reference/?v=2024-04-01#/operations/fulfillmentOrdersHold) endpoint.


```json title="Hold Fulfillment"
// POST https://{store}.29next.store/api/admin/fulfillment-orders/{id}/hold/

{
  "reason": "other",
  "reason_message": "Order disputed by customer." // Use a relevant other reason message
}
```

</TabItem>
<TabItem value="fulfillment_status-processing" label="Fulifllment Status - Processing">

If order `fulfilmlent_status` is `processing` your dispute service can request processing fulfillment orders be canceled with the fulfillment locations with the [cancellationRequestSend](/docs/api/admin/reference/#/operations/cancellationRequestSend?v=2024-04-01) endpoint.

```json title="Request Fulfillment Cancel"
// POST https://{store}.29next.store/api/admin/orders/{number}/cancel/
{
  "message": "Order disputed by customer" // Fulfillment cancel reason
}
```

:::caution
Fulfillment locations need to accept the cancelation request to confirm they were able to stop fulfillment on their end at. It is possible that the fulfillment order was already shipped and the fulfillment could not be stopped.
:::

</TabItem>
</Tabs>

### RDR Alerts

RDR Alerts are automatically refunded with the gateway, dispute services should log an external refund for the transaction using the [transactionsRefundCreate](/docs/api/admin/reference/#/operations/transactionsRefundCreate) Admin API.

Setting `is_external: true` on a refund will create the refund without attempting the refund with the gateway.

```json title="Create an External Refund"
// POST https://{store}.29next.store/api/admin/transactions/{id}/refund/
{
    "amount": "XX.XX", // refund amount
    "is_external": true // set for external refunds
}
```


### Dispute Resolutions

**Alert Resolutions**

- `could_not_find_order` - You could not match the alert to an order or transaction.
- `declined_or_canceled_nothing_to_do` - Customer had declined or canceled the order; no further action is necessary.
- `issued_full_refund` - Issued a full refund after the dispute was created.
- `issued_refund_for_remaining_amount` - Order was already partially refunded so you issued a refund for the remaining amount.
- `3ds_authorized_successfully` - Order was approved by 3D Secure so the customer's bank is responsible for the dispute.
- `previously_refunded_nothing_to_do` - Order was already refunded before the alert was issued; no further action is necessary.
- `unable_to_refund_merchant_account_closed` - You are unable to refund the order because your merchant account has been closed.
-  `other` - None of the available resolutions matched the outcome of this alert.


**Chargeback Resolutions**
- `won` - The chargeback representment process was successful and was resolved in favor of the merchant.
- `lost` - The chargeback representment process was unsuccessful.


### Resolving Disputes

To resolve a dispute, update the dispute with the appropriate [resolution](#dispute-resolutions) for the dispute type.

```json title="Resolve a dispute"
// POST https://{store}.29next.store/api/admin/disputes/{id}/
{
  "resolution": "issued_full_refund"
}
```



