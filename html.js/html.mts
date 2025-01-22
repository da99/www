
import { JSDOM } from 'jsdom';
import { body_append } from './dom.mjs';

export const page = new JSDOM(`<!DOCTYPE html><html lang="en"><head><title></title></head><body></body></html>`)
global.window = page.window;
global.document = page.window.document;

export function to_html(f: (e: typeof body_append) => void) {
  f(body_append);
  return page.serialize();
} // func

export function print_html(f: (e: typeof body_append) => void) {
  return console.log(to_html(f));
} // func
