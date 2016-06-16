const ESCAPE_KEY_CODE = 27;

// todo: change typing to be function that takes one param of type event?
export default function handleEscapeKeydown(callback: Function) {
	document.body.addEventListener('keydown', event => {
		const key = event.keyCode || event.which;
		if (key === ESCAPE_KEY_CODE) {
			callback(event);
		}
	})
}