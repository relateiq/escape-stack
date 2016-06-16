export default class EscapeStack {
	private _stack: Array<Function>;
	// stack: Function[];

	constructor() {
		this._stack = [];
	}

	add(handler: Function) {
		this._stack.push(handler);
		return () => this._removeEscapeHandler(handler);
	}

	private _removeEscapeHandler(handler: Function) {
		const index = this._stack.indexOf(handler);
		if (index !== -1) {
			this._stack.splice(index, 1);
		}
	}

	pop(e) {
		while (this._stack.length > 0 && !(this._stack.pop())(e)) {}
	}

}