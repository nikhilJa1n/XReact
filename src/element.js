const TEXT_ELEMENT = 'TEXT_ELEMENT';

function createElement(type, properties, ...child) {
  console.log(properties);

  const props = Object.assign({}, properties);
  const hasChildren = child.length > 0;
  const arrayChildren = hasChildren ? [].concat(...child) : [];
  props.children = arrayChildren
    .filter(child => child != null && child !== false)
    .map(child => (child instanceof Object ? child : createTextElement(child)));
  return { type, props };
}

function createTextElement(text) {
  return createElement(TEXT_ELEMENT, { textValue: text });
}
