///<reference path="../typings/index.d.ts" />
import { EscapeStack } from './EscapeStack';
import { handleEscapeKeydown } from './domEventHandler';

let globalStack;

function initStack() {
    const escapeStack = new EscapeStack();
    handleEscapeKeydown(document.body, escapeStack.pop);
    return escapeStack;
}

function createEscapeStack(global: boolean = false) {
    if (!global) {
        return initStack();
    }

    if (!globalStack) {
        globalStack = initStack();
    }
    return globalStack;
}

export default createEscapeStack;
