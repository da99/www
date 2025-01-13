
/*
  *
  * This version of html.js is for 'build-side rendering.'
  * It is meant for builds, not server or client side rendering.
  */

import type { Attributes } from './Base.mts';

import { split_id_class, is_void_tagname } from './Base.mts';
import { is_plain_object, is_func } from './IS.mts';
import { html as html_escape } from './Escape.mts';

type BChild = string | BElement

class Page_List {
  list: Page[];

  constructor() {
    this.list = [];
  }

  new() {
    this.list.push(new Page());
  }

  current() {
    let c = this.list.at(this.list.length - 1);
    if (!c)
      throw new Error('No current page found.');
    return c;
  }

  pop() {
    return this.list.pop();
  }
} // class

class Page {
  elements: BElement[];

  constructor() { this.elements = []; }

  to_html() {
    return this.elements.map(x => x.to_html()).join('');
  }
} // class Page


class BElement {
  tagname: string;
  class_list: string[] | null;
  attrs: Attributes;
  tagid: undefined | string;
  childs: BChild[];

  constructor(tag_name: keyof HTMLElementTagNameMap, raw_id_class: string, raw_attrs: Partial<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>, eles: BChild[]) {
    const { class_list, tag_id } = split_id_class(tag_name, raw_id_class);
    this.tagname = tag_name;
    this.class_list = class_list;
    this.attrs = raw_attrs;
    if (typeof tag_id == 'string')
      this.attrs['id'] = tag_id;
    this.childs = eles;
    if (this.childs.length > 0 && is_void_tagname(this.tagname)) {
      throw `elements of ${this.tagname} may not have child elements.`;
    }
  }

  to_html() {
    let html = `<${this.tagname}`;
    const class_list = this.class_list;

    if (class_list)
      if (class_list.length > 0) {
        html += ` class="${class_list.map(x => html_escape(x)).join(' ')}"`;
      }

    for (const k in this.attrs) {
      let new_k = k;
      switch (k.toLowerCase()) {
        case 'htmlfor':
          new_k = 'for';
        break;
      }

      const attr_v = this.attrs[k as keyof Attributes];
      switch (typeof attr_v) {
        case 'string':
          html += ` ${new_k}="${html_escape(attr_v)}"`
        break;
        case 'number':
          html += ` ${new_k}="${html_escape(attr_v.toString())}"`
          break;
        default:
          throw new Error(`Unknown attribute value type to escape: ${attr_v} -> ${typeof attr_v}`)
      }
    } // for

    html += '>';

    if (is_void_tagname(this.tagname))
      return html;

    for (const c of this.childs) {
      if (typeof c === 'string')
        html += html_escape(c);
      else
        html += c.to_html();
    }

    html += `</${this.tagname}>`
    return html;
  }
} // BElement

interface HTMLDataSet {
  data: {[key: string]: string | number}
}

export type HTMLAttrs<T extends keyof HTMLElementTagNameMap> = Partial<HTMLElementTagNameMap[T] & HTMLDataSet>;

const PAGES = new Page_List();

/*
  * e('input', {name: "_something"}, "My Text")
  * e('div', e('span', "My Text"))
  * e('div', '#main', () => {
  *   e('span', "My Text"),
  *   e('div', "My Text")
  * })
*/
export function element<T extends keyof HTMLElementTagNameMap>(tag_name: T, ...pieces : (BChild | (() => void) | HTMLAttrs<T>)[]) {
  const eles: BChild[] = [];
  let attrs: HTMLAttrs<T> = {};
  let id_class: string = '';
  for (let i = 0; i < pieces.length; i++) {
    const x = pieces[i];

    if (typeof x === "string") {
      if (i == 0 && ((x as string).at(0) == '#' || (x as string).at(0) == '.')) {
        id_class = x;
        continue;
      }
      eles.push(x);
      continue;
    }

    if (is_func(x)) {
      (x as () => void)();
      continue;
    }

    if (is_plain_object(x)) {
      attrs = x as HTMLAttrs<T>;
      continue;
    }

    eles.push(x as BChild);

  }
  return new BElement(tag_name, id_class, attrs || {}, eles );
} // export function


// html5(
//   e('html', {lang: 'en'}, () -> {
//     e('head', e('title'))
//     e('body')
//   })
// )
export function html5(ele_func: (e: typeof element) => void) {
  PAGES.new();
  ele_func(element);
  const p = PAGES.pop();
  if (!p)
    return '';
  const html = p.to_html();
  return(`<!DOCTYPE html><html lang="en">${html}</html>`);
} // func

export function to_html(x: BChild) {
  if (typeof x === 'string')
    return html_escape(x);
  else
    return x.to_html();
}


// export function fragment(...eles: (string | Element)[]) {
//   let dom_fragment = document.createDocumentFragment();
//   for (const x of eles) {
//     if (typeof x === 'string')
//       dom_fragment.appendChild(document.createTextNode(x));
//     else
//       dom_fragment.appendChild(x);
//   }
//
//   return dom_fragment;
// }
//
// export function body(...eles: (string | Element)[]) {
//   document.body.append(fragment(...eles));
//   return document.body;
// }
