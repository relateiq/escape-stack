[![npm][npm-badge]][npm-badge-url]
[npm-badge]: https://img.shields.io/npm/v/escape-stack.svg
[npm-badge-url]: https://www.npmjs.com/package/escape-stack

# Escape Stack

A sweet way of handling things that close (or do other things) when the escape key is pushed

## Demo
http://relateiq.github.io/escape-stack

See the [Developing](#developing) section for instructions on how to play with the demo locally

## Installation

```
npm install escape-stack
```

Use the `--save` flag to save it to your `package.json`.

## Usage

Escape Stack exports a function that creates the stack. You can add event handler functions to the stack which get called as you pop the stack.

```typescript
import createEscapeStack from 'escape-stack';

const escapeStack = createEscapeStack();
```

### Adding to the Escape Stack
The `add(handler: Function)` function pushes an event handler onto the stack.

The following example functions return `true` so they [pop once per each escape keypress](#single-and-continuous-popping).

```typescript
function closeModal(event) {
  // logic!
  return true;
}

function paintItBlack() {
  // logic!
  return true;
}

function doTheHappyDance() {
  // logic!
  return true;
}

escapeStack.add(closeModal);
escapeStack.add(paintItBlack);
escapeStack.add(doTheHappyDance);
```

### Popping from the Escape Stack
Pressing the escape key pops and calls the most recent event handler that was added to the stack.

In our example, pressing escape once will call `doTheHappyDance()`. Pressing it again will call `paintItBlack()`. And pressing it again will call `closeModal()`. At this point, the stack is empty, and further presses of the escape key are no-ops until more handlers are added to the stack.

#### Single and Continuous Popping
Internally, `pop()` checks the return value of the handler functions. It continues to pop the handlers (remove them from the stack and execute them) until `true` is returned by a handler function or until the stack is empty.

In our example, since we returned `true` for every handler function we added to the escape stack, pressing the escape key will only remove and call one function at a time every time the escape key is pressed.

If they all returned `false`, they will all be removed and called the first time the escape key is pressed.

If `doTheHappyDance()` returned `false` and `paintItBlack()` returned `true`, both will be removed and called when the escape key is pressed, but not `closeModal()`.

### Removing a Handler
The return value of the `add()` function is a function that removes that specific handler from the stack when called.

```typescript
function closeModal(event) {
  // logic!
  return true;
}

function paintItBlack() {
  // logic!
  return true;
}

function doTheHappyDance() {
  // logic!
  return true;
}

const removeCloseModal = escapeStack.add(closeModal);
const removePaintItBlack = escapeStack.add(paintItBlack);
const removeDoTheHappyDance = escapeStack.add(doTheHappyDance);

// remove paintItBlack() from the stack without executing it
removePaintItBlack();
```

In this example, pressing escape will call `doTheHappyDance()`, and pressing it again will call `closeModal()`, leaving the stack empty.

## Developing
This library is written in Typescript. In order to run or modify the source you will first need to install typescript by running:

```
npm install -g typescript
```

Then install the depedendencies by running:

```
npm install
typings install
```

The source code lives in `./src/`. When compiled, the resulting javascript (es5) code will be in `./.src/`. Similarly, the demo app that utilizes the library lives in `./app/`, and its resulting javascript code will be in `./.app/`.

Tests live alongside their respective files being tested, and end in `.spec.ts`. The tests for Escape Stack are written using [tape](https://github.com/substack/tape).

To start a watcher that continues to compile the source and run tests, run:

```
npm run start
```

Every time a change is made to the source, this will recompile the code and run tests on it.
It will let you know which port the demo app is running on (typically `:8080`).

## Contributing
Have any suggestions? Have an issue? Want to make any improvements? We would love your feedback!

Use the [issue tracker](http://github.com/relateiq/escape-stack/issues) to report any issues.

If you would like to contribute code:
* clone this repo
* make a new branch
* make changes
* ensure all the tests pass, and write new tests as necessary
* submit a pull request!
