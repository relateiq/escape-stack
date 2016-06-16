///<reference path="../typings/index.d.ts" />
declare var require: NodeRequire;

/**** tape-style ****/
import test = require('tape');
import escapeStack from './';

const NUM_TIMES = 5;

function addToStack(escapeStack, t, numTimes) {
	for (let i = 0; i < numTimes; i++) {
		escapeStack.add(() => t.pass());
	}
}

function popOffStack(escapeStack, numTimes) {
	for (let i = 0; i < numTimes; i++) {
		escapeStack.pop();
	}
}

test('it should call the handler\'s callback when popped', t => {
	t.plan(1);
	const es = escapeStack();
	es.add(() => t.pass());
	es.pop();
});

test('it should call every handler\'s callback when popped', t => {
	t.plan(NUM_TIMES);
	const es = escapeStack();
	addToStack(es, t, NUM_TIMES);
	popOffStack(es, NUM_TIMES);
});

test('it should not call any callbacks when popping an empty stack', t => {
	t.plan(NUM_TIMES);
	const es = escapeStack();
	addToStack(es, t, NUM_TIMES);
	popOffStack(es, NUM_TIMES);

	// stack should be empty now, popping should not have any effect
	popOffStack(es, NUM_TIMES);
});

test('it should remove handlers in the stack without calling their callbacks', t => {
	t.plan(NUM_TIMES * 2);
	const es = escapeStack();

	addToStack(es, t, NUM_TIMES);

	// add a handler that will be removed into the middle of the stack
	const removeHandler = es.add(() => t.pass());

	addToStack(es, t, NUM_TIMES);

	// this should not call its callback
	removeHandler();

	// despite pop being called the total number of handlers times,
	// it should not execute the handlers that were removed
	popOffStack(es, NUM_TIMES + 1);
});