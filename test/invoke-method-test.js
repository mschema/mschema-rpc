var tap = require("tap"),
    test = tap.test,
    plan = tap.plan,
    rpc;

test("load mschema module", function (t) {
  rpc = require('../');
  t.ok(rpc, "mschema loaded");
  t.end();
});

test("rpc.invoke - valid data - with mschema", function (t) {

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
    callback(null, 'weapon fired')
  }

  var data = {
    "name": "small missle",
    "power": "low",
    "warheads": 5
  };

  rpc.invoke(data, fireFn, fireSchema, function(errors, result) {
    t.ok(true, 'weapon fired')
    t.end();
  });

});

test("rpc.invoke - invalid data - with mschema", function (t) {

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
    callback(null, 'weapon fired')
  }

  var data = {
    "name": "small missle",
    "power": "unknown",
    "warheads": 10
  };

  rpc.invoke(data, fireFn, fireSchema, function(err, result) {
    t.type(err, 'object');
    t.type(result.errors, Array);
    t.equal(result.errors.length, 2);
    t.equal(result.errors[0].property, "power");
    t.equal(result.errors[0].constraint, "enum");
    t.similar(result.errors[0].expected, ["high", "medium", "low"]);
    t.equal(result.errors[0].actual, "unknown");
    t.equal(result.errors[0].value, "unknown");
    t.ok(true, 'weapon not fired')
    t.end();
  });

});

test("rpc.invoke - invalid data - with mschema", function (t) {

  var fireSchema = {
    "description": "fires missle",
    "input": {
      "name": {
        "type": "string",
        "required": true
      },
      "password": {
        "type": "string",
        "required": true
      }
      
    }
  };

  function fireFn (input, callback) {
    callback(null, 'weapon fired')
  }

  var data = {
    "name": "hi",
    "password": ""
  };

  rpc.invoke(data, fireFn, fireSchema, function(err, result) {
    t.type(err, "object");
    t.ok(true, 'weapon not fired')
    t.end();
  });

});
