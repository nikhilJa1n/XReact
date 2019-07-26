import React from "../XReact.js";
import Component from "../component.js";
import createElement from "../element.js";

const element = createElement("div", {}, createElement("p", {}, "paraTry"));
console.log(React);
// React.render(element, document.getElementById("root"));
describe("component render", function() {
  it("should render the components", function() {
    class App extends Component {
      constructor(props) {
        super(props);
      }
      render() {
        console.log(this.props);
        return element;
      }
    }
    const app = new App();
    console.log(app);
    // React.render(<App />, document.getElementById("root"));
    React.render(element, document.getElementById("root"));

    console.log(document.getElementById("root").innerHTML);
    chai
      .expect(document.getElementById("root").innerHTML)
      .to.equal("<div><p>paraTry</p></div>");
  });
});
