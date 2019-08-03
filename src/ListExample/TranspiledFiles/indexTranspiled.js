import { createElement, render } from '../../XReact/XReact.js'; 
 import App from './AppTranspiled.js'; 
  
 const app = createElement(App, {} )
 render(app, document.getElementById('root')); 
  
 