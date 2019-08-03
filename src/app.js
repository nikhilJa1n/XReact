/* eslint-disable import/extensions */
import { Component, createElement, render } from './XReact/XReact.js';
import ChildComponent from './childComponent.js';
import Second from './secondChildComponent.js';

const TEXT_ELEMENT = 'TEXT_ELEMENT';

export default class App extends Component {
  render() {
    return JSX(
      <div>
        Hello <span>{this.props.author}</span>
      </div>
    )
  }
}