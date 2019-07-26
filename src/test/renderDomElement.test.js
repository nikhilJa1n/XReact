import { render } from '../render.js';

describe('dom rendering', function() {
  beforeEach(function(done) {
    document.getElementById('root').innerHTML = '';
    done();
  });
  it('should render div', function() {
    const element = {
      type: 'div',
      props: {},
    };
    render(element, document.getElementById('root'));
    chai
      .expect(document.getElementById('root').innerHTML)
      .to.equal('<div></div>');
  });

  it('should render dom with childrens', function() {
    const element = {
      type: 'div',
      props: {
        children: [
          { type: 'b', props: {} },
          { type: 'a', props: { href: 'try' } },
        ],
      },
    };
    render(element, document.getElementById('root'));
    chai
      .expect(document.getElementById('root').innerHTML)
      .to.equal('<div><b></b><a href="try"></a></div>');
  });

  it('should render div with props', function() {
    const element = {
      type: 'div',
      props: { id: 'try' },
    };
    render(element, document.getElementById('root'));
    chai
      .expect(document.getElementById('root').innerHTML)
      .to.equal('<div id="try"></div>');
  });

  it('should render div with text element', function() {
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
    chai
      .expect(document.getElementById('root').innerHTML)
      .to.equal('<span>try1</span>');
  });
});
