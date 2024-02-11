import copy

WEBHOOKS = [
    {
        "event": "cart.abandoned",
        "object": "cart",
        "schema_ref": "#/components/schemas/CartDetail",
        "tag": "carts",
        "description": "Triggers when a cart is marked as abandoned.",
    },
    {
        "event": "customer.created",
        "object": "customer",
        "schema_ref": "#/components/schemas/User",
        "tag": "customers",
        "description": "Triggers when a new customer is created.",
    },
    {
        "event": "customer.updated",
        "object": "customer",
        "schema_ref": "#/components/schemas/User",
        "tag": "customers",
        "description": "Triggers when a customer is created.",
    },
    {
        "event": "dispute.created",
        "object": "dispute",
        "schema_ref": "#/components/schemas/Dispute",
        "tag": "payments",
        "description": "Triggers when a new dispute is created.",
    },
    {
        "event": "dispute.updated",
        "object": "dispute",
        "schema_ref": "#/components/schemas/Dispute",
        "tag": "payments",
        "description": "Triggers when a dispute is updated.",
    },
    {
        "event": "order.created",
        "object": "order",
        "schema_ref": "#/components/schemas/Order",
        "tag": "orders",
        "description": "Triggers when an new order is created.",
    },
    {
        "event": "order.updated",
        "object": "order",
        "schema_ref": "#/components/schemas/Order",
        "tag": "orders",
        "description": "Triggers when an order is updated.",
    },
    {
        "event": "product.created",
        "object": "product",
        "schema_ref": "#/components/schemas/Product",
        "tag": "products",
        "description": "Triggers when a new product is created.",
    },
    {
        "event": "product.updated",
        "object": "product",
        "schema_ref": "#/components/schemas/Product",
        "tag": "products",
        "description": "Triggers when a product is updated.",
    },
    {
        "event": "transaction.created",
        "object": "transaction",
        "schema_ref": "#/components/schemas/Transaction",
        "tag": "payments",
        "description": "Triggers when a payment transaction is created.",
    },
    {
        "event": "subscription.created",
        "object": "subscription",
        "schema_ref": "#/components/schemas/Subscription",
        "tag": "subscriptions",
        "description": "Triggers when a new subscription is created.",
    },
    {
        "event": "subscription.updated",
        "object": "subscription",
        "schema_ref": "#/components/schemas/Subscription",
        "tag": "subscriptions",
        "description": "Triggers when a subscription is updated.",
    },
    {
        "event": "ticket.created",
        "object": "ticket",
        "schema_ref": "#/components/schemas/Ticket",
        "tag": "support",
        "description": "Triggers a new support ticket is created.",
    },
    {
        "event": "ticket.updated",
        "object": "ticket",
        "schema_ref": "#/components/schemas/Ticket",
        "tag": "support",
        "description": "Triggers a support ticket is updated.",
    },
]


def get_schema(spec, ref):
    name = ref.split("/")[3]
    schema = copy.deepcopy(spec["components"]["schemas"][name])
    return schema


def webhook_data_schema_handler(spec, data_schema):

    for key, value in data_schema["properties"].items():

        # remove readOnly from all properties
        if value.get("readOnly"):
            del value["readOnly"]

        # nested items array
        if type(value) is dict and value.get("items", {}).get("$ref"):
            nested_schema = get_schema(spec, value["items"]["$ref"])
            webhook_data_schema_handler(spec, nested_schema)
            value["items"].clear()
            value["items"].update(nested_schema)

        # $ref
        elif type(value) is dict and value.get("$ref"):
            nested_schema = get_schema(spec, value["$ref"])
            webhook_data_schema_handler(spec, nested_schema)
            value.clear()
            value.update(nested_schema)

        # allOf
        elif type(value) is dict and value.get("allOf", {}):
            nested_schema = get_schema(spec, value["allOf"][0]["$ref"])
            webhook_data_schema_handler(spec, nested_schema)
            value.clear()
            value.update(nested_schema)

        # oneOf
        elif (
            type(value) is dict
            and value.get("oneOf", {})
            and value.get("oneOf", {})[0].get("$ref")
        ):
            nested_schema = get_schema(spec, value["oneOf"][0]["$ref"])
            webhook_data_schema_handler(spec, nested_schema)
            value.clear()
            value.update(nested_schema)

    return data_schema


def webhook_schema_generator(spec):
    webhooks = {}
    version = spec["info"]["version"]
    webhook_schema = {}
    for each in WEBHOOKS:
        schema = get_schema(spec, each["schema_ref"])
        cleaned_data_schema = webhook_data_schema_handler(spec, schema)

        webhook_schema[each["event"]] = {
            "post": {
                "tags": [each["tag"]],
                "security": [],
                "description": each["description"],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "api_version": {
                                        "type": ["string"],
                                        "examples": [version],
                                        "description": "API Version of the object data schema.",
                                    },
                                    "object": {
                                        "type": ["string"],
                                        "examples": [each["object"]],
                                        "description": "Object data type.",
                                    },
                                    "data": cleaned_data_schema,
                                    "event_id": {
                                        "type": ["string"],
                                        "format": ["uuid"],
                                        "description": "Unique id associated with this webhook event.",
                                    },
                                    "webhook": {
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "type": "integer",
                                                "description": "The webhook sending the event.",
                                            },
                                            "store": {
                                                "type": ["string", "null"],
                                                "examples": ["example"],
                                                "description": "The store identifier.",
                                            },
                                            "events": {
                                                "description": "See webhook docs for available events.",
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
