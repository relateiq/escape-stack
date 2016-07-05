const ESCAPE_KEY_CODE = 27;

export function handleEscapeKeydown(element: Node, callback: Function) {
  document.addEventListener('DOMContentLoaded', () => {
    element.addEventListener('keydown', function (event: KeyboardEvent) {
      const key = event.keyCode || event.which;
      if (key === ESCAPE_KEY_CODE) {
        callback(event);
      }
    }, true);
  });
}
