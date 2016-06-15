///<reference path="../typings/index.d.ts" />
declare var require: NodeRequire;

/**** tape-style ****/
var test = require('tape');

test('it should have a working test environment', function(t) {
    t.equal(true, true);
    t.end();
});
