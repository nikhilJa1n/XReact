/* eslint-disable import/extensions */
import { Component, createElement } from './XReact/XReact.js';

export default class App extends Component {
  render() {
    return createElement('button', { onClick: this.props.handleAlertClick }, 'Click');
  }
}
