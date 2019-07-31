/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import { renderAgain } from './render.js';

const setStateCount = 0;
export default class Component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
    // this.componentWillMount();
    this.render();
    setTimeout(() => {
      this.componentDidMount();
    }, 0);
    // this.componentDidMount();
  }

  componentWillMount() {}

  componentDidMount() {
    // console.log('in Component Did mount');
  }

  setState(newState) {
    console.log(newState);
    this.state = JSON.parse(JSON.stringify(newState));
    this.render();
    renderAgain();
  }

  render() {}
}
