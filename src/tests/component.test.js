import XReact from "../XReact.js";
import Component from "../component.js";
import { createElement } from "../createElement.js";

export class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return createElement("div", {}, createElement("p", {}, "paraTry"));
  }
}

describe("component render", function() {
  it("should render the components", async function() {
    // const app = new App();
    // console.log(app.render());
    XReact.render(
      "<App name={this.state.value} value={this.state.hello} />",
      document.getElementById("root")
    );
    setTimeout(() => {
      chai
        .expect(document.getElementById("root").innerHTML)
        .to.equal("<div><p>paraTry</p></div>");
    }, 500);
    // XReact.render(app.render(), document.getElementById("root"));

    console.log(document.getElementById("root").innerHTML);
  });
});
