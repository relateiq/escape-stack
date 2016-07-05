///<reference path="../typings/index.d.ts" />
import createEscapeStack from '../.src';

const ANIMATION_TIME = 1000;

const escapeStack = createEscapeStack();
let singlePopFlag = true;

const addBoxButton = document.getElementById('js-add-box');
const addFancyBoxButton = document.getElementById('js-add-fancy-box');
const toggleSinglePopButton = document.getElementById('js-toggle-single-pop');

addBoxButton.addEventListener('click', _ => addBox(escapeStack, false));
addFancyBoxButton.addEventListener('click', _ => addBox(escapeStack, true));
toggleSinglePopButton.addEventListener('click', event => {
  toggleSinglePop(event.target);
});

function toggleSinglePop(button) {
  singlePopFlag = !singlePopFlag;
  const popText = `${singlePopFlag ? 'Single Pop' : 'Pop All'}`;
  const singlePopButtonText = `Currently set to: ${popText} (Click to toggle)`;
  button.innerHTML = singlePopButtonText;
}

function onEscape(event) {
  const demoBox = this.getElementsByClassName('demo-box')[0];
  demoBox.classList.remove('loading');
  demoBox.classList.add('closing');
  setTimeout(() => {
    this.remove();
  }, ANIMATION_TIME);
  return singlePopFlag;
}

function onRemoveFancy(removeEscapeHandler: Function, event) {
  const parentNode = this.parentNode;
  removeEscapeHandler();
  parentNode.classList.remove('fancy');
  this.remove();
}

function addBox(escapeStack, isFancy: boolean = false) {
  let newBoxClasses = 'demo-box';
  if (isFancy) {
    newBoxClasses += ' fancy';
  }

  let removeFancyButton = '';
  if (isFancy) {
    removeFancyButton = `<div class="remove-fancy js-remove-fancy">Remove Fancy</div>`;
  }

  const newBoxColorStyle = `background-color: ${getRandomColor()}`;

  const newBoxDiv = `<div class="${newBoxClasses}" style="${newBoxColorStyle}">
      ${removeFancyButton}
    </div>`;

  const newBoxContainer = document.createElement('div');
  newBoxContainer.classList.add('col-md-4', 'col-sm-12');
  newBoxContainer.innerHTML = newBoxDiv;

  if (isFancy) {
    const removeEscapeHandler = escapeStack.add(onEscape.bind(newBoxContainer));
    const removeFancyButtonElement = newBoxContainer.getElementsByClassName('js-remove-fancy')[0];
    const boundedRemove = onRemoveFancy.bind(removeFancyButtonElement, removeEscapeHandler);
    removeFancyButtonElement.addEventListener('click', boundedRemove);
  }

  const allBoxesContainer = document.getElementById('all-boxes-container');
  allBoxesContainer.appendChild(newBoxContainer);
  newBoxContainer.getElementsByClassName('demo-box')[0].classList.add('loading');
}

function getRandomColor() {
  const letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
