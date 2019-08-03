/* eslint-disable import/extensions */
import { Component, createElement, render } from './XReact/XReact.js';
import First from './firstChildComponent.js';
import Second from './secondChildComponent.js';

const TEXT_ELEMENT = 'TEXT_ELEMENT';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      addedItems: [],
      searchedItems: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInc = this.handleInc.bind(this);
    this.handleDec = this.handleDec.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount(){
    this.setState({
      counter:678,
    })
  }

  handleClick() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }

  handleAlertClick() {
    alert('This onClick passed using props');
  }

  handleChange(event) {
    console.log(event.target);
    this.setState({
      counter: this.state.counter,
      addedItems: this.state.addedItems.push(event.target.value),
      searchedItems: this.state.searchedItems,
    });
  }

  handleSearch(e) {
    const items = this.state.addedItems.filter(
      element => element.search(e.target.value) === 0,
    );

    this.setState({
      searchedItems: this.state.addedItems.filter(
        element => element.search(e.target.value) === 0,
      ),
    });
  }

  handleInc() {
    this.setState({
      counter:this.state.counter+1,
    })
  }

  handleDec() {
    this.setState({
      counter:this.state.counter-1,
    })
  }
  handleReset() {
    this.setState({
      counter:0,
    })
  }
  render() {
    const addedItems = [];
    if (this.state.addedItems !== undefined) {
      this.state.addedItems.map(element => {
        addedItems.push(element);
      });
    }

    const searchedItems = [];
    if (this.state.searchedItems !== undefined) {
      this.state.searchedItems.map(element => {
        searchedItems.push(element);
      });
    }

    return JSX(
      <div>
        <h1>{this.props.title}</h1>
        {this.state.counter}<br />
        <button onClick={this.handleInc}>Increment</button>
        <Second decreaseClick={this.handleDec} />
        <button onClick={this.handleReset}>Reset</button>
        <br />
        <First addChange={e => this.handleChange(e)} /><br />
        <input onChange={e => this.handleSearch(e)} placeholder='search' />
        <h2>Add Names</h2>
        <ul>{addedItems}</ul>
        <h2>Searched Names</h2>
        <ul>{searchedItems}</ul>
      </div>
    );
  }
}