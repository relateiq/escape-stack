///<reference path="../typings/index.d.ts" />
import EscapeStack from './EscapeStack';
import handleEscapeKeydown from './domEventHandler';

const es = new EscapeStack();
handleEscapeKeydown(es.add);

export default es;
