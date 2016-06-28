///<reference path="../typings/index.d.ts" />
import createEscapeStack from '../.src';

const escapeStack = createEscapeStack();
console.log(escapeStack);

const addBoxButton = document.getElementById('js-add-box');
const addFancyBoxButton = document.getElementById('js-add-fancy-box');

addBoxButton.addEventListener('click', event => {
  addBox();
});

addFancyBoxButton.addEventListener('click', event => {
  addBox(true);
});

function addBox(fancy: boolean = false) {
  const boxDiv = `<div class="col-md-4">
      <div class="demo-box ${fancy ? 'fancy' : ''}"></div>
    </div>`;
  const boxContainer = document.getElementById('box-container');
  const allBoxesDivs = boxContainer.innerHTML;
  boxContainer.innerHTML = allBoxesDivs + boxDiv;
}

function deleteBox(div: Element) {

}
