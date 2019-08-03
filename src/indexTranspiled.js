/* eslint-disable no-alert */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/extensions */
import { createElement, render } from './XReact/XReact.js';
import App from './appTranspiled.js';

const app =  createElement(App, { title:'XReact',  author:'karan', })

render(app, document.getElementById('root')); 