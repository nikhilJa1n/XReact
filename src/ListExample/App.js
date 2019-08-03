import React, { Component } from 'react';
import Search from './search';
import List from './list';
import Add from './addname';

class App extends Component {
  state = {
    names: [],
    fnames: [],
  };
  handleSubmit = (e, search) => {
    e.preventDefault();
    this.setState({
      fnames: this.state.names.filter(name => name.search(search) === 0),
    });
  };
  handleAdd = (e, name) => {
    e.preventDefault();
    const names = this.state.names;
    names.push(name);
    this.setState({ names });
  };
  render() {
    return JSX(
      <div >
        <Search onSubmit = this.handleSubmit > </Search>
        <Add onAdd = this.handleAdd > </Add>
        <List title = 'AddedNames' names = this.state.names > </List>
        <List title = 'SearchedNames' names = this.state.fnames > </List>
      </div>
    );
  }
}

export default App;
