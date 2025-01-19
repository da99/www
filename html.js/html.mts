

import type { HTMLAttrs } from './dom.mts';
import { split_id_class, is_void_tagname } from './dom.mts';
import { html as html_escape } from './Escape.mts';

// html5(
//   e('html', {lang: 'en'}, () -> {
//     e('head', e('title'))
//     e('body')
//   })
// )
export function html5(f: (e: typeof element_str) => void) {
  console.log('<!DOCTYPE html><html lang="en">');
  f(element_str)
  console.log('</html>');
} // func

export function element_str<T extends keyof HTMLElementTagNameMap>(tag_name: T, ...body: (string | HTMLAttrs<T> | ((f: typeof element_str) => void))[]) {
  process.stdout.write(`<${tag_name}`);
  let is_closed = false;
  const is_void = is_void_tagname(tag_name);

  for (const v of body) {
    switch (typeof v) {
      case 'string':
        if (!is_closed) {
          is_closed = true;
          process.stdout.write(`>`);
        }
        process.stdout.write(html_escape(v));
        break;
      case 'object':
        throw new Error('implement this')
        break;
      case 'function':
        if (is_void)
          throw new Error(`No body allowed for: ${tag_name}`);
        is_closed = true;
        process.stdout.write(`>`);
        v(element_str);
        break;
    }
  } // for

  if (!is_closed)
    process.stdout.write(`>`);
  if (!is_void)
    process.stdout.write(`</${tag_name}>`);
} // export function
