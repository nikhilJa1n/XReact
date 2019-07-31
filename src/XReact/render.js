/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { renderObjectElement, renderReactElement } from './render-utils.js';

let rootReactElement;
let rootDOM;
let reactElementCount = 0;
export default function render(element, mainDom) {
  if (typeof element.type === 'function') {
    if (reactElementCount < 1) {
      rootDOM = mainDom;
      rootReactElement = renderReactElement(element);
      reactElementCount += 1;
      render(rootReactElement.render(), rootDOM);
    } else {
      render(renderReactElement(element).render(), mainDom);
    }
  } else {
    const { childElements, dom } = renderObjectElement(element);
    childElements.forEach(childElement => render(childElement, dom));
    mainDom.appendChild(dom);
  }
}

// reRendering
export function renderAgain() {
  while (rootDOM.hasChildNodes()) {
    rootDOM.removeChild(rootDOM.lastChild);
  }
  render(rootReactElement.render(), rootDOM);
}
