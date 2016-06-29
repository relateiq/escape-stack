///<reference path="../typings/index.d.ts" />
import createEscapeStack from '../.src';

const escapeStack = createEscapeStack();

const addBoxButton = document.getElementById('js-add-box');
const addFancyBoxButton = document.getElementById('js-add-fancy-box');

addBoxButton.addEventListener('click', _ => addBox());
addFancyBoxButton.addEventListener('click', _ => addBox(true));

function onEscape(isSinglePop: boolean, event) {
  this.remove();
  return isSinglePop;
}

function addBox(isFancy: boolean = false) {
  let newBoxClasses = 'demo-box';
  if (isFancy) {
    newBoxClasses += ' fancy';
  }

  let fancyRemoveButton = '';
  if (isFancy) {
    fancyRemoveButton = `<div class="remove-fancy js-remove-fancy">Remove Fancy</div>`;
  }

  const newBoxDiv = `<div class="${newBoxClasses}">
      ${fancyRemoveButton}
    </div>`;

  const newBoxContainer = document.createElement('div');
  newBoxContainer.classList.add('col-md-4', 'col-sm-12');
  newBoxContainer.innerHTML = newBoxDiv;

  if (isFancy) {
    // passing `true` to stop the EscapeStack's pop function
    // from popping everything in the stack
    escapeStack.add(onEscape.bind(newBoxContainer, true));
  }

  const allBoxesContainer = document.getElementById('all-boxes-container');
  allBoxesContainer.appendChild(newBoxContainer);
}
