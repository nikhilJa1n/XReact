export function render(element, mainDom) {
  if (typeof element === "string") {
    var regexAllTags = /<([a-zA-Z1-6]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)/gim;
    var htmlTags = element.match(regexAllTags);
    var regexSingleTag = /<([a-zA-Z1-6]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)/;
    var text = regexSingleTag.exec(htmlTags[0]);
    import("./app.js").then(tagname => {
      const className = tagname[text[1]];
      const app = new className();
      const transpiledElement = app.render();
      render(transpiledElement, mainDom);
    });
  } else if (typeof element.type === "function") {
    const { type, props } = element;
    const instance = new type();
    render(instance.render(), mainDom);
  } else {
    const { type, props } = element;

    const isTextElement = type === "TEXT_ELEMENT";
    const dom = isTextElement
      ? document.createTextNode(props.textValue)
      : document.createElement(type);

    // Set Listeners
    const isListener = name => name.startsWith("on");
    Object.keys(props)
      .filter(isListener)
      .forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, props[name]);
      });

    // Set properties
    const isAttribute = name => !isListener(name) && name != "children";
    Object.keys(props)
      .filter(isAttribute)
      .forEach(name => {
        dom[name] = props[name];
      });

    const childElements = props.children || [];
    childElements.forEach(childElement => render(childElement, dom));
    mainDom.appendChild(dom);
    return {
      render
    };
  }
}
