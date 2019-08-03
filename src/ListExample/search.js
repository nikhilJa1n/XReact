import {createElement, Component } from '../XReact/XReact.js';

class Search extends Component {
  handleChange(e) {
    this.props.onSubmit(e, e.target.value);
  };

  render() {
    return (
      createElement("div", null, createElement("input", {
        type: "text",
        placeholder: "search here",
        onChange: this.handleChange
      }))
    );
  }
}

export default Search;
