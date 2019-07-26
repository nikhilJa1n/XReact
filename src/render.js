export function render(element, mainDom) {
  const { type, props } = element;

  const isTextElement = type === 'TEXT_ELEMENT';
  const dom = isTextElement
    ? document.createTextNode(props.textValue)
    : document.createElement(type);

  const isListener = name => name.startsWith('on');
  Object.keys(props)
    .filter(isListener)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, props[name]);
    });

  // Set properties
  const isAttribute = name => !isListener(name) && name != 'children';
  Object.keys(props)
    .filter(isAttribute)
    .forEach(name => {
      dom[name] = props[name];
    });

  const childElements = props.children || [];
  childElements.forEach(childElement => render(childElement, dom));
  mainDom.appendChild(dom);
  return {
    render,
  };
}
