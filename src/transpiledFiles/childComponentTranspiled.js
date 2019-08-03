import { Component, createElement } from '../XReact/XReact.js';

const TEXT_ELEMENT = 'TEXT_ELEMENT';

export default class App extends Component {
  render() {
    return  createElement('button', { onClick:this.props.buttonClick, }, createElement(TEXT_ELEMENT, { textValue:"Button", }))    
  }
} 