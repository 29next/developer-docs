---
title: Fulfillment Service Apps
sidebar_position: 1
tags:
 - Guide
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Fulfillment service apps are integrations that manage the fulfillment of physical products for merchants by enabling transparent communication between fulfillment providers and merchants using the 29 Next dashboard.

### Fulfillment Flow Overview

Below is a high level overview of the fulfillment flow for Fulfillment Service Apps to accept and process their assigned fulfillment orders.

``` mermaid
sequenceDiagram
  autonumber
  Customer->>Store: Creates an Order
  Store->>Fulfillment Service App: Creates a Fulfillment Request
  Fulfillment Service App->>Store: Retrieves Assigned Fulfillment Orders
  Fulfillment Service App->>Store: Accepts Fulfillment Request
  Fulfillment Service App->>Carrier: Processes Fulfillment Order with Carrier
  Fulfillment Service App->>Store: Creates a Fulfillment
  Carrier->>Customer: Carrier Delivers Ordered Products to Customer
```

#### Fulfillment Flow Detail

#### Step 1 - Customer's initiate the process by creating an order

All orders start when the customer initiating the new order either on the checkout flow, Admin API, or a recurring Subscription. Orders contain multiple **Fulfillment Orders** with the products allocated across the Fulfillment Locations that have the products in stock. A single order often contains multiple fulfillment orders, it's important to keep this in mind for your integration.

#### Step 2 - Store creates a fulfillment request

After a delay period (usually several hours), the store will send a fulfillment request to the [Fulfillment Location](#fulfillment-locations) assigned to the order. Fulfillment Requests can be initiated by dashboard users, background automated processes, or via the Admin API. See [Fulfillment Locations](#fulfillment-locations).

#### Step 3 - Fulfillment Service retrieves their assigned fulfillment order requests

In response to receiving a fulfillment request, the fulfillment service needs to retrieve all of their assigned fulfillment orders from the [Assigned Fulfillment Orders](/docs/api/admin/reference/#tag/fulfillment/operation/assignedFulfillmentOrdersList) API endpoint. See [Assigned Fulfillment Orders](#assigned-fulfillment-orders).

#### Step 4 - Fulfillment Service accepts fulfillment order requests

For each assigned fulfillment order request in Step 3, the fulfillment service needs to `Accept` or `Reject` the assignment to notify the store the order is expected to be fulfilled or not. See [Accepting Fulfillment Requests](#accepting-fulfillment-requests).

#### Step 5 - Fulfillment Service processes the fulfillment with a carrier

Accepted fulfillment orders are processed by the fulfillment service location to prepare shipment to the customer.

#### Step 6 - Fulfillment Service creates a fulfillment

Once an order has been fulfilled, the fulfillment service creates a fulfillment to upload with shipment carrier tracking information and notify the customer their order has shipped. See [Creating Fulfillments](#creating-fulfillments).

#### Step 7 - Customer receives products ordered via the carrier
The carrier is responsible for delivering the products to the customer in this stage.


### Fulfillment Locations

Fulfillment Services need to create `Locations` which represent their warehouses where physical products are stored and fulfilled from. Product `stockrecords` must be associated with a location for fulfillment.

When new orders are created, the fulfillment orders are assigned to the locations that are expected to have the product `sku` in stock. The Location Address is also used for Tax calculation. See the [Locations Create](/docs/api/admin/reference/#tag/fulfillment/operation/locationsCreate) endpoint to create a location.

#### Location Callback
The location `callback` is a URL the store will send `Fulfillment Requests` webhooks to notify them of a new fulfillment assigned.

Fulfillment assignment request types are:

- `fulfillment_requested` - when a new fulfillment order has been requested to be fulfilled.
- `cancellation_requested`- when an already processing fulfillment order has been requested to cancel fulfillment.

<Tabs>
<TabItem value="fulfillment_requested" label="Fulfillment Request">

```json  title="Example Fulfillment Request Payload"
{
  "type": "fulfillment_requested"
}
```
</TabItem>
<TabItem value="cancellation_requested" label="Cancellation Request">

```json  title="Example Cancellation Request Payload"
{
  "type": "cancellation_requested"
}
```

</TabItem>

</Tabs>

:::tip
The webhook request has a `X-29Next-Store` header that indicates which store the request is from if you have a global callback url.
:::


### Assigned Fulfillment Orders
The [Assigned Fulfillment Orders](/docs/api/admin/reference/#tag/fulfillment/operation/assignedFulfillmentOrdersList) will return a list of all fulfillment orders assigned to your locations. Your app is recommended to call this API in response to receiving a notification to the location callback, and you may also want to poll this endpoint occasionally (ie once per hour) to ensure you've actioned everything requested.

:::info
Use the appropriate `assignment_status` parameter to filter  the fulfillment orders to those that require action.
:::

<Tabs>
<TabItem value="fulfillment_requested" label="Fulfillment Requests">

Retrieve all pending Fulfillment Requests

```json
GET https://{store}.29next.store/api/admin/assigned-fulfillment-orders/?assignment_status=fulfillment_requested
```
</TabItem>
<TabItem value="cancellation_requested" label="Cancellation Requests">

Retrieve all pending Cancellation Requests

```json
GET https://{store}.29next.store/api/admin/assigned-fulfillment-orders/?assignment_status=cancellation_requested
```

</TabItem>

</Tabs>

:::tip
Requests to the location callback indicate the request `type` that should be passed to the [Assigned Fulfillment Orders](/docs/api/admin/reference/#tag/fulfillment/operation/assignedFulfillmentOrdersList) API as the `assignment_status` querystring value to filter fulfillment orders to those for the flow.

For example, to see new fulfillment requests pending acceptance, pass `assignment_status=fulfillment_requested` to the Assigned Fulfillment Orders API, `fulfillment_requested` was passed as `type` to the callback.
:::

### Accepting Fulfillment Requests

To `Accept` a Fulfillment Request assignment, send a POST request to the [Fulfillment Request Accept](/docs/api/admin/reference/#tag/fulfillment/operation/fulfillmentRequestAccept) Endpoint. The Fulfillment Order will show as **Accepted** in the dashboard and the Order will transition fulfillment_status to processing.

```json title="Example Fulfillment Accept Request"
POST https://{store}.29next.store/api/admin/fulfillment-orders/{id}/fulfillment-request/accept/
```

### Rejecting Fulfillment Requests

Your fulfillment service can `Reject` fulfillment order assignments which will prompt the merchant to take action in their store to amend the order. For address corrections, the Fulfillment Service should verify the order shipping address before accepting and once corrected the merchant can send a new fulfillment request with the updated address. See possible rejection reasons on in the [Fulfillment Request Reject API docs](/docs/api/admin/reference/#tag/fulfillment/operation/fulfillmentRequestReject).

```json title="Example Fulfillment Rejection Payload"
POST https://{store}.29next.store/api/admin/fulfillment-orders/{id}/fulfillment-request/reject/

{
    "rejected_reason": "incorrect_address",
    "message": "Your Message"
}
```



### Creating Fulfillments

Once you have tracking information for your the outgoing shipment to the customer, create a Fulfillment for the fulfillment order on the [Fulfillments Create](/docs/api/admin/reference/#tag/fulfillment/operation/fulfillmentsCreate) API.


```json title="Fulfillment Create Payload"
POST https://{store}.29next.store/api/admin/fulfillment-orders/{id}/fulfillments/
{
  "notify": true, // send the customer an order shipped notification email
  "tracking_info": [
    {
      "tracking_code": "EXAMPLECODE",
      "carrier": "dhl_ecommerce"
    }
  ]
}
```
