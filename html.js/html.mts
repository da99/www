
import { JSDOM } from 'jsdom';
import { fragment } from './dom.mjs';

export const page = new JSDOM(`<!DOCTYPE html><html lang="en"><head><title></title></head><body></body></html>`)
global.window = page.window;
global.document = page.window.document;

export function to_html(f: any) {
  const new_fragment = f(fragment);
  document.body.appendChild(new_fragment)
  return page.serialize();
} // func

export function print_html(f: any) {
  return console.log(to_html(f));
} // func
