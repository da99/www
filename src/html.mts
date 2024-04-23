
// type Attributes = Partial<HTMLElement | HTMLAnchorElement | HTMLInputElement | HTMLLabelElement>;
// import type { Attributes } from './base.mts';
export type Custom_Event_Name = 'request' | 'network-error' | 'server-error' | 'response' | 'success' | 'rejected'
export const Request_States = ['request', 'network-error', 'server-error', 'response', 'success', 'rejected'];
export interface Custom_Event_Detail<T> {
  detail: T
}

export interface Request_Origin {
  readonly request: FetchRequestInit,
  readonly element: HTMLElement,
  do_request: boolean
}

export interface Response_Origin {
  readonly X_SENT_FROM: string,
  readonly success: boolean,
  readonly fields: {
    [index: string]: string
  }
}

export interface Response_Detail {
  request: Request_Origin,
  response: Response_Origin,
}

/* This is also used for CSRF protection. */
export const X_SENT_FROM = "X_SENT_FROM";

import { is_plain_object, SPLIT_TAG_NAME_PATTERN } from './base.mts';

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
  document.body.append(fragment(...eles));
  return document.body;
}

export function split_id_class(e: Element, id_class: string): HTMLElementTagNameMap[T] {
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

export function split_tag_name(new_class: string): Element {
  let e: Element | null = null;
  let curr = '';
  for (const s of new_class.split(SPLIT_TAG_NAME_PATTERN) ) {
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
        default:
          e = document.createElement(s);
      }
    }
  }
 
  if (!e)
    throw `Invalid syntax for element creation: ${new_class}`;
  return e;
} // func

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
          console.warn("Invalid url.")
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
  let current_id_count =  document.body.getAttribute('data-id-count') || "-1";
  const new_id = parseInt(current_id_count) + 1;
  document.body.setAttribute('data-id-count', new_id.toString());
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

export function reset_body_class(e_id: string, new_class?: Custom_Event_Name | 'loading') {
  const e = document.querySelector(`#${e_id}`);
  for (const s of Request_States) {
    document.body.classList.remove(`${e_id}-${s}`);
    if (e)
      e.classList.remove(s);
  }
  if (new_class)
    add_body_class(e_id, new_class);
  return e;
}

export function add_body_class(e_id: string, new_class: Custom_Event_Name | 'loading') {
  const e = document.querySelector(`#${e_id}`);
  if (e) {
    e.classList.add(new_class);
  }
  return document.body.classList;
}
export function Classy_Events() {
    document.body.addEventListener('click', on_body_click);
} // export function

function on_body_click(ev: MouseEvent) {
  console.log(`Event type: ${ev.type}`);
  const ele =  ev.target && (ev.target as any).tagName && (ev.target as Element);
  switch (ele.tagName) {
    case 'A':
      break;

    case 'BUTTON':
      const button = ele as HTMLButtonElement;
      if (!button.classList.contains('submit')) {
        console.warn(`Unknown button type for: ${button}`)
        return false;
      }
      ev.preventDefault();
      ev.stopPropagation();
      return form_submit(ev);
  }
} // === function


function form_submit(ev: HTMLElementEventMap[keyof HTMLElementEventMap]) {
  const button = ev.target as HTMLElement;
  const form = button.closest('form');
  if (!form) {
    console.warn('Form not found for: ' + button.tagName);
    return false;
  }

  const form_id = get_id(form);

  reset_body_class(form_id, 'loading');

  const action = form.getAttribute('action');
  if (!action)
    throw new Error(`action attribute not set for ${form_id}`);

  const full_action = full_url( action );

  // const headers = ;
  // headers[X_SENT_FROM] = form.getAttribute('id') || "[NONE]";
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

  const request: Request_Origin = {request: f_request, element: form, do_request: true}

  document.body.dispatchEvent(new_custom_event('request', {detail: request}));
  if (!request.do_request)
    return false;

  setTimeout(async () => {
    return fetch(full_action, f_request)
    .then((x: Response) => { response(request, x) })
    .catch((x: any) => { network_error(request, x) });
  }, 450);
  return true;
} // === function

// function form_loading(e: HTMLElement) {
//   e.classList.remove('loading');
// }

async function response(req: Request_Origin, raw_resp: Response) {
  if (!raw_resp.ok)
    return server_error(req, raw_resp);

  console.log(`Fetch response: ${raw_resp.status}`);

  const resp: Response_Origin = (await raw_resp.json()) as Response_Origin;

  if (!resp[X_SENT_FROM]) {
    console.warn(`${X_SENT_FROM} key not found in response: ${Object.keys(resp).join(', ')}`);
    return resp;
  }

  // form_loaded(req.element)
  const form_id = req.element.id;
  reset_body_class(form_id);

  const detail: Custom_Event_Detail<Response_Detail> = {detail: {response: resp, request: req}};

  document.querySelectorAll('body').forEach((e) => {
    e.dispatchEvent(new_custom_event("response", detail));
  });

  if (resp.success) {
    add_body_class(form_id, 'success');
    document.querySelectorAll('body').forEach((e) => {
      e.dispatchEvent(new_custom_event("success", detail));
      e.dispatchEvent(new CustomEvent(`${form_id} success`, detail));
    });
  } else {
    add_body_class(form_id, 'rejected');
    document.querySelectorAll('body').forEach((e) => {
      e.dispatchEvent(new_custom_event("rejected", detail));
      e.dispatchEvent(new CustomEvent(`${form_id} rejected`, detail));
    });
  }

  return resp;
} // === function response

function server_error(req: Request_Origin, response: Response) {
  console.warn(`Form response error: ${response.status} - ${response.statusText}`);
  const e = req.element;
  if (e as HTMLElement) {
    document.querySelectorAll('body').forEach((e) => {
      e.dispatchEvent(new_custom_event("server-error", {detail: {response, origin: req}}));
      e.dispatchEvent(new CustomEvent(`${req.element.id} server-error`, {detail: {response, origin: req}}));
    });
  }
} // === function request_rejected

function network_error(req: Request_Origin, error: any) {
  console.warn(error);
  console.warn(`Form fetch error message: ${error.message}`);
  const e = req.element;
  if (e as HTMLElement) {
    document.querySelectorAll('body').forEach((e) => {
      e.dispatchEvent(new_custom_event("network-error", {detail: {error, request: req}}));
    });
  }
} // === function request_reject


