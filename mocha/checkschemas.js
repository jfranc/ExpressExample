const Ajv= require('ajv');
const ajv= new Ajv();
const schemas= require("./schemas.js");

// Generator JSON Schemas http://jsonschema.net
module.exports= function(schema, json) {
    const valid= ajv.validate(schemas[schema], req.body);
    if(valid) {
        return true;
    }
    else {
        console.log(ajv.errors);
        return false;
    }
};
