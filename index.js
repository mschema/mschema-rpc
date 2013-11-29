var rpc = {},
    mschema = require("mschema");

var invoke = rpc.invoke = function (data, method, schema, callback) {
  // validate incoming input data based on schema
  var validate = mschema.validate(data, schema.input);
  if (!validate.valid) {
    return callback(new Error('Validation error'), validate.errors);
  }
  // execute remote method
  method(data, function(err, result){
    // validate outgoing output data based on schema
    var validate = mschema.validate(result, schema.output);
    if (!validate.valid) {
      callback(validate.errors, result);
    } else {
      callback(null, result);
    }
  });
}

module['exports'] = rpc;