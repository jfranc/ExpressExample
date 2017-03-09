exports.login = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "error": {"type": "integer"},
        "description": {"type": "string"},
        "result": {
            "type": "object",
            "properties": {"validLogin": {"type": "boolean"}, "token": {"type": "string"}},
            "required": ["validLogin", "token"]
        }
    },
    "required": ["error", "description", "result"]
};