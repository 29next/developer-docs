import copy

from config import WEBHOOKS, CUSTOM_WEBHOOK_EVENT_PAYLOADS


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


def get_custom_webhook_event_payloads(event):
    """
    Returns custom webhook event payloads for the given event.
    """
    for each in CUSTOM_WEBHOOK_EVENT_PAYLOADS:
        if each["event"] == event:
            return each["data"]
    return None


def webhook_schema_generator(spec):
    webhooks = {}
    version = spec["info"]["version"]
    webhook_schema = {}
    for each in WEBHOOKS:
        if each["schema_ref"]:
            schema = get_schema(spec, each["schema_ref"])
            cleaned_data_schema = webhook_data_schema_handler(spec, schema)
        else:
            cleaned_data_schema = get_custom_webhook_event_payloads(each["event"])

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
                                    "event_type": {
                                        "type": ["string"],
                                        "examples": [each["event"]],
                                        "description": "Webhook event type of the current event.",
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
                },
                "410": {
                    "description": "Indicates the webhook target is no longer available and will be disabled."
                }
            },
        }

    return webhook_schema
