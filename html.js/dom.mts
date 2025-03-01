// export type Attributes = Partial<HTMLAttributes>
// export interface Attributes {
//   htmlFor: string,
//   href: string
// }

import type { Request_Origin, Response_Origin } from './types.mts';
import type { Attrs, ElementTagNameMap } from './types.mts';

import { CSS_States } from './types.mts';
import { is_plain_object } from './IS.mts';
import { log, warn } from './log.mts';

/* This is also used for CSRF protection. */
export const X_SENT_FROM = "X_SENT_FROM";

export interface Fields_State {
  [index: string]: string
}
export const SPLIT_ID_CLASS_VALID_PATTERN = /^([\.\#][a-z0-9\_\-]+)+$/

export const VALID_RELATIVE_URL = /^\/[a-zA-Z0-9\.\-\/]+(#[a-z0-9\_\-]+)?$/i
export const VALID_TEMPLATE_URL = /^\{[A-Z\_0-9]+\}$/

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
  if (!new_class.match(SPLIT_ID_CLASS_VALID_PATTERN)) {
    throw new Error(`Invalid characters in id/class: ${new_class}`);
  }

  const classes: string[] = [];
  let id = undefined;

  for (const s of new_class.split('.') ) {
    if (s === '')
      continue;
    if (s.indexOf('#') === 0) {
      id = s.replace('#', '');
      continue;
    }
    classes.push(s);
  } // for

  return {id, classes};
} // func

export function title(str: string) {
  const t = document.querySelector('title');
  if (!t)
    throw new Error('title element not found.');
  t.appendChild(document.createTextNode(str));
  return t;
}

export function meta(attrs: Attrs<'meta'>) {
  const h = document.querySelector('head');
  if (h) {
    h.appendChild(element('meta', attrs));
  }
  return h;
}

export function link(attrs: Attrs<'link'>) {
  const h = document.querySelector('head');
  if (h) {
    h.appendChild(element('link', attrs));
  }
  return h;
}

type ElementBody = ((f: typeof element) => Element | void);

// export function body_append<T extends keyof ElementTagNameMap>(tag_name: T, ...args: (string | Attrs<T> | ElementBody)[]): Element {
export function body_append(f: ((x: Element_Function) => void)): DocumentFragment {
  const frag = fragment(f);
  document.body.appendChild(frag);
  return frag;
} // function

export type Element_Function = <T extends keyof ElementTagNameMap>(tag_name: T, ...args: (string | Attrs<T> | Function)[]) => Element;

export function fragment(f: ((x: Element_Function) => void)): DocumentFragment {
  let dom_fragment = document.createDocumentFragment();

  let childs: (DocumentFragment | Element)[] = [];
  childs.push(dom_fragment);

  const ele_func = function <T extends keyof ElementTagNameMap>(tag_name: T, ...args: (string | Attrs<T> | Function)[]): Element {
    const new_e = document.createElement(tag_name)
    const prev_e = childs.at(-1);
    if (prev_e)
      prev_e.appendChild(new_e)
    childs.push(new_e)
    finish_element(new_e, ...args);
    childs.pop();
    return new_e;
  }

  f(ele_func);

  return dom_fragment;
} // function

function finish_element<T extends keyof ElementTagNameMap>(e: Element, ...args: (string | Attrs<T> | Function)[]): Element {
  let i = -1;
  const last_i = args.length - 1;
  for (const v of args){
    i++;

    if (typeof v === 'string') {
      const is_id_class = i === 0 && (v.at(0) === '#' || v.at(0) === '.');

      if (is_id_class) {
        const {id, classes} = split_id_class(v);
        if(id)
          e.setAttribute('id', id);
        for (const x of classes)
          e.classList.add(x)
        continue;
      }

      if (last_i == i) {
        e.appendChild(document.createTextNode(v));
        continue;
      }

      throw new Error(`Invalid string: ${v} i:${i}`);
    } // if string

    if (is_plain_object(v)) {
      __set_attrs(e, v);
      continue;
    }

    if (typeof v === 'function') {
      (v as Function)();
    }
  } // if string

  return e;
} // export function

/*
  * e('input', {name: "_something"}, "My Text")
  * e('a', '.red#ID', {href: "https://some.url"}, "My Text")
  * e('div', e('span', "My Text"))
  * e('div', '#main', (e) => {
      e('span', "My Text")
    })
  * e('div', '#main',
  *   e('span', "My Text"),
  *   e('div', "My Text")
  * )
*/
export function element<T extends keyof ElementTagNameMap>(tag_name: T, ...args: (string | Attrs<T> | ElementBody)[]): Element {
  const e = document.createElement(tag_name)

  let i = -1;
  const last_i = args.length - 1;
  for (const v of args){
    i++;

    if (typeof v === 'string') {
      const is_id_class = i === 0 && (v.at(0) === '#' || v.at(0) === '.');

      if (is_id_class) {
        const {id, classes} = split_id_class(v);
        if(id)
          e.setAttribute('id', id);
        for (const x of classes)
          e.classList.add(x)
        continue;
      }

      if (last_i == i) {
        e.appendChild(document.createTextNode(v));
        continue;
      }

      throw new Error(`Invalid string: ${v} i:${i}`);
    } // if string

    if (is_plain_object(v)) {
      __set_attrs(e, v);
      continue;
    }

    if (typeof v === 'function') {
      function ele_func<T extends keyof ElementTagNameMap>(tag_name: T, ...args: (string | Attrs<T> | ElementBody)[]) {
        return e.appendChild(element(tag_name, ...args));
      };
      (v as Function)(ele_func);
    }
  } // if string

  return e;
} // export function

function __set_attrs(ele: Element, attrs: any) {
  for (const k in attrs) {
    switch (k) {
      case 'htmlFor':
      case 'htmlfor':
        ele.setAttribute('for', attrs[k]);
        break;
      case 'href':
        const new_url = (attrs as ElementTagNameMap['a'])[k];
        const first_char = new_url.at(0)
        switch (first_char) {
          case '/':
            if (VALID_RELATIVE_URL.test(new_url))
              ele.setAttribute(k, new_url);
            else
              throw new Error(`Invalid relative url: ${new_url}`)
            break;
          case '{':
            if (VALID_TEMPLATE_URL.test(new_url))
              ele.setAttribute(k, new_url);
            else
              throw new Error(`Invalid template url: ${new_url}`)
            break;
          default:
            try {
              ele.setAttribute(k, (new URL(new_url)).toString());
            } catch (e) {
              warn(`Invalid url: ${new_url}`)
            }
        } // switch
        break;
      default:
        ele.setAttribute(k, attrs[k]);

    } // switch
  }
  return ele;
}


export const dom = {

  id: {
    __plus_one(): number {
      let current_id_count =  document.body.getAttribute('data-id-count') || "-1";
      const new_id = parseInt(current_id_count) + 1;
      document.body.setAttribute('data-id-count', new_id.toString());
      return new_id;
    },

    // Gets id attribute of element.
    // Creates an id if it is missing.
    upsert(e: Element): string {
      const id = e.getAttribute('id');
      if (id)
        return id;
      const new_id = `${e.tagName}_${dom.id.__plus_one()}`
      e.setAttribute('id', new_id);
      return new_id;
    }
  },

  do(f: (e: Element) => void, ...args: Array<string | Element>) {
    const a_max = args.length;
    for (let a_i = 0; a_i < a_max; a_i++) {
      const x = args[a_i];

      if (typeof x === 'string') {
        document.querySelectorAll(x).forEach(f);
        continue;
      }

      f(x);
    }
  },

  to_element(x: string | HTMLElement): HTMLElement | null {
    if (typeof x === 'string')
      return document.getElementById(x);
    return x;
  },

  fetch(x: string | HTMLElement, data?: { [index: string]: any }) {
    const e = dom.to_element(x);
    if (!e)
      return false;

    const dom_id = dom.id.upsert(e);

    const action = (e.dataset['action'] || '').trim();
    if (action.length < 2)
      throw new Error(`No action/url found on ${dom_id}`);

    const full_action = page.full_url(action);
    const method = (e.dataset['method'] || 'POST').toUpperCase();

    http.fetch(dom_id, full_action, method as 'GET' | 'POST', data)
  },

}; // export dom


export const template = {
  MATCH: /^\{([a-zA-Z0-9\.\-\_]+)\}$/ ,

  update: {
    _dataset_key(e: HTMLElement, data: { [index: string]: string | number }) {
      const key = e.dataset['key'];
      if (!key)
        return false;
      const value = data[key];
      if (!value) {
        log(`--- Data value for, ${key}, in template, ${e.id}, not found: ${key} in ..`)
        log(data);
        return e;
      }
      e.textContent = value.toLocaleString();
      return e;
    },

    by_keys(dom_id: string, data: { [index: string]: string | number }) {
      return document.querySelectorAll(`#${dom_id} [data-key]`).forEach(x => template.update._dataset_key(x as HTMLElement, data));
    },
  },

  compile(df : HTMLTemplateElement, values: { [key: string]: any}) {
    const doc = df.content.cloneNode(true);
    const nodes = document.createNodeIterator(doc, NodeFilter.SHOW_ELEMENT);

    let n;
    while (n = nodes.nextNode()) {
      const e = n as HTMLElement;
      if (e.hasAttributes()) {
        for (const a of e.attributes) {
          const m = a.value.match(template.MATCH);
          if (!m)
            continue;
          a.value = values[m[1]].toLocaleString();
        }
      }

      if (e.childNodes.length == 1 && e.childNodes[0].nodeType === Node.TEXT_NODE) {
        const match = e.innerHTML.match(template.MATCH)
        if (!match)
          continue;
        const val = values[match[1]];
        if (!val)
          continue;
        e.textContent = val.toLocaleString();
      }

      const e_parent = e.parentNode;
      if (e.tagName.toUpperCase() === 'TEMPLATE') {
        const e_id = e.dataset['id'];
        const target = ((e_id) ? (document.getElementById(e_id) || e) : e) as HTMLTemplateElement;
        const loop = e.dataset['loop'];
        if (loop) {
          const vals = values[loop];

          if (!vals)
            continue;
          for (const x of vals) {
            const sub_tmpl = template.compile(target, x);
            if (sub_tmpl && e_parent) {
              e_parent.insertBefore(sub_tmpl, e);
            }
          }
        } // if loop

          const key = e.dataset['key'];
          if (key) {
            const val = values[key];
            if (!val)
              continue;

            const sub_tmpl = template.compile(target, val);
            if (sub_tmpl && e_parent) {
              e_parent.insertBefore(sub_tmpl, e);
            }
          }

          e.remove();
      } // if TEMPLATE
    } // while
      return doc;
  } // compile
}; // const template

export const css = {
  by_selector: {
    do(f: (e: Element) => void, selector: string) {
      document.querySelectorAll(selector).forEach(f)
      return selector;
    },

    hide(s: string) { css.by_selector.do(css.by_element.hide, s); },
    unhide(s: string) { css.by_selector.do(css.by_element.unhide, s); },

    reset_to(new_class: typeof CSS_States[number], selector: string) {
      css.by_selector.reset(selector);
      css.by_selector.do((e) => e.classList.add(new_class), selector);
    },

    reset(selector: string) {
      css.by_selector.do(css.by_element.reset, selector);
    }
  },

  by_id: {
    do(f: (e: Element) => void, id: string) {
      const e = document.getElementById(id);
      if (e)
        f(e);
      return id;
    },
    hide(id: string) { css.by_id.do(css.by_element.hide, id); },
    unhide(id: string) { css.by_id.do(css.by_element.unhide, id); },
    reset(id: string) { css.by_id.do(css.by_element.reset, id); },
    reset_to(new_class: typeof CSS_States[number], id: string) {
      css.by_id.reset(id);
      css.by_id.do((e) => e.classList.add(new_class), id);
    }
  },

  by_element: {
    hide(e: Element) { e.classList.add('hide'); },
    unhide(e: Element) { e.classList.remove('hide'); },
    reset(e: Element) {
      for (const s of CSS_States)
        e.classList.remove(s);
    },
    reset_to(new_class: typeof CSS_States[number], e: Element) {
      css.by_element.reset(e);
      e.classList.add(new_class);
    }
  }

}; // export const

export const use = {
  default_forms() {
    return document.body.addEventListener('click', form.on_click_button);
  } // export function
};

export const form = {

  invalid_fields(form: HTMLFormElement, fields: { [index: string]: string }) {
    for (const k in fields) {
      const target = form.querySelector(`label[for='${k}'], input[name='${k}']`);
      const fieldset = (target && target.closest('fieldset')) || form.querySelector(`fieldset.${k}`);
      if (fieldset)
        fieldset.classList.add('invalid');
    }
    return form;
  },

  data(f: HTMLFormElement) {
    const raw_data = new FormData(f);
    const data: any = {};
    for (let [k,v] of raw_data.entries()) {
      if (data.hasOwnProperty(k)) {
        if(!Array.isArray(data[k]))
          data[k] = [data[k]];
        data[k].push(v);
      } else
        data[k] = v;
    }
    return data;
  }, // export function

  on_click_button(ev: MouseEvent) {
    const ele =  ev.target && (ev.target as Element).tagName && (ev.target as Element);

    if (!ele)
      return false;

    if (ele.tagName !== 'BUTTON')
      return false;

    const button = ele as HTMLButtonElement;

    const form = button.closest('form');
    if (!form) {
      warn('Form not found for: ' + button.tagName);
      return false;
    }

    ev.preventDefault();
    ev.stopPropagation();

    dom.id.upsert(form);

    if (button.classList.contains('submit'))
      return dispatch.form.submit(form);

    if (button.classList.contains('reset'))
      return dispatch.form.reset(form);

    if (button.classList.contains('cancel'))
      return dispatch.form.cancel(form);

    warn(`Unknown action for form: ${form.id}`);
    return false;
  }, // === function

  event_allow_only_numbers(event: Event) {
        const ev = event as KeyboardEvent;
        switch (ev.key) {
          case '0':
            case '1': case '2': case '3': case '4': case '5':
            case '6': case '7': case '8': case '9':
            true;
          break;
          default:
            ev.stopPropagation();
          ev.preventDefault();
        }
        // do something
  },

  input_only_numbers(selector: string) {
    return document.querySelectorAll(selector).forEach(
      e => e.addEventListener('keydown', form.event_allow_only_numbers)
    );
  } // === function
}; // export const


export const page = {
  full_url(x: string): string {
    const url = new URL(location.toString());
    url.pathname = x;
    return url.toString();
  },

  go_to(raw: string) {
    window.location.href = page.full_url(raw);
  },

  reload(seconds?: number) {
    if (typeof seconds !== 'number')
      return window.location.reload();

    if (seconds < 0)
      throw new Error(`!!! Invalid value for reload_in: ${seconds}`);

    setTimeout(page.reload, seconds * 1000);
    return;
  }
};


export const dispatch = {

  form: {
    submit(e: HTMLFormElement) {
      const action_url = e.getAttribute('action') || '';
      const form_id = dom.id.upsert(e);

      const data = form.data(e);
      document.body.dispatchEvent(new CustomEvent('* submit', {detail: data}));
      document.body.dispatchEvent(new CustomEvent(`${e.id} submit`, {detail: data}));

      if (action_url.indexOf('/') < 0) // then, no fetch needed.
        return true;

      return http.fetch(form_id, e.getAttribute('action'), 'POST', form.data(e));
    },

    cancel(e: HTMLFormElement) {
      const data = form.data(e);
      document.body.dispatchEvent(new CustomEvent('* cancel', {detail: data}));
      document.body.dispatchEvent(new CustomEvent(`${e.id} cancel`, {detail: data}));
      return true;
    },

    reset(e: HTMLFormElement) {
      const data = form.data(e);
      document.body.dispatchEvent(new CustomEvent('* reset', {detail: data}));
      document.body.dispatchEvent(new CustomEvent(`${e.id} reset`, {detail: data}));
      return true;
    }
  },

  request(req: Request_Origin) {
    document.body.dispatchEvent(new CustomEvent('* request', {detail: req}));
    document.body.dispatchEvent(new CustomEvent(`${req.dom_id} request`, {detail: req}));
  },

  async response(req: Request_Origin, raw_resp: Response) {
    if (!raw_resp.ok)
      return dispatch.server_error(req, raw_resp);

    const resp: Response_Origin = (await raw_resp.json()) as Response_Origin;

    const x_sent_from = raw_resp.headers.get('X_SENT_FROM');

    if (!x_sent_from) {
      warn(`X_SENT_FROM key not found in headers: ${Array.from(raw_resp.headers.keys()).join(', ')}`);
      return resp;
    }

    if(x_sent_from !== req.dom_id) {
      warn(`X_SENT_FROM and dom id origin do not match: ${x_sent_from} !== ${req.dom_id}`);
      return resp;
    }

    const e = document.getElementById(req.dom_id);

    const detail = {detail: {response: resp, request: req}};

    document.body.dispatchEvent(new CustomEvent('* response', detail));
    document.body.dispatchEvent(new CustomEvent(`${req.dom_id} response`, detail));

    if (e)
      css.by_id.reset(req.dom_id);

    return dispatch.status(resp, req);
  },

  status(resp: Response_Origin, req: Request_Origin) {
    const status = resp.status;
    const detail = {detail: {response: resp, request: req}};
    css.by_id.reset_to(status, req.dom_id);
    document.body.dispatchEvent(new CustomEvent(`* ${status}`, detail));
    document.body.dispatchEvent(new CustomEvent(`${req.dom_id} ${status}`, detail));
  },

  server_error(req: Request_Origin, raw_resp: Response) {
    warn(`!!! Server Error: ${raw_resp.status} - ${raw_resp.statusText}`);

    const e = document.getElementById(req.dom_id);
    if (e) {
      css.by_element.reset_to('server_error', e);
      const detail = {detail: {request: req, response: raw_resp}};
      document.body.dispatchEvent(new CustomEvent('* server_error', detail));
      document.body.dispatchEvent(new CustomEvent(`${e.id} server_error`, detail));
      return true;
    }
    return false;
  },

  network_error(error: any, request: Request_Origin) {
    warn(error);
    warn(`!!! Network error: ${error.message}`);
    const detail = {detail: {error, request}};
    document.body.dispatchEvent(new CustomEvent('* network_error', detail));
    document.body.dispatchEvent(new CustomEvent(`${request.dom_id} network_error`, detail));

    const e = document.getElementById(request.dom_id);
    if (e) {
      css.by_element.reset_to('network_error', e);
      return true;
    }

    return false;
  } // === function
}; // export dispatch

export const http = {
  fetch(dom_id: string, raw_action: | null | string, method: 'POST' | 'GET', data?: { [index:string]: any}) {

    const action = (raw_action || '').trim();

    if (action.length < 2)
      throw new Error(`action attribute not set for ${dom_id}`);

    const fetch_data: RequestInit = {
      method,
      referrerPolicy: "no-referrer",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        X_SENT_FROM: dom_id
      },
      body: JSON.stringify(data || {})
    };

    const request: Request_Origin = {
      request: fetch_data,
      dom_id: dom_id,
      do_request: true
    };

    dispatch.request(request);

    if (!request.do_request)
      return false;

    const full_action = page.full_url(action);

    css.by_id.reset_to('loading', dom_id);

    setTimeout(async () => {
      fetch(full_action, fetch_data)
      .then((resp: Response) => dispatch.response(request, resp))
      .catch((err: any) => dispatch.network_error(err, request));
    }, 450);

    return true;
  }
}; // export const



