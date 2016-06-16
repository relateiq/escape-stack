///<reference path="../typings/index.d.ts" />
declare var require: NodeRequire;

/**** tape-style ****/
import test = require('tape');
import escapeStack from './';

const NUM_TIMES = 5;

test('it should call the handler\'s callback when popped', t => {
	t.plan(1);
	const es = escapeStack();
	es.add(() => t.pass());
	es.pop();
});

test('it should call every handler\'s callback when popped', t => {
	t.plan(NUM_TIMES);
	const es = escapeStack();

	for (let i = 0; i < NUM_TIMES; i++) {
		es.add(() => t.pass());
	}
	for (let i = 0; i < NUM_TIMES; i++) {
		es.pop();
	}
});

test('it should not call any callbacks when popping an empty stack', t => {
	t.plan(NUM_TIMES);
	const es = escapeStack();

	for (let i = 0; i < NUM_TIMES; i++) {
		es.add(() => t.pass());
	}
	for (let i = 0; i < NUM_TIMES; i++) {
		es.pop();
	}

	// stack should be empty now, popping should not have any effect
	for (let i = 0; i < NUM_TIMES; i++) {
		es.pop();
	}
});

test('it should remove handlers in the stack without calling their callbacks', t => {
	t.plan(NUM_TIMES * 2);
	const es = escapeStack();

	for (let i = 0; i < NUM_TIMES; i++) {
		es.add(() => t.pass());
	}

	// add a handler that will be removed into the middle of the stack
	const removeHandler = es.add(() => t.pass());

	for (let i = 0; i < NUM_TIMES; i++) {
		es.add(() => t.pass());
	}

	// this should not call its callback
	removeHandler();

	// despite pop being called the total number of handlers times,
	// it should not execute the handlers that were removed
	for (let i = 0; i < (NUM_TIMES * 2) + 1; i++) {
		es.pop();
	}
});