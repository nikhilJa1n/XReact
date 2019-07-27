import XReact from "./XReact.js";
import Component from "./component.js";
import { createElement } from "./createElement.js";

export class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return createElement(
      "div",
      {},
      createElement("h1", {}, "XReact"),
      createElement(
        "ul",
        {},
        createElement("li", {}, "Karan Arora"),
        createElement("li", {}, "Lokpati Mishra"),
        createElement("li", {}, "Nikhil Jain")
      ),
      createElement(
        "span",
        {},
        "Procedure to run XReact",
        createElement(
          "ul",
          {},
          createElement(
            "li",
            {},
            "We're running the render function on our custom string Components."
          ),
          createElement(
            "li",
            {},
            "The App Component's render function returns the XReact element."
          ),
          createElement(
            "li",
            {},
            "We're using createElement function for creating our Xreact Object element."
          )
        )
      )
    );
  }
}
