let Ajv = require('ajv');

function validateJson(data, schema) {
    let ajv = new Ajv();
    let validate = ajv.compile(schema);
    let valid = validate(data);
    
    if (!valid) {
        return validate.errors;
    } else {
        return "valid";
    }
}

module.exports = validateJson;