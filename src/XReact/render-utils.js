export function renderObjectElement(element) {
  const { type, props } = element;

  // Create element Else Create Text Node
  const isTextElement = type === 'TEXT_ELEMENT';
  const dom = isTextElement
    ? document.createTextNode(props.textValue)
    : document.createElement(type);

  // Set Listeners
  const isListener = name => name.startsWith('on');
  Object.keys(props)
    .filter(isListener)
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, props[name]);
    });

  // Set properties
  const isAttribute = name => !isListener(name) && name !== 'children';
  Object.keys(props)
    .filter(isAttribute)
    .forEach((name) => {
      dom[name] = props[name];
    });
  const childElements = props.children || [];

  return { childElements, dom };
}

export function renderReactElement(element) {
  const { props } = element;
  const Type = element.type;
  const reactElement = new Type(props);
  return reactElement;
}
