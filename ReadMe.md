# mschema-rpc

<img src="https://travis-ci.org/mschema/mschema-rpc.svg?branch=master"/>

Minimalistic [Remote Procedural Call](http://en.wikipedia.org/wiki/Remote_procedure_call) library using [mschema](http://mschema.org) validation for remote method's input and output.

## Features

 - Provides validation to functions incoming arguments and outgoing results
 - Validation based on [mschema](http://mschema.org)

# API

### rpc.invoke(inputData, method, methodSchema, callback)

### inputData
the input data to be sent to `method`

### method
the method to be executed remotely

### methodSchema
the schema to be used to validate the input and output of `method`

**schema format**
```json
{
  "input": {
    "key": "val"
  },
  "output": {
    "key": "val"
  }
}
```
*see: http://github.com/mschema/mschema for full schema format documentation*

### callback

the callback to be executed after `method` has been invoked

## Example

```js 

var rpc = require('mschema-rpc');

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
```