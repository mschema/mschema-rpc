var rpc = {},
    mschema = require("mschema");
var invoke = rpc.invoke = function (data, method, schema, callback) {
  var self = this;
  // validate incoming input data based on schema
  var validate = mschema.validate(data, schema.input, { strict: false });
  if (!validate.valid) {
    var errorJSON = {};
    errorJSON.status = "error";
    errorJSON.errors = validate.errors;
    var error = JSON.stringify(errorJSON, true, 2);
    return callback(new Error(error), errorJSON);
  }
  // execute remote method
  method.call(self, data, function (err, result) {
    // if the executed method has errored continue with error immediately
    if (err) {
      return callback(err);
    }
    // if no error was detected in executing the method attempt to,
    // validate the method's output result based on schema
    var validate = mschema.validate(result, schema.output, { strict: false });
    if (!validate.valid) {
      callback.call(self, validate.errors, result);
    } else {
      callback.call(self, null, result);
    }
  });
}

module['exports'] = rpc;