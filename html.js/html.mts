
import { JSDOM } from 'jsdom';
import { add_to_body } from './dom.mjs';

export const page = new JSDOM(`<!DOCTYPE html><html lang="en"><head><title></title></head><body></body></html>`)
global.window = page.window;
global.document = page.window.document;

export function to_html(f: (e: typeof add_to_body) => void) {
  f(add_to_body);
  return page.serialize();
} // func

export function print_html(f: (e: typeof add_to_body) => void) {
  return console.log(to_html(f));
} // func
