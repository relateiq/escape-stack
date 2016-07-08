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

  if (Array.prototype.indexOf.call(demoBox.classList, 'fancy') !== -1) {
    demoBox.parentNode.classList.remove('fancy-container');
  }
  setTimeout(() => {
    this.remove();
  }, ANIMATION_TIME);
  return singlePopFlag;
}

function onRemoveFancy(removeEscapeHandler: Function, event) {
  const parentNode = this.parentNode;
  this.classList.remove('loading');
  this.classList.add('closing');
  removeEscapeHandler();
  parentNode.classList.remove('fancy');
  parentNode.parentNode.classList.remove('fancy-container');
  setTimeout(() => {
    this.remove();
  }, ANIMATION_TIME);
}

function addBox(escapeStack, isFancy: boolean = false) {
  let newBoxClasses = 'demo-box';
  if (isFancy) {
    newBoxClasses += ' fancy';
  }

  let removeFancyButton = '';
  if (isFancy) {
    const removeFancyButtonClasses = `remove-fancy js-remove-fancy loading`;
    removeFancyButton = `<div class="${removeFancyButtonClasses}">Remove Fancy</div>`;
  }

  const newBoxColorStyle = `background-color: ${getRandomMaterialColor()}`;

  const newBoxDiv = `<div class="${newBoxClasses}" style="${newBoxColorStyle}">
      ${removeFancyButton}
    </div>`;

  const newBoxContainer = document.createElement('div');
  newBoxContainer.classList.add('box-container');
  newBoxContainer.innerHTML = newBoxDiv;

  if (isFancy) {
    newBoxContainer.classList.add('fancy-container');

    const removeEscapeHandler = escapeStack.add(onEscape.bind(newBoxContainer));
    const removeFancyButtonElement = newBoxContainer.getElementsByClassName('js-remove-fancy')[0];
    const boundedRemove = onRemoveFancy.bind(removeFancyButtonElement, removeEscapeHandler);
    removeFancyButtonElement.addEventListener('click', boundedRemove);
  }

  const allBoxesContainer = document.getElementById('js-all-boxes-container');
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

function getRandomMaterialColor() {
  return '#' + MATERIAL_MAIN_COLORS[Math.floor(Math.random() * MATERIAL_MAIN_COLORS.length)];
}

const MATERIAL_MAIN_COLORS = [
  "F44336",
  "E91E63",
  "9C27B0",
  "673AB7",
  "3F51B5",
  "2196F3",
  "03A9F4",
  "00BCD4",
  "009688",
  "4CAF50",
  "8BC34A",
  "CDDC39",
  "FFEB3B",
  "FFC107",
  "FF9800",
  "FF5722",
  "795548",
  "9E9E9E",
  "607D8B"
];
