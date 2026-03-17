import copy

from config import WEBHOOKS, CUSTOM_WEBHOOK_EVENT_PAYLOADS


def generate_example(schema, depth=0):
    """Recursively build a JSON example value from a schema."""
    if not isinstance(schema, dict) or depth > 4:
        return None
    schema_type = schema.get("type", "object")
    # Use explicit example/examples if provided
    if "example" in schema:
        return schema["example"]
    if "examples" in schema and schema["examples"]:
        return schema["examples"][0]
    if schema_type == "object" or "properties" in schema:
        props = schema.get("properties", {})
        return {k: generate_example(v, depth + 1) for k, v in props.items()} if props else {}
    if schema_type == "array":
        item = generate_example(schema.get("items", {}), depth + 1)
        return [item] if item is not None else []
    if schema_type == "integer":
        return schema.get("default", 0)
    if schema_type == "number":
        return schema.get("default", 0.0)
    if schema_type == "boolean":
        return schema.get("default", False)
    if schema_type == "string":
        fmt = schema.get("format", "")
        if fmt == "date-time":
            return "2024-01-01T00:00:00Z"
        if fmt == "date":
            return "2024-01-01"
        if fmt == "uuid":
            return "a7a26ff2-e851-45b6-9634-d595f45458b7"
        if fmt == "uri":
            return "https://example.com"
        if fmt == "email":
            return "user@example.com"
        if fmt == "decimal":
            return "0.00"
        return schema.get("default", "string")
    return None


def get_schema(spec, ref):
    name = ref.split("/")[3]
    schema = copy.deepcopy(spec["components"]["schemas"][name])
    return schema


def _merge_resolved(value, resolved):
    """
    Merge a resolved schema into a field dict, preserving sibling metadata
    (description, title, nullable, etc.) that was on the original value.
    """
    # Save sibling metadata keys that aren't schema-structural
    sibling_keys = {"description", "title", "nullable", "deprecated", "readOnly", "writeOnly", "example", "examples"}
    saved = {k: v for k, v in value.items() if k in sibling_keys}

    value.clear()
    value.update(resolved)

    # Restore sibling metadata (original takes precedence over resolved)
    for k, v in saved.items():
        if k not in value:
            value[k] = v


def webhook_data_schema_handler(spec, data_schema):

    for key, value in data_schema.get("properties", {}).items():

        # remove readOnly from all properties
        if value.get("readOnly"):
            del value["readOnly"]

        # nested items array
        if isinstance(value, dict) and value.get("items", {}).get("$ref"):
            nested_schema = get_schema(spec, value["items"]["$ref"])
            webhook_data_schema_handler(spec, nested_schema)
            value["items"].clear()
            value["items"].update(nested_schema)

        # $ref
        elif isinstance(value, dict) and value.get("$ref"):
            nested_schema = get_schema(spec, value["$ref"])
            webhook_data_schema_handler(spec, nested_schema)
            _merge_resolved(value, nested_schema)

        # allOf
        elif isinstance(value, dict) and value.get("allOf"):
            all_of = value["allOf"]
            # Merge all allOf entries (resolve $ref entries, merge plain schemas)
            merged = {}
            for entry in all_of:
                if entry.get("$ref"):
                    nested_schema = get_schema(spec, entry["$ref"])
                    webhook_data_schema_handler(spec, nested_schema)
                    # Merge properties from each allOf entry
                    for prop_key, prop_val in nested_schema.get("properties", {}).items():
                        merged.setdefault("properties", {})[prop_key] = prop_val
                    if "type" in nested_schema:
                        merged["type"] = nested_schema["type"]
                else:
                    # Plain schema fragment (e.g. additional properties)
                    for prop_key, prop_val in entry.get("properties", {}).items():
                        merged.setdefault("properties", {})[prop_key] = prop_val
                    if "type" in entry:
                        merged["type"] = entry["type"]
            if "type" not in merged:
                merged["type"] = "object"
            _merge_resolved(value, merged)

        # oneOf — resolve all variants, merge their properties
        elif (
            isinstance(value, dict)
            and value.get("oneOf")
            and isinstance(value["oneOf"], list)
        ):
            one_of = value["oneOf"]
            merged = {}
            for entry in one_of:
                if entry.get("$ref"):
                    nested_schema = get_schema(spec, entry["$ref"])
                    webhook_data_schema_handler(spec, nested_schema)
                    for prop_key, prop_val in nested_schema.get("properties", {}).items():
                        merged.setdefault("properties", {})[prop_key] = prop_val
                    if "type" in nested_schema:
                        merged["type"] = nested_schema["type"]
            if "type" not in merged:
                merged["type"] = "object"
            _merge_resolved(value, merged)

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
    version = spec["info"]["version"]
    webhook_schema = {}
    for each in WEBHOOKS:
        if each["schema_ref"]:
            schema = get_schema(spec, each["schema_ref"])
            cleaned_data_schema = webhook_data_schema_handler(spec, schema)
        else:
            cleaned_data_schema = get_custom_webhook_event_payloads(each["event"])

        # Ensure the data schema has type: object
        if isinstance(cleaned_data_schema, dict) and "type" not in cleaned_data_schema:
            cleaned_data_schema["type"] = "object"

        # Build a complete example payload for the code sample panel
        payload_example = {
            "api_version": version,
            "object": each["object"],
            "data": generate_example(cleaned_data_schema),
            "event_id": "a7a26ff2-e851-45b6-9634-d595f45458b7",
            "event_type": each["event"],
            "webhook": {
                "id": 1,
                "store": "example",
                "events": [each["event"]],
                "target": "https://example.com/webhook/",
            },
        }

        webhook_schema[each["event"]] = {
            "post": {
                "tags": [each["tag"]],
                "security": [],
                "description": each["description"],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "example": payload_example,
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "api_version": {
                                        "type": "string",
                                        "examples": [version],
                                        "description": "API Version of the object data schema.",
                                    },
                                    "object": {
                                        "type": "string",
                                        "examples": [each["object"]],
                                        "description": "Object data type.",
                                    },
                                    "data": cleaned_data_schema,
                                    "event_id": {
                                        "type": "string",
                                        "format": "uuid",
                                        "description": "Unique id associated with this webhook event.",
                                    },
                                    "event_type": {
                                        "type": "string",
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
                                                "type": "string",
                                                "nullable": True,
                                                "examples": ["example"],
                                                "description": "The store identifier.",
                                            },
                                            "events": {
                                                "description": "See webhook docs for available events.",
                                                "items": {"type": "string"},
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
                "responses": {
                    "200": {
                        "description": "Return a 200 status to indicate that the data was received successfully."
                    },
                    "410": {
                        "description": "Indicates the webhook target is no longer available and will be disabled."
                    }
                },
            },
        }

    return webhook_schema
