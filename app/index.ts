///<reference path="../typings/index.d.ts" />
import createEscapeStack from '../.src';

const escapeStack = createEscapeStack();

const addBoxButton = document.getElementById('js-add-box');
const addFancyBoxButton = document.getElementById('js-add-fancy-box');

addBoxButton.addEventListener('click', _ => addBox());
addFancyBoxButton.addEventListener('click', _ => addBox(true));

function onEscape(isSinglePop: boolean = true, event) {
  this.remove();
  return isSinglePop;
}

function onRemoveFancy(removeEscapeHandler: Function, event) {
  const parentNode = this.parentNode;
  removeEscapeHandler();
  parentNode.classList.remove('fancy');
  this.remove();
}

function addBox(isFancy: boolean = false) {
  let newBoxClasses = 'demo-box';
  if (isFancy) {
    newBoxClasses += ' fancy';
  }

  let removeFancyButton = '';
  if (isFancy) {
    removeFancyButton = `<div class="remove-fancy js-remove-fancy">Remove Fancy</div>`;
  }

  const newBoxDiv = `<div class="${newBoxClasses}">
      ${removeFancyButton}
    </div>`;

  const newBoxContainer = document.createElement('div');
  newBoxContainer.classList.add('col-md-4', 'col-sm-12');
  newBoxContainer.innerHTML = newBoxDiv;

  if (isFancy) {
    // passing `true` to stop the EscapeStack's pop function from popping everything in the stack
    const removeEscapeHandler = escapeStack.add(onEscape.bind(newBoxContainer, true));
    const removeFancyButtonElement = newBoxContainer.getElementsByClassName('js-remove-fancy')[0]
    const boundedRemove = onRemoveFancy.bind(removeFancyButtonElement, removeEscapeHandler);
    removeFancyButtonElement.addEventListener('click', boundedRemove);
  }

  const allBoxesContainer = document.getElementById('all-boxes-container');
  allBoxesContainer.appendChild(newBoxContainer);
}
