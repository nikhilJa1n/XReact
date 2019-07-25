// const { render } = require('./index.html');
const XReact = importRender();
const element = {
  type: 'span',
  props: {
    children: [
      {
        type: 'TEXT ELEMENT',
        props: { textValue: 'XReact' },
      },
    ],
  },
};

function importRender() {
  function render(element, mainDom) {
    const { type, props } = element;

    const isTextElement = type === 'TEXT ELEMENT';
    const dom = isTextElement
      ? document.createTextNode(props.textValue)
      : document.createElement(type);

    const childElements = props.children || [];
    childElements.forEach(childElement => render(childElement, dom));
    mainDom.appendChild(dom);
  }
  return {
    render,
  };
}

XReact.render(element, document.getElementById('root'));
