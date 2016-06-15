///<reference path="../typings/index.d.ts" />
declare var require: NodeRequire;

/**** tape-style ****/
import test = require('tape');
import escapeStack from './';

test('it should have a working test environment', function(t) {
    t.equal(true, true);
    t.end();
});
