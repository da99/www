
/*
  *
  * This version of html.js is for 'build-side rendering.'
  * It is meant for builds, not server or client side rendering.
  */

import lodash from 'lodash';
import type { Attributes } from './types.mts';
// import sanitizeHtml from 'sanitize-html';

import {
  SPLIT_TAG_NAME,
  is_plain_object,
  is_void_tagname
} from './types.mts';

type BChild = string | BElement

class HTML5_DOCTYPE {
  constructor() {

  }
  to_html() {
    return `<!DOCTYPE html>`;
  }
}

class BElement {
  tagname: string;
  classList: string[];
  attrs: Attributes;
  tagid: undefined | string;
  childs: BChild[];

  constructor(raw_name: string, raw_attrs: Attributes, eles: BChild[]) {
    const { tagname, classList, tagid } = split_tag_name(raw_name);
    this.tagname = tagname;
    this.classList = classList;
    this.attrs = raw_attrs;
    if (typeof tagid == 'string')
      this.attrs['id'] = tagid as string;
    this.childs = eles;
    if (this.childs.length > 0 && is_void_tagname(this.tagname)) {
      throw `elements of ${this.tagname} may not have child elements.`;
    }
  }

  to_html() {
    let html = `<${this.tagname}`;
    //` id=${this.tagid} class=${this.classList.join(' ')}`;
    if (this.classList.length > 0) {
      html += ` class="${this.classList.join(' ')}"`;
    }
    for (const k in this.attrs) {
      html += ` ${k}="${this.attrs[k as keyof Attributes]}"`
    } // for
    html += '>';

    if (is_void_tagname(this.tagname))
      return html;

    for (const c of this.childs) {
      if (typeof c === 'string')
        html += lodash.escape(c);
      else
        html += c.to_html();
    }

    html += `</${this.tagname}>`
    return html;
  }
} // BElement

/*
  * e('input', {name: "_something"}, "My Text")
  * e('a.red#ID', {href: "https://some.url"}, "My Text")
  * e('div', e('span', "My Text"))
  * e('div#main', e('span', "My Text"))
  * e('div#main',
  *   e('span', "My Text"),
  *   e('div', "My Text")
  * )
*/
export function element(tag_name: string, ...pieces : (BChild | Attributes)[]) {
  const eles: BChild[] = [];
  let attrs = undefined;
  pieces.forEach((x, _i) => {
    if (typeof x === "string")
      return eles.push(x);
    if (is_plain_object(x))
      return attrs = x;
    eles.push(x as BElement);
  });
  return new BElement(tag_name, attrs || {}, eles );
} // export function


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
//
export function split_tag_name(new_class: string) {
  let curr = '';
  let tagname = 'unknown';
  const classList: string[] = [];
  let tagid = undefined;
  for (const s of new_class.split(SPLIT_TAG_NAME) ) {
    switch (s) {
      case '.':
      case '#':
        curr = s;
        break;
      case '':
        // ignore
        break;
      default:
        switch (curr) {
        case '.':
          classList.push(s);
          break;
        case '#':
          tagid = s;
          break;
        default:
          tagname = s;
      }
    }
  }

  if (tagname == 'unknown')
    throw `Invalid syntax for element creation: ${new_class}`;
  return {tagname, classList, tagid};
} // func

// html5(
//   e('html', {lang: 'en'},
//     e('head',
//       e('title')
//     ),
//     e('body', )
//   )
// )
export function html5(...eles: BChild[]) {
    return `<!DOCTYPE html>\n${eles.map(e => to_html(e)).join('')}`;
} // func

export function to_html(x: BChild) {
  if (typeof x === 'string')
    return lodash.escape(x);
  else
    return x.to_html();
}

//
// function set_attrs(ele: Element, attrs: Attributes) {
//   for (const k in attrs) {
//     switch (k) {
//       case 'htmlFor':
//         ele.setAttribute('for', attrs[k]);
//         break;
//       case 'href':
//         try {
//           ele.setAttribute(k, (new URL(attrs['href'])).toString());
//         } catch (e) {
//           console.warn("Invalid url.")
//         }
//         break;
//       default:
//         ele.setAttribute(k, attrs[k]);
//
//     } // switch
//   }
//   return ele;
// }

