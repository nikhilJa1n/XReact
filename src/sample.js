import XReact from "../src/XReact.js";
import Component from "../src/component.js";
import { createElement } from "../src/createElement.js";

export class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return createElement("div", {}, createElement("p", {}, "paraTry"));
  }
}

XReact.render("<App />", document.getElementById("root"));
