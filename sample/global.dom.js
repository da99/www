
// import jsdom from 'jsdom';
import { JSDOM } from 'jsdom';

export const page = new JSDOM(`<!DOCTYPE html><html lang="en"><head><title></title></head><body></body></html>`)

global.window = page.window;
global.document = page.window.document;
// console.log(page.window.document.querySelector('title').textContent)
// page.window.document.body.appendChild(page.window.document.createTextNode('This is a body.'));
console.log(page.serialize());

