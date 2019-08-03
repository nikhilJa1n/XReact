/* eslint-disable import/extensions */
import { Component, createElement, render } from '../XReact/XReact.js';
import ChildComponent from './childComponentTranspiled.js';

const TEXT_ELEMENT = 'TEXT_ELEMENT';

export default class App extends Component {
constructor(props){
  super(props);
  this.state={
    counter:0,
  }
  this.handleClick=this.handleClick.bind(this);
}
  componentDidMount() {
    this.setState({
      counter:1000,
    })
  }
  
  handleClick() {
    this.setState({counter:this.state.counter+1,})
  }
  render() {
    return  createElement('div', {}, createElement('ul', {}, createElement('li', {}, createElement(TEXT_ELEMENT, { textValue:this.state.counter, })))
                    , createElement(ChildComponent, { buttonClick:this.handleClick, }))  }
}
 