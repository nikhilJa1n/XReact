/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { renderObjectElement, renderReactElement } from './render-utils.js';

let rootReactElement;
let rootDOM;
let vDOM
let reactElementCount = 0;
export default function render(element, mainDom) {
  if (typeof element.type === 'function') {
    if (reactElementCount < 1) {
      rootDOM = mainDom;
      rootReactElement = renderReactElement(element);
      reactElementCount += 1;
      render(rootReactElement.render(), rootDOM);
      rootReactElement.componentDidMount();
    } else {
      render(renderReactElement(element).render(), mainDom);
    }
  } else {
    const { childElements, dom } = renderObjectElement(element);
    childElements.forEach(childElement => render(childElement, dom));
    vDOM = childElements;
    // return dom;
    mainDom.appendChild(dom);
  }
}

export function reRender(element, dom, vdom) {
  if (typeof element.type === 'function') {

  } else {

  }
}

// reRendering
export function renderAgain() {
  console.log(rootDOM,vDOM);
  while (rootDOM.hasChildNodes()) {
    rootDOM.removeChild(rootDOM.lastChild);
  }
  render(rootReactElement.render(), rootDOM);
}
