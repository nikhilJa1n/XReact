// import "../test/component.test.js/";

export function render(element, mainDom) {
  if (typeof element === "string") {
    console.log(element);
    var regexAllTags = /<([a-zA-Z1-6]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)/gim;
    var htmlTags = element.match(regexAllTags);
    var regexSingleTag = /<([a-zA-Z1-6]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)/;
    // for (var i = 0; i < htmlTags.length; i++) {
    var text = regexSingleTag.exec(htmlTags[0]);
    console.log(text);
    const tagname = text[1];
    let className;
    import("../test/component.test.js").then(tagname => {
      className = tagname[text[1]];
      console.log(className);
      const app = new className();
      console.log(mainDom);
      const transpiledElement = app.render();
      console.log(transpiledElement);
      render(transpiledElement, mainDom);
    });

    // }
  } else {
    // console.log(App);

    const { type, props } = element;

    const isTextElement = type === "TEXT_ELEMENT";
    const dom = isTextElement
      ? document.createTextNode(props.textValue)
      : document.createElement(type);

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
