const element = createElement('div', {}, createElement('p', {}, 'paraTry'));

class XReact {
  render(element, mainDom) {
    const { type, props } = element;
    // console.log(element);

    const isTextElement = type === 'TEXT_ELEMENT';
    const dom = isTextElement
      ? document.createTextNode(props.textValue)
      : document.createElement(type);
    // console.log(dom);

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
    childElements.forEach(childElement => this.render(childElement, dom));
    mainDom.appendChild(dom);
  }
}

let React = new XReact();
React.render(element, document.getElementById('root'));
