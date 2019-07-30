/* eslint-disable import/extensions */
import { Component, createElement } from './XReact/XReact.js';
import First from './firstChildComponent.js';
import Second from './secondChildComponent.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  handleClick() {
    this.setState({ counter: this.state.counter + 1 });
  }

  render() {
    return createElement(
      'div',
      {},
      createElement('h1', {}, this.props.title),
      createElement(
        'ul',
        {},
        createElement('li', {}, this.props.author1),
        createElement('li', {}, this.props.author2),
        createElement('li', {}, this.props.author3),
        createElement('li', {}, this.state.counter),
        createElement(First, { handleAlertClick: this.props.onClick }, null),
        createElement(Second, { handleAddClick: this.handleClick.bind(this) }, null),
      ),
      createElement(
        'span',
        {},
        'Procedure to run XReact',
        createElement(
          'ul',
          {},
          createElement(
            'li',
            {},
            "We're running the render function on our custom string Components.",
          ),
          createElement(
            'li',
            {},
            "The App Component's render function returns the XReact element.",
          ),
          createElement(
            'li',
            {},
            "We're using createElement function for creating our Xreact Object element.",
          ),
        ),
      ),
    );
  }
}
