import XReact from '../src/XReact.js';
import Component from '../src/component.js';
import { createElement } from '../src/createElement.js';

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
    // const app = new App();
    // console.log(app.render());
    XReact.render('<App />', document.getElementById('root'));
    setTimeout(() => {
      chai
        .expect(document.getElementById('root').innerHTML)
        .to.equal('<div><p>paraTry</p></div>');
    }, 500);
    // XReact.render(app.render(), document.getElementById("root"));

    console.log(document.getElementById('root').innerHTML);
  });
});
