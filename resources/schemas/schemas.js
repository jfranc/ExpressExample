exports.login = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {"login": {"type": "string"}, "password": {"type": "string"}},
    "required": ["login", "password"]
};

exports.register = {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {"name": {"type": "string"}, "login": {"type": "string"}, "password": {"type": "string"}},
        "required": ["name", "login", "password"]
};
