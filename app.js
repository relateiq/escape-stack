(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
///<reference path="../typings/index.d.ts" />
var _src_1 = require('../.src');
var ANIMATION_TIME = 1000;
var escapeStack = _src_1.default();
var singlePopFlag = true;
var addBoxButton = document.getElementById('js-add-box');
var addFancyBoxButton = document.getElementById('js-add-fancy-box');
var toggleSinglePopButton = document.getElementById('js-toggle-single-pop');
addBoxButton.addEventListener('click', function (_) { return addBox(escapeStack, false); });
addFancyBoxButton.addEventListener('click', function (_) { return addBox(escapeStack, true); });
toggleSinglePopButton.addEventListener('click', function (event) {
    toggleSinglePop(event.target);
});
function toggleSinglePop(button) {
    singlePopFlag = !singlePopFlag;
    var popText = "" + (singlePopFlag ? 'Single Pop' : 'Pop All');
    var singlePopButtonText = "Currently set to: " + popText + " (Click to toggle)";
    button.innerHTML = singlePopButtonText;
}
function onEscape(event) {
    var _this = this;
    var demoBox = this.getElementsByClassName('demo-box')[0];
    demoBox.classList.remove('loading');
    demoBox.classList.add('closing');
    if (Array.prototype.indexOf.call(demoBox.classList, 'fancy') !== -1) {
        demoBox.parentNode.classList.remove('fancy-container');
    }
    setTimeout(function () {
        _this.remove();
    }, ANIMATION_TIME);
    return singlePopFlag;
}
function onRemoveFancy(removeEscapeHandler, event) {
    var _this = this;
    var parentNode = this.parentNode;
    this.classList.remove('loading');
    this.classList.add('closing');
    removeEscapeHandler();
    parentNode.classList.remove('fancy');
    parentNode.parentNode.classList.remove('fancy-container');
    setTimeout(function () {
        _this.remove();
    }, ANIMATION_TIME);
}
function addBox(escapeStack, isFancy) {
    if (isFancy === void 0) { isFancy = false; }
    var newBoxClasses = 'demo-box';
    if (isFancy) {
        newBoxClasses += ' fancy';
    }
    var removeFancyButton = '';
    if (isFancy) {
        var removeFancyButtonClasses = "remove-fancy js-remove-fancy loading";
        removeFancyButton = "<div class=\"" + removeFancyButtonClasses + "\">Remove Fancy</div>";
    }
    var newBoxColorStyle = "background-color: " + getRandomPastelColor();
    var newBoxDiv = "<div class=\"" + newBoxClasses + "\" style=\"" + newBoxColorStyle + "\">\n      " + removeFancyButton + "\n    </div>";
    var newBoxContainer = document.createElement('div');
    newBoxContainer.classList.add('box-container');
    newBoxContainer.innerHTML = newBoxDiv;
    if (isFancy) {
        newBoxContainer.classList.add('fancy-container');
        var removeEscapeHandler = escapeStack.add(onEscape.bind(newBoxContainer));
        var removeFancyButtonElement = newBoxContainer.getElementsByClassName('js-remove-fancy')[0];
        var boundedRemove = onRemoveFancy.bind(removeFancyButtonElement, removeEscapeHandler);
        removeFancyButtonElement.addEventListener('click', boundedRemove);
    }
    var allBoxesContainer = document.getElementById('js-all-boxes-container');
    allBoxesContainer.appendChild(newBoxContainer);
    newBoxContainer.getElementsByClassName('demo-box')[0].classList.add('loading');
}
// http://kentor.me/posts/generating-pastel-colors-for-css/
function getRandomPastelColor() {
    var hue = Math.floor(Math.random() * 360);
    var pastel = 'hsl(' + hue + ', 100%, 75%)';
    return pastel;
}

},{"../.src":4}],2:[function(require,module,exports){
"use strict";
var EscapeStack = (function () {
    function EscapeStack() {
        this._stack = [];
    }
    /**
     * Pushes an event handler onto the stack
     * Returns a function that when called removes that particular handler
     * from the stack without executing its callback
     *
     * @param {Function} handler
     */
    EscapeStack.prototype.add = function (handler) {
        var _this = this;
        this._stack.push(handler);
        return function () { return _this._removeEscapeHandler(handler); };
    };
    /**
     * Removes the given handler from the stack without executing its callback
     * This should never be called explicitly, it is the function returned by add()
     *
     * @param {Function} handler - the reference to the handler function to remove
     */
    EscapeStack.prototype._removeEscapeHandler = function (handler) {
        var index = this._stack.indexOf(handler);
        if (index !== -1) {
            this._stack.splice(index, 1);
        }
    };
    /**
     * Removes event handlers from the top of the stack and executes their callbacks.
     * Continues to remove handlers until `true` is returned by a callback or the stack is empty
     *
     * @param {Event} event
     */
    EscapeStack.prototype.pop = function (event) {
        while (this._stack.length > 0 && !(this._stack.pop())(event)) { }
    };
    return EscapeStack;
}());
exports.EscapeStack = EscapeStack;

},{}],3:[function(require,module,exports){
"use strict";
var ESCAPE_KEY_CODE = 27;
function handleEscapeKeydown(element, callback) {
    element.addEventListener('keydown', function (event) {
        var key = event.keyCode || event.which;
        if (key === ESCAPE_KEY_CODE) {
            callback(event);
        }
    }, true);
}
exports.handleEscapeKeydown = handleEscapeKeydown;

},{}],4:[function(require,module,exports){
"use strict";
///<reference path="../typings/index.d.ts" />
var EscapeStack_1 = require('./EscapeStack');
var domEventHandler_1 = require('./domEventHandler');
var globalStack;
function initStack() {
    var escapeStack = new EscapeStack_1.EscapeStack();
    domEventHandler_1.handleEscapeKeydown(document.body, escapeStack.pop.bind(escapeStack));
    return escapeStack;
}
function createEscapeStack(global) {
    if (global === void 0) { global = false; }
    if (!global) {
        return initStack();
    }
    if (!globalStack) {
        globalStack = initStack();
    }
    return globalStack;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createEscapeStack;

},{"./EscapeStack":2,"./domEventHandler":3}]},{},[1])
//# sourceMappingURL=app.js.map
