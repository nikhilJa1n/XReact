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
      addedItems:[],
      searchedItems:[],
    };
    this.handleChange = this.handleChange.bind(this)
  const globe =this;

  }

  handleClick() {
    this.setState({ 
      counter: this.state.counter + 1,
    });
  }

  handleAlertClick() {
    alert('This onClick passed using props')
  }

  handleChange(e) {
    // const ele = document.getElementById('name');
    console.log(e.target.value)
    this.setState({
      counter: this.state.counter,
      addedItems: this.state.addedItems.push(e.target.value),
      searchedItems:this.state.searchedItems,
    })
    console.log();
  }

  handleSearch(e) {
    // const ele = document.getElementById('name');
    console.log(e.target.value)
    const items = this.state.addedItems.filter((element)=>element.search(e.target.value)===0);
    console.log(items);
    
    this.setState({
      searchedItems:this.state.addedItems.filter((element)=>element.search(e.target.value)===0),
    })
    console.log();
  }

  render() {
    console.log(this.state);
    const addedItems = []
    if(this.state.addedItems!== undefined) {
    this.state.addedItems.map((element)=>{
      addedItems.push(createElement('li',{},element))
    })}

    const searchedItems = []
    if(this.state.searchedItems!== undefined) {
    this.state.searchedItems.map((element)=>{
      searchedItems.push(createElement('li',{},element))
    })}

    return createElement(
      'div',
      {},
      createElement('h1', {}, this.props.title),
      createElement('input',{id:'name', onChange:(e)=>{ this.handleChange(e) }},),
      createElement('input',{id:'search', onChange:(e)=>{ this.handleSearch(e) }},),
      createElement('h3', {}, 'Added items'),
      createElement(
        'ul',
        {},
        addedItems,
      ),
      createElement('h3', {}, 'Searched items'),
      createElement(
        'ul',
        {},
        searchedItems,
      ),
    );
  }
}


JSX(
  <div>
    <h1>{this.props.title}</h1>
    <First addChange={(e)=>this.handleChange(e)} />
    <input onChange={(e)=>this.handleSearch(e)}></input>
    <h2>Add Names</h2>
    <ul>
      {addedItems}
    </ul>
    <h2>Searched Names</h2>
    <ul>
      {searchedItems}
    </ul>  
  </div>
)