import{createElement, Component } from '../XReact/XReact.js';

class Add extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addname: '',
    };
  }

  handleChange(e ){
    console.log(e.target)
    this.setState({ addname: e.target.value });
    console.log(this.state.addname);
  };
  render() {
    console.log(this.props);
    
    return (
      createElement("div", null, createElement("form", {
        onSubmit: function onSubmit(e) {
          return this.props.onAdd(e, this.state.addname);
        }
      }, createElement("input", {
        type: "text",
        placeholder: "add here",
        onChange: this.handleChange
      }), createElement("button", {
        type: "submit"
      }, "Add")))
    );
  }
}

export default Add;
