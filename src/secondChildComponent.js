/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/extensions */
import { Component, createElement } from './XReact/XReact.js';

export default class App extends Component {
  render() {
    return createElement('button', { onClick: this.props.handleAddClick }, 'Add 1');
  }
}
