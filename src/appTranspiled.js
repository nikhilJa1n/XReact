/* eslint-disable import/extensions */
import { Component, createElement, render } from './XReact/XReact.js';
import ChildComponent from './childComponent.js';
import Second from './secondChildComponent.js';

const TEXT_ELEMENT = 'TEXT_ELEMENT';

export default class App extends Component {
  render() {
    return  createElement('div', {}, createElement(TEXT_ELEMENT, { textValue:"Hello ", })
                    , createElement('span', {}, createElement(TEXT_ELEMENT, { textValue:this.props.author, })))  }
} 