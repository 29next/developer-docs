import copy

WEBHOOKS = [
    {
        'event': 'cart.abandoned',
        'object': 'cart',
        'source': 'CartDetail',
        'tag': 'carts',
        'description': 'Triggers when a cart is marked as abandoned.',
    },
    {
        'event': 'customer.created',
        'object': 'customer',
        'source': 'User',
        'tag': 'customers',
        'description': 'Triggers when a new customer is created.',
    },
    {
        'event': 'customer.updated',
        'object': 'customer',
        'source': 'User',
        'tag': 'customers',
        'description': 'Triggers when a customer is created.',
    },
    {
        'event': 'dispute.created',
        'object': 'dispute',
        'source': 'Dispute',
        'tag': 'payments',
        'description': 'Triggers when a new dispute is created.',
    },
    {
        'event': 'dispute.updated',
        'object': 'dispute',
        'source': 'Dispute',
        'tag': 'payments',
        'description': 'Triggers when a dispute is updated.',
    },
    {
        'event': 'order.created',
        'object': 'order',
        'source': 'Order',
        'tag': 'orders',
        'description': 'Triggers when an new order is created.',
    },
    {
        'event': 'order.updated',
        'object': 'order',
        'source': 'Order',
        'tag': 'orders',
        'description': 'Triggers when an order is updated.'
    },
    {
        'event': 'product.created',
        'object': 'product',
        'source': 'Product',
        'tag': 'products',
        'description': 'Triggers when a new product is created.'
    },
    {
        'event': 'product.updated',
        'object': 'product',
        'source': 'Product',
        'tag': 'products',
        'description': 'Triggers when a product is updated.'
    },
    {
        'event': 'transaction.created',
        'object': 'transaction',
        'source': 'Transaction',
        'tag': 'payments',
        'description': 'Triggers when a payment transaction is created.'
    },
    {
        'event': 'subscription.created',
        'object': 'subscription',
        'source': 'Subscription',
        'tag': 'subscriptions',
        'description': 'Triggers when a new subscription is created.'
    },
    {
        'event': 'subscription.updated',
        'object': 'subscription',
        'source': 'Subscription',
        'tag': 'subscriptions',
        'description': 'Triggers when a subscription is updated.'
    },
    {
        'event': 'ticket.created',
        'object': 'ticket',
        'source': 'Ticket',
        'tag': 'support',
        'description': 'Triggers a new support ticket is created.'
    },
    {
        'event': 'ticket.updated',
        'object': 'ticket',
        'source': 'Ticket',
        'tag': 'support',
        'description': 'Triggers a support ticket is updated.'
    },
]


def webhook_data_schema_cleaner(data_schema):
    for key,value in data_schema['properties'].items():
            if type(value) is dict:
                if value.get('readOnly'):
                    del value['readOnly']
    return data_schema


def webhook_schema_generator(spec):
    webhooks = {}
    version = spec['info']['version']
    webhook_schema = {}
    for each in WEBHOOKS:
        schema = copy.deepcopy(spec['components']['schemas'][each['source']])
        cleaned_data_schema = webhook_data_schema_cleaner(schema)
        copy_of_data_schema = schema.copy()
        webhook_schema[each['event']] = {
            "post": {
                "tags": [each['tag']],
                "security": [],
                "description": each['description'],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "api_version": {
                                        "type": ["string"],
                                        "examples": [version],
                                        "description": "API Version of the object data schema."
                                    },
                                    "object": {
                                        "type": ["string"],
                                        "examples": [each['object']],
                                        "description": "Object data type."
                                    },
                                    "data": copy_of_data_schema,
                                    "event_id": {
                                        "type": ["string"],
                                        "format": ["uuid"],
                                        "description": "Unique id associated with this webhook event."
                                    },
                                    "webhook": {
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "type": "integer",
                                                "description": "The webhook sending the event."
                                            },
                                            "store": {
                                                "type": ["string", "null"],
                                                "examples": ['example'],
                                                "description": "The store identifier."
                                            },
                                            "events": {
                                                "description": "See dashboard for webhooks for available events.",
                                                "items": {"type": ["string", "null"]},
                                                "type": "array",
                                            },
                                            "target": {
                                                "description": "Full url for your webhook receiver endpoint.",
                                                "format": "uri",
                                                "maxLength": 255,
                                                "title": "Webhook target",
                                                "type": "string",
                                            },
                                        },
                                    },
                                }
                            }
                        }
                    },
                },
            },
            "responses": {
                "200": {
                    "description": "Return a 200 status to indicate that the data was received successfully."
                }
            },
        }

    return webhook_schema
