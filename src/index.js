/* eslint-disable no-alert */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/extensions */
import XReact from './XReact/XReact.js';
import App from './app.js';

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
