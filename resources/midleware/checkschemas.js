const Ajv= require('ajv');
const ajv= new Ajv();
const schemas= require("../schemas/schemas.js");
const resultJson= require('../helpers/resultJson.js');

// Generator JSON Schemas http://jsonschema.net
exports.midlewareValidateSchema= function(schema) {
    return function(req, res, next) {
        if(ajv.validate(schemas[schema], req.body)) {
            next();
        }
        else {
            resultJson.error(res, 400, 1000, "Error al validar:" + schema + " - Errors: " + ajv.errors);
        }
    };
};

