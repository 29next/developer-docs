# Webhooks

Use webhooks to be notified about events that happen in your store.

Stores can send webhooks that notify your application anytime an event happens. This is especially useful for building custom reporting solutions that need to receive data on order or customer activity.

### Why Webhooks

Webhooks are an efficient way to sync data from from a store in near real-time so that your app is up to date with the latest data in the store and are much more efficient than traditional polling. See example below for subscribing to `order.created` events.

``` mermaid
sequenceDiagram
  autonumber
  App->>Store: Subscribes to order.created event
  Customer->>Store: New order created
  Store->>App: Sends order.created event payload
```

### Use Cases

Common use cases include but not limited to:

- Integrating with external marketing platforms
- Collecting data for external reporting applications
- Integrating with external fulfillment services
- Integrating with dispute management services


### Setting Up Webhooks

You can register new Webhooks through **Settings > Webhooks** or on the Admin API to send event data to your application endpoint. For each webhook, you can subscribe to All Events or select specific events to send to your endpoint. See a list of all events and example event data below.

:::caution
Webhook target endpoints must accept JSON data and respond with a 200 response code. If we do not receive a 200 response, we will retry up to 10 times over a several day period on an exponential back off schedule. Failing webhooks will trigger email notifications to all store admins and will be eventually deactivated.
:::

### Webhook Events

| Event                     | Description                          |
| -----------               | ------------------------------------ |
| `app.uninstalled`         | Triggers when an app is uninstalled. *Only available for apps.*|
| `cart.abandoned`          | Triggers when a cart is marked as abandoned. |
| `customer.created`        | Triggers when a new customer is created. |
| `customer.updated`        | Triggers when an existing customer is updated. |
| `dispute.created`         | Triggers when a new dispute is created. |
| `dispute.updated`         | Triggers when a dispute is updated. |
| `order.created`           | Triggers when an order is created. |
| `order.updated`           | Triggers when an existing order is updated. |
| `product.created`         | Triggers when a product is created. |
| `product.updated`         | Triggers when an existing product is updated. |
| `transaction.created`     | Triggers when a payment transaction is created. |
| `subscription.created`    | Triggers when a new subscription is created. |
| `subscription.updated`    | Triggers when an existing subscription is updated. |
| `ticket.created`          | Triggers a new support ticket is created. |
| `ticket.updated`          | Triggers when an existing support ticket is updated. |

### Webhook Data Structure

Webhook data structure follows our Admin API data structures (serializers) making them predictable. As a general rule of thumb, data available in a webhook payload data is the same as retrieving the specific data. You can setup test webhooks and view the webhook logs in the dashboard to assist in building your webhook receiver.

```json title="Webhook Event Payload Structure"
{
    "object": "<object>",
    "data": "<object data>",
    "event_id": "<unique event id>",
    "event_type": "<event type>",
    "webhook": "<webhook info>",
    "api_version": "<webhook api version"
}

```

Below is a full example of a webhook payload for a `customer.created` event to demonstrate

```json title="Example Webhook Event Data"
{
    "api_version": "2023-02-10",
    "data": {
        "accepts_marketing": true,
        "addresses": [],
        "date_joined": "2021-12-17T14:52:53.715787+07:00",
        "email": "testing@testing.com",
        "first_name": "Tester",
        "id": 32234664,
        "ip": null,
        "is_blocked": false,
        "language": "en",
        "last_name": "Test",
        "orders_count": 0,
        "phone_number": null,
        "subscriptions_count": 0,
        "tags": [],
        "total_spent": null,
        "user_type": "lead"
    },
    "event_id": "f7eb1338-0934-4cda-8128-d6a77761a368",
    "event_type": "customer.created",
    "object": "customer",
    "webhook": {
        "events": [
            "customer.created"
        ],
        "id": 39,
        "store": "storename",
        "target": "https://webhook.site/6a880c2a-48db-4e28-a575-294dfee934234"
    }
}
```

### Webhook API Versions

Webhook object data structure follows the [Admin API](/docs/api/admin/index.md) and Admin API versioning to ensure predictable data structure for existing webhook receiver endpoints with a path for upgrades.

**Handling Webhook API Versions**

Your app can add handling logic using the `api_version` key when receiving and processing data to handle multiple webhook data structures while upgrading to a newer webhook api version.


### Verifying Webhook Requests

Webhook endpoints are generally open to the internet and therefore it's a best practice to verify the payload data.

Webhook requests include a header `X-29Next-Signature`, the value is a signature of the webhook payload signed using the webhook signing secret. Your application can use the signature to verify the payload authenticity, see an example below.

```python title="Verifying Webhook Payload"
import json

webhook_secret = <YOUR WEBHOOK SIGNING SECRET>

def webhook_payload_validator(request):

    request_sig = request.headers.get('X-29Next-Signature', None)
    webhook_data = json.loads(request.body)

    expected_sig = hmac.new(
        webhook_secret.encode(),
        json.dumps(webhook_data).encode(), hashlib.sha256
    ).hexdigest()

    return True if expected_sig == request_sig else False
```

As shown above, we can verify the data by generating the same signature with the webhook secret.

:::tip

When creating webhooks on the API, you can provide your own signing secret to simplify the signature verification process for webhook payloads.

:::
