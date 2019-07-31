import { render } from '../src/XReact/XReact.js';

describe('dom rendering', () => {
  beforeEach((done) => {
    document.getElementById('root').innerHTML = '';
    console.log('here in before each');
    done();
  });
  it('should render div', () => {
    const element = {
      type: 'div',
      props: {},
    };
    render(element, document.getElementById('root'));
    chai.expect(document.getElementById('root').innerHTML).to.equal('<div></div>');
  });

  it('should render dom with childrens', () => {
    const element = {
      type: 'div',
      props: {
        children: [{ type: 'b', props: {} }, { type: 'a', props: { href: 'try' } }],
      },
    };

    render(element, document.getElementById('root'));
    chai
      .expect(document.getElementById('root').innerHTML)
      .to.equal('<div><b></b><a href="try"></a></div>');
  });

  it('should render div with props', () => {
    const element = {
      type: 'div',
      props: { id: 'try' },
    };
    render(element, document.getElementById('root'));
    chai.expect(document.getElementById('root').innerHTML).to.equal('<div id="try"></div>');
  });

  it('should render div with text element', () => {
    const element = {
      type: 'span',
      props: {
        children: [
          {
            type: 'TEXT_ELEMENT',
            props: { textValue: 'try1' },
          },
        ],
      },
    };
    render(element, document.getElementById('root'));
    // console.log(doument.getElementById('root').innerHTML, 'last test');
    chai.expect(document.getElementById('root').innerHTML).to.equal('<span>try1</span>');
  });
});
Guys, demos will be at 3:30 Today.
￼