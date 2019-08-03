import {createElement, Component } from '../XReact/XReact.js';
class List extends Component {
  render() {
    return (
      createElement("div", null, createElement("h1", null, this.props.title), createElement("ul", null, this.props.names.map(function (name, index) {
        return createElement("li", {
          key: index
        }, name);
      })))
    );
  }
}

export default List;
