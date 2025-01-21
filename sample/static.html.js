

import { page } from './global.dom.js';
import { element } from '../html.js/dom.mts';

document.body.appendChild(element('p', 'Hello, DOM.'))

console.log(page.window.document.querySelector('html').attributes['lang'].value = 'es')
console.log(page.serialize())
// console.log(page.window.document.querySelector('title').textContent)
// page.window.document.body.appendChild(page.window.document.createTextNode('This is a body.'));
// console.log(page.serialize());
