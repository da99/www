
/* This is also used for CSRF protection. */
export const X_SENT_FROM = "X_SENT_FROM";

export interface HTMLDataSet {
  data: {[key: string]: string | number}
}

export type HTMLAttrs<T extends keyof HTMLElementTagNameMap> = Partial<HTMLElementTagNameMap[T] & HTMLDataSet>;
// export type Attributes = Partial<HTMLAttributes>
// export interface Attributes {
//   htmlFor: string,
//   href: string
// }

export const SPLIT_TAG_NAME_VALID_PATTERN = /^([a-z0-9]+)([\.\#][a-z0-9\_]+)*$/
export const SPLIT_TAG_NAME_PATTERN = /([\.\#])/g

export const SPLIT_ID_CLASS_VALID_PATTERN = /^([\.\#][a-z0-9\_\-]+)+$/
export const SPLIT_ID_CLASS_PATTERN = /([\.\#])/g

import { is_dev, is_num, is_error, is_array, is_plain_object } from './IS.mts';



export function console_log(...args: unknown[]) {
  if (!is_dev())
    return null;
  return console.log.apply(console, args);
};

export function is_void_tagname(x: string) {
    switch (x) {
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'embed':
      case 'hr':
      case 'img':
      case 'input':
      case 'link':
      case 'meta':
      case 'param':
      case 'source':
      case 'track':
      case 'wbr':
        return true;
    }
    return false;
} // func

export function split_id_class(new_class: string) {
  if (new_class == '')
    return {tag_id: null, class_list: []};

  if (!new_class.match(SPLIT_ID_CLASS_VALID_PATTERN)) {
    throw new Error(`Invalid characters in id/class: ${new_class}`);
  }

  let curr = '';
  const class_list: string[] = [];
  let tag_id = undefined;
  for (const s of new_class.split(SPLIT_ID_CLASS_PATTERN) ) {
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
          class_list.push(s);
          break;
        case '#':
          tag_id = s;
          break;
      }
    }
  }

  return {tag_id, class_list};
} // func

export function e_split_id_class(e: Element, id_class: string): Element {
  let curr = '';
  for (const s of id_class.split(SPLIT_TAG_NAME_PATTERN) ) {
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
          e?.classList.add(s);
        break;
        case '#':
          e?.setAttribute('id', s);
        break;
      }
    }
  }
  return e;
} // func

export function to_var_name(val: string, delim: string) {
  return val.replace(/^[^a-zA-Z-0-9\_]+/, '').replace(/[^a-zA-Z-0-9\_]+/g, delim);
}

export function repeat(num: number, func: ((i?: number) => void)) {
  if (is_num(num))
    throw new Error(`Invalid number: ${num}`);
  for (var i = 0; i < num; i++) {
    func(i);
  }
  return true;
} // func

export function to_string(arg: unknown): string {
  if (arg === null)
    return 'null';

  if (arg === undefined)
    return 'undefined';

  if (typeof(arg) === 'function')
    return arg.toString().replace(`function (){return(`, "").replace(/\)?;\}$/, '');

  if (arg === true)
    return 'true';

  if (arg === false)
    return 'false';

  if (typeof(arg) === 'string') {
    return '"' + arg + '"';
  }

  if (is_error(arg))
    return '[Error] ' + to_string(arg.message);

  if (typeof arg === "object" ) {

    if (is_array(arg)) {
      let fin: string[] = [];
      for ( const x in arg ) {
        fin.push(to_string(x));
      }
      return "[" + fin.join(",") + "]";
    }

    if (is_plain_object(arg)) {
      let fin: string[] = [];
      for(const x in arg as Record<string, any>) {
        if (arg.hasOwnProperty(x))
          fin.push(to_string(x) + ":" + to_string(arg[x]));
      }

      let fin_str = "{" + fin.join(",") + "}";
      return fin_str;
    }
  }

  return arg.toString();
} // === string to_string




