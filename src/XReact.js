import createElement from './createElement.js';
import render from './render.js';
const element = createElement('div', {}, createElement('p', {}, 'paraTry'));

export default {
  render,
};
// render(element, document.getElementById('root'));
