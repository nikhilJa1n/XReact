import { createElement, render } from '../XReact/XReact.js';
import App from './appTranspiled.js';

const app =  createElement(App, { title:'XReact', })
render(app, document.getElementById('root')); 