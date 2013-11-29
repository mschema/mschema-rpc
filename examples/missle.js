var rpc = require('../');

var fireSchema = {
  "description": "fires missle",
  "input": {
    "name": "string",
      "power": {
        "type": "string",
        "enum": ["high", "medium", "low"]
      },
      "warheads": {
        "type": "number",
        "min": 1,
        "max": 8
      }
    },
  "output": {
    "result": "string"
  }
};

function fireFn (input, callback) {
  callback(null, 'weapon fired');
}

var data = {
  "name": "small missle",
  "power": "low",
  "warheads": 8
};

rpc.invoke(data, fireFn, fireSchema, function(errors, result) {
  console.log('errors', errors);
  console.log('result', result);
});