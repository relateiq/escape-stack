///<reference path="../typings/index.d.ts" />
import { EscapeStack } from './EscapeStack';
import { handleEscapeKeydown } from './domEventHandler';

const es = new EscapeStack();
handleEscapeKeydown(document.body, es.pop);

export default es;
