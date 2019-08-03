/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import { renderAgain } from './render.js';

const setStateCount = 0;
export default class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
  }

  componentWillMount() {
    return undefined;
  }

  componentDidMount() {
    return undefined;
  }

  setState(newState) {
    console.log(newState);
    
    if(Object.keys(newState).sort().join(',')=== Object.keys(this.state).sort().join(',')){
      // alert('same members');
      console.log(this.state,newState)
      this.state = JSON.parse(JSON.stringify(newState));
      console.log(this.state);
      this.render();
      renderAgain();
  } else {
     Object.keys(newState).map((element) => {
      this.state[element] = newState[element]
     })
     this.render();
     renderAgain();
  }
  }

  render() {}
}
