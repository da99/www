
// type Attributes = Partial<HTMLElement | HTMLAnchorElement | HTMLInputElement | HTMLLabelElement>;
import type { Attributes } from './base.mts';
export type Custom_Event_Name = 'request' | 'network-error' | 'server-error' | 'response' | 'success' | 'rejected'

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

// export function safe_uri(x: string) { return {content: x, type: "Safe"}; }
export function default_success(_req: Request_Origin, resp: Response_Origin) {
   const e_id = resp.X_SENT_FROM;
   document.querySelectorAll(`${e_id}`).forEach((e) => {
     if (e.tagName === 'FORM')
       form_reset(e as HTMLFormElement);
   });
} // --- export function

export function default_rejected(req: Request_Origin, resp: Response_Origin) {
  if (!Object.hasOwn(resp, 'fields')) {
    console.warn(`Fields key not set in JSON_Response.`);
    return false;
  }

  for (const [f, msg] of Object.entries(resp.fields)) {
    console.log(`${f} => ${msg}`);
    const label = req.element.querySelector(`label[for='${f}']`);
    if (label) {
      const fs = label.closest('fieldset');
      if (fs) {
        const div_error = fs.querySelector('div.error');
        const eng_msg = english_error_msg(f, msg);
        if (div_error) {
          if (div_error.textContent !== eng_msg) {
            div_error.replaceChildren(document.createTextNode(eng_msg));
          }
        } else {
          fs.append(element('div', {'class': 'error'}, eng_msg));
        }
      }
    }
  }

} // --- export function

export function english_error_msg(f: string, msg: string) {
  switch (`${f} ${msg}`) {
    case "email empty":
      return `Email address can not be empty.`;
    default:
      return `${f.toUpperCase()} may not be ${msg}.`
  }
}

export function form_reset(f: HTMLFormElement) {
  f.reset();
  form_clear_error(f);
  return f;
}

export function form_clear_error(f: HTMLFormElement) {
  f.querySelectorAll('div.error')
  return f;
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
export function element<T extends keyof HTMLElementTagNameMap>(tag_name: T, ...pieces : (string | Element | Attributes)[]) {
  const e = split_tag_name(tag_name);
  pieces.forEach((x, _i) => {
    if (typeof x === "string")
      return e.appendChild(document.createTextNode(x as string));
    if (is_plain_object(x))
      return set_attrs(e, x as HTMLElementTagNameMap[T]);
    e.appendChild(x as Element);
  });
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

function form_submit(ev: HTMLElementEventMap[keyof HTMLElementEventMap]) {
  const button = ev.target as HTMLElement;
  const form = button.closest('form');
  if (!form) {
    console.warn('Form not found for: ' + button.tagName);
    return false;
  }

  form.classList.add('loading');
  const action = form.getAttribute('action');
  if (!action)
    throw new Error(`action attribute not set for ${get_id(form)}`);

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

  form_clear_error(form);

  fetch(full_action, f_request)
  .then((x: Response) => { response(request, x) })
  .catch((x: any) => { network_error(request, x) });
  return true;
} // === function

function body_click(ev: MouseEvent) {
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
      console.log('You are submitting this form');
      ev.preventDefault();
      ev.stopPropagation();
      return form_submit(ev);
  }
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
  req.element.classList.remove('loading');

  console.log('response:');
  console.log(resp);
  const detail: Custom_Event_Detail<Response_Detail> = {detail: {response: resp, request: req}};
  document.querySelectorAll('body').forEach((e) => {
    e.dispatchEvent(new_custom_event("response", detail));
  });

  if (resp.success)
    document.querySelectorAll('body').forEach((e) => {
      e.dispatchEvent(new_custom_event("success", detail));
      default_success(req, resp);
    });
  else
    document.querySelectorAll('body').forEach((e) => {
      e.dispatchEvent(new_custom_event("rejected", detail));
      default_rejected(req, resp);
    });
  return resp;
} // === function response

function server_error(req: Request_Origin, response: Response) {
  console.warn(`Form response error: ${response.status} - ${response.statusText}`);
  const e = req.element;
  if (e as HTMLElement) {
    document.querySelectorAll('body').forEach((e) => {
      e.dispatchEvent(new_custom_event("server-error", {detail: {response, origin: req}}));
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

export function setup_events() {
  document.querySelectorAll('body').forEach((body) => {
    body.addEventListener('click', body_click);
  });
} // export function

