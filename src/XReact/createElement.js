/* eslint-disable no-use-before-define */
const TEXT_ELEMENT = 'TEXT_ELEMENT';

export default function createElement(type, properties, ...child) {
  const props = Object.assign({}, properties);
  let arrayChildren = [];
  if (child.length > 0) {
    arrayChildren = [].concat(...child);
  } else {
    arrayChildren = [];
  }
  const filteredChildren = arrayChildren.filter(c => c != null && c !== false);
  props.children = filteredChildren.map(c => (c instanceof Object ? c : createTextElement(c)));
  return { type, props };
}

function createTextElement(text) {
  return createElement(TEXT_ELEMENT, { textValue: text });
}
