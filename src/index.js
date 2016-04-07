var globalStack;

function makeStack() {
    var stack = [];

    // in order to capture escape event first
    document.body.addEventListener('keydown', function(e) {

        var key = e.keyCode ? e.keyCode : e.which;
        // yup i hard coded 27 sorry suckas
        if (key === 27) {
            while (!!stack.length && !(stack.pop())(e)) {}
        }
    }, true);

    function addEscapeHandler(handler) {
        stack.push(handler);
        return function() {
            removeEscapeHandler(handler);
        };
    }

    function removeEscapeHandler(handler) {
        stack.remove(function(handlerInStack) {
            return handler === handlerInStack;
        });
    }
    return {
        add: addEscapeHandler
    }
}

module.exports = function(global) {
    if (!global) {
        return makeStack();
    }

    if (!globalStack) {
        globalStack = makeStack();
    }
    return globalStack;
};
