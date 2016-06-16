export default class EscapeStack {
	/**
	 * The stack is implemented as an array of functions 
	 * which correspond to the callbacks of the handlers
	 */
	private _stack: Array<Function>;

	constructor() {
		this._stack = [];
	}

	/**
	 * Pushes an event handler onto the stack
	 * Returns a function that when called removes that particular handler 
	 * from the stack without executing its callback
	 * 
	 * @param {Function} handler
	 */
	add(handler: Function) {
		this._stack.push(handler);
		return () => this._removeEscapeHandler(handler);
	}

	/**
	 * Removes the given handler from the stack without executing its callback
	 * This should never be called explicitly, it is the function returned by add()
	 * 
	 * @param {Function} handler - the reference to the handler function to remove
	 */
	private _removeEscapeHandler(handler: Function) {
		const index = this._stack.indexOf(handler);
		if (index !== -1) {
			this._stack.splice(index, 1);
		}
	}

	/**
	 * Removes event handlers from the top of the stack and executes their callbacks.
	 * Continues to remove handlers until `false` is returned by a callback or the stack is empty
	 * 
	 * @param {any}
	 */
	pop(e?: any) {
		while (this._stack.length > 0 && !(this._stack.pop())(e)) {}
	}

}