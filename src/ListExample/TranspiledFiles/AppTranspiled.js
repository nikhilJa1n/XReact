import{createElement, Component } from '../../XReact/XReact.js';
 import Search from '../search.js'; 
 import List from '../list.js'; 
 import Add from '../addname.js'; 
  
 class App extends Component {
   constructor(props) {
     super(props)
   this.state = { 
      names: [], 
      fnames: [], 
    };
   }
   
   handleSubmit(e, search) { 
     e.preventDefault(); 
     this.setState({ 
       fnames: this.state.names.filter(name => name.search(search) === 0), 
     }); 
   }; 
   handleAdd(e, name) { 
     e.preventDefault(); 
     const names = this.state.names; 
     names.push(name); 
     this.setState({ names }); 
   }; 
   render() { 
     return createElement('div', {} , createElement(Search, { onSubmit:this.handleSubmit, } ), createElement(Add, { onAdd:this.handleAdd, } ), createElement(List, { title:'AddedNames',  names:this.state.names, } ), createElement(List, { title:'SearchedNames',  names:this.state.fnames, } ))
   } 
 } 
  
 export default App; 
  
 