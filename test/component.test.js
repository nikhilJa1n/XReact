import XReact from '../src/XReact/XReact.js';
import Component from '../src/XReact/component.js';
import createElement from '../src/XReact/createElement.js';

export class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return createElement('div', {}, createElement('p', {}, 'paraTry'));
  }
}

describe('component render', () => {
  it('should render the components', async () => {
    const app = XReact.createElement(
      App,
      {
        title: 'XReact',
        author1: 'Karan Arora',
        author2: 'Lokpati Mishra',
        author3: 'Nikhil Jain',
        onClick: () => alert('This is an onclick alert'),
      },
      null,
    );

    XReact.render(app, document.getElementById('root'));
    setTimeout(() => {
      chai.expect(document.getElementById('root').innerHTML).to.equal('<div><p>paraTry</p></div>');
    }, 500);
    // XReact.render(app.render(), document.getElementById("root"));

    console.log(document.getElementById('root').innerHTML);
  });
});
