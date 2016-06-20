///<reference path="../typings/index.d.ts" />
import { EscapeStack } from './EscapeStack';
import { handleEscapeKeydown } from './domEventHandler';

let globalStack;

const es = new EscapeStack();
handleEscapeKeydown(document.body, es.pop);

function createEscapeStack(global: boolean = false) {
    const es = new EscapeStack();
    handleEscapeKeydown(document.body, es.pop);

    if (!global) {
        return es;
    }

    if (!globalStack) {
        globalStack = es;
    }
    return globalStack;
}

export default createEscapeStack;
