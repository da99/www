
// type Attributes = Partial<HTMLElement | HTMLAnchorElement | HTMLInputElement | HTMLLabelElement>;
// import type { Attributes } from './base.mts';
export const Request_States = ['request', 'network_error', 'server_error', 'response', 'ok', 'invalid', 'loading'];
export type Custom_Event_Name = 'request' | 'network_error' | 'server_error' | 'response' | 'ok' | 'invalid' | 'loading'
export interface Custom_Event_Detail<T> extends Event {
  detail: T
}

export interface Network_Error_Origin {
  error: any,
  request: Request_Origin
}

export interface Request_Origin {
  readonly request: FetchRequestInit,
  readonly element_id: string,
  do_request: boolean
}

export interface Fields_State {
  [index: string]: string
}

export interface Custom_Event_Data {
  e: Element,
  coll: Array<Element>,
  fields: Fields_State
}

export interface RR_Context {
  element: Element,
  collection: | NodeList
}

export interface Response_Origin {
  readonly X_SENT_FROM: string,
  readonly status: 'ok' | 'invalid',
  readonly fields: {
    [index: string]: string
  }
}

export interface Response_Detail {
  request: Request_Origin,
  response: Response_Origin,
}

const THE_BODY = document.body;
export const IS_DEV = window.location.href.indexOf('http://localhost:') === 0;


import { X_SENT_FROM, is_plain_object, SPLIT_TAG_NAME_PATTERN } from './base.mts';

export function log(...args: any[]) {
  if (!IS_DEV)
    return false;

  return console.log(...args);
}

export function warn(...args: any[]) {
  if (!IS_DEV)
    return false;

  return console.warn(...args);
}

function new_custom_event<T>(name: Custom_Event_Name, data: Custom_Event_Detail<T>) {
  return new CustomEvent(name, data);
}

export function fragment(...eles: (string | Element)[]) {
  let dom_fragment = document.createDocumentFragment();
  for (const x of eles) {
    if (typeof x === 'string')
      dom_fragment.appendChild(document.createTextNode(x));
    else
      dom_fragment.appendChild(x);
  }

  return dom_fragment;
}

export function body(...eles: (string | Element)[]) {
  THE_BODY.append(fragment(...eles));
  return THE_BODY;
}

export function split_id_class(e: Element, id_class: string): Element {
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

/*
  * e('input', {name: "_something"}, "My Text")
  * e('a', '.red#ID', {href: "https://some.url"}, "My Text")
  * e('div', e('span', "My Text"))
  * e('div', '#main', e('span', "My Text"))
  * e('div', '#main',
  *   e('span', "My Text"),
  *   e('div', "My Text")
  * )
*/
export function element<T extends keyof HTMLElementTagNameMap>(tag_name: T, ...body: (string | Partial<HTMLElementTagNameMap[T]> | Element)[]) {
  const e = document.createElement(tag_name)
  for (let i = 0; i < body.length; i++ ){
    const v = body[i];
    if (typeof v === 'string') {
      if (i === 0 && v.at(0) === '#' || v.at(0) === '.') {
        split_id_class(e, v);
        continue;
      }
      e.appendChild(document.createTextNode(v));
      continue;
    }

    if (is_plain_object(v)) {
      set_attrs(e, v);
      continue;
    }

    e.appendChild(v as Element);
  }

  return e;
} // export function

function set_attrs(ele: Element, attrs: any) {
  for (const k in attrs) {
    switch (k) {
      case 'htmlFor':
      case 'htmlfor':
        ele.setAttribute('for', attrs[k]);
        break;
      case 'href':
        try {
          ele.setAttribute(k, (new URL((attrs as HTMLElementTagNameMap['a'])[k])).toString());
        } catch (e) {
          warn("Invalid url.")
        }
        break;
      default:
        ele.setAttribute(k, attrs[k]);

    } // switch
  }
  return ele;
}

export function form_data(f: HTMLFormElement) {
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
} // export function

export function update_id_count() {
  let current_id_count =  THE_BODY.getAttribute('data-id-count') || "-1";
  const new_id = parseInt(current_id_count) + 1;
  THE_BODY.setAttribute('data-id-count', new_id.toString());
  return new_id;
}

// Gets id attribute of element.
// Creates an id if it is missing.
export function get_id(e: HTMLElement): string {
  const id = e.getAttribute('id');
  if (id)
    return id;
  const new_id = `${e.tagName}_${update_id_count()}`
  e.setAttribute('id', new_id);
  return new_id;
}

function full_url(x: string): string {
  const url = new URL(location.toString());
  url.pathname = x;
  return url.toString();
}

export function reset_css_state(e_id: string, new_class?: Custom_Event_Name) {
  const e = document.querySelector(`#${e_id}`);

  for (const s of Request_States) {
    THE_BODY.classList.remove(`${e_id}-${s}`);
    if (e)
      e.classList.remove(s);
  }

  if (new_class)
    set_css_state(e_id, new_class);

  return e;
}

export function set_css_state(e_id: string, new_class: Custom_Event_Name) {
  THE_BODY.classList.add(`${e_id}-${new_class}`);
  const e = document.querySelector(`#${e_id}`);
  if (e) {
    e.classList.add(new_class);
  }
  return THE_BODY;
}

export function use_default_forms() {
  return THE_BODY.addEventListener('click', on_click_submit);
} // export function

function on_click_submit(ev: MouseEvent) {
  log(`Event type: ${ev.type}`);
  const ele =  ev.target && (ev.target as Element).tagName && (ev.target as Element);

  if (!ele)
    return false;

  if (ele.tagName !== 'BUTTON')
    return false;

  const button = ele as HTMLButtonElement;
  if (!button.classList.contains('submit'))
    return false;

  const form = button.closest('form');
  if (!form) {
    warn('Form not found for: ' + button.tagName);
    return false;
  }

  ev.preventDefault();
  ev.stopPropagation();

  return submit_form(form);
} // === function

export function submit_form(form: HTMLFormElement) {
  const form_id = get_id(form);

  reset_css_state(form_id, 'loading');

  const action = form.getAttribute('action');
  if (!action)
    throw new Error(`action attribute not set for ${form_id}`);

  const full_action = full_url( action );

  const f_request: FetchRequestInit = {
    method: "POST",
    referrerPolicy: "no-referrer",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      X_SENT_FROM: get_id(form)
    },
    body: JSON.stringify(form_data(form))
  };

  const request: Request_Origin = {
    request: f_request,
    element_id: get_id(form),
    do_request: true
  };

  dispatch.request(request);

  if (!request.do_request)
    return false;

  setTimeout(async () => {
    return fetch(full_action, f_request)
    .then((resp: Response) => dispatch.response(request, resp))
    .catch((err: any) => dispatch.network_error(err, request));
  }, 450);

  return true;
} // === function

// function form_loading(e: HTMLElement) {
//   e.classList.remove('loading');
// }


export function invalid_form_fields(form: HTMLFormElement, fields: { [index: string]: string }) {
  for (const k in fields) {
    const target = form.querySelector(`label[for='${k}'], input[name='${k}']`);
    const fieldset = (target && target.closest('fieldset')) || form.querySelector(`fieldset.${k}`);
    if (fieldset)
      fieldset.classList.add('invalid');
  }
  return form;
}

function _reload() { return window.location.reload(); };

export function reload_in(n: number) {
  if (n > -1)
    return setTimeout(_reload, n);
  throw new Error(`!!! Invalid value for reload_in: ${n}`);
}

export function input_numbers_only(selector: string) {
  return document.querySelectorAll(selector).forEach( (ele) => {
    ele.addEventListener("keydown", (event: Event) => {
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
        console.log(ev.key);
      }
      // do something
    })
  })
} // === function




export function hide(e: Element) { return e.classList.add('hide'); }
export function unhide(e: Element) { return e.classList.remove('hide'); }

export function dom_it(f: (e: Element) => void, ...args: Array<string | Partial<Custom_Event_Data>>) {
  const a_max = args.length;
  for (let a_i = 0; a_i < a_max; a_i++) {
    const x = args[a_i];

    if (typeof x === 'string') {
      document.querySelectorAll(x).forEach(f);
      continue;
    }

    if (x.e) {
      f(x.e);
      continue;
    }

    if (x.coll) {
      const max = x.coll.length;
      for (let i = 0; i < max; i++)
      f(x.coll[i]);
    }
  }
}

export const dispatch = {

  request(req: Request_Origin) {
    THE_BODY.dispatchEvent(new CustomEvent(`* request`, {detail: req}));
    THE_BODY.dispatchEvent(new CustomEvent(`${req.element_id} request`, {detail: req}));
  },

  async response(req: Request_Origin, raw_resp: Response) {
    if (!raw_resp.ok)
      return dispatch.server_error(req, raw_resp);

    const resp: Response_Origin = (await raw_resp.json()) as Response_Origin;

    if (!resp[X_SENT_FROM]) {
      warn(`${X_SENT_FROM} key not found in response: ${Object.keys(resp).join(', ')}`);
      return resp;
    }

    const form_id = req.element_id;
    const form = document.getElementById(form_id);

    const detail = {detail: {response: resp, request: req}};

    THE_BODY.dispatchEvent(new CustomEvent('* response', detail));
    THE_BODY.dispatchEvent(new CustomEvent(`#${form_id} response`, detail));

    if (form) {
      reset_css_state(form_id);
    }

    if (resp.status === 'ok') {
      return dispatch.ok(resp, req);
    }

    dispatch.invalid(resp, req);
  },

  ok(resp: Response_Origin, req: Request_Origin) {
    const detail = {detail: {response: resp, request: req}};
    set_css_state(`#${req.element_id}`, 'ok');
    THE_BODY.dispatchEvent(new CustomEvent(`* ok`, detail));
    THE_BODY.dispatchEvent(new CustomEvent(`#${req.element_id} ok`, detail));
  },

  invalid(resp: Response_Origin, req: Request_Origin) {
    const detail = {detail: {response: resp, request: req}};
    set_css_state(req.element_id, 'invalid');
    const form = document.getElementById(req.element_id);
    if (form)
      invalid_form_fields(form as HTMLFormElement, resp.fields);
    THE_BODY.dispatchEvent(new CustomEvent(`* invalid`, detail));
    THE_BODY.dispatchEvent(new CustomEvent(`#${req.element_id} invalid`, detail));
  },

  server_error(req: Request_Origin, raw_resp: Response) {
    warn(`!!! Server Error: ${raw_resp.status} - ${raw_resp.statusText}`);

    const e = e_id(req.element_id);
    if (e) {
      reset_css_state(e.id, 'server_error')
      const detail = {detail: {request: req, response: raw_resp}};
      THE_BODY.dispatchEvent(new CustomEvent('* server_error', detail));
      THE_BODY.dispatchEvent(new CustomEvent(`#${e.id} server_error`, detail));
      return true;
    }
    return false;
  },

  network_error(error: any, request: Request_Origin) {
    warn(error);
    warn(`!!! Network error: ${error.message}`);
    const detail = {detail: {error, request}};
    THE_BODY.dispatchEvent(new CustomEvent('* network_error', detail));
    THE_BODY.dispatchEvent(new CustomEvent(`#${request.element_id} network_error`, detail));

    const e = e_id(request.element_id);
    if (e) {
      reset_css_state(e.id, 'network_error')
      return true;
    }

    return false;
  } // === function
}; // export dispatch

export const on = {
  request(selector: string, f: (req: Request_Origin) => void) {
    THE_BODY.addEventListener('request', function (ev: Event) {
      const cev = ev as Custom_Event_Detail<Request_Origin>;
      const req = cev.detail;
      if (selector === '*' || selector === req.element_id)
        f(req);
    });
  },
  response(selector: string, f: (resp: Response_Origin, req: Request_Origin) => void) {
    THE_BODY.addEventListener('response', function (ev: Event) {
      const cev = ev as Custom_Event_Detail<Response_Detail>
      const resp = cev.detail.response;
      const req = cev.detail.request;
      if (selector == '*' || selector === req.element_id)
        f(resp, req);
    });
  },
  network_error(selector: string, f: (req: Request_Origin, err: any) => void) {
    THE_BODY.addEventListener(`${selector} network_error`, (ev: Event) => {
      const cev = ev as Custom_Event_Detail<Network_Error_Origin>;
      f(cev.detail.error, cev.detail.request);
    })
  },
  server_error(selector: string, f: (resp: Response_Origin, req: Request_Origin) => void) {
    THE_BODY.addEventListener(`${selector} server_error`, (ev: Event) => {
      const cev = ev as Custom_Event_Detail<Response_Detail>;
      f(cev.detail.response, cev.detail.request);
    });
  },
  ok(selector: string, f: (resp: Response_Origin, req: Request_Origin) => void) {
    THE_BODY.addEventListener(`${selector} ok`, (ev: Event) => {
      const cev = ev as Custom_Event_Detail<Response_Detail>;
      f(cev.detail.response, cev.detail.request);
    });
  },
  invalid(selector: string, f: (resp: Response_Origin, req: Request_Origin) => void) {
    THE_BODY.addEventListener(`${selector} invalid`, (ev: Event) => {
      const cev = ev as Custom_Event_Detail<Response_Detail>;
      f(cev.detail.response, cev.detail.request);
    });
  }
}; // export on

// function default_request_handle(ev: Event) {
//   const cev = ev as Custom_Event_Detail<Request_Origin>;
// }
export function e_id(s: string) {
  return document.getElementById(s);
}
