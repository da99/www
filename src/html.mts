
// type Attributes = Partial<HTMLElement | HTMLAnchorElement | HTMLInputElement | HTMLLabelElement>;
import type { Attributes } from './base.mts';
import { VALID_PROTO, ObjectPrototype, SPLIT_TAG_NAME_PATTERN } from './base.mts';

// export function safe_uri(x: string) { return {content: x, type: "Safe"}; }
export function is_func(x: unknown) { return typeof x === "function"; }
export function is_plain_object(x: unknown) { return typeof x === 'object' && Object.getPrototypeOf(x) === ObjectPrototype; }

export function is_urlish(x: unknown) {
  if (typeof x !== 'string')
    return false;

  return VALID_PROTO.test(x.toLowerCase());
} // func

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

function set_attrs(ele: Element, attrs: Attributes) {
  for (const k in attrs) {
    switch (k) {
      case 'htmlFor':
        ele.setAttribute('for', attrs[k]);
        break;
      case 'href':
        try {
          ele.setAttribute(k, (new URL(attrs['href'])).toString());
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
export function element(tag_name: string, ...pieces : (string | Element | Attributes)[]) {
  const e = split_tag_name(tag_name);
  pieces.forEach((x, _i) => {
    if (typeof x === "string")
      return e.appendChild(document.createTextNode(x));
    if (is_plain_object(x))
      return set_attrs(e, x);
    e.appendChild(x as Element);
  });
  return e;
} // export function

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

/*
  * This is also used for CSRF protection.
*/
export const X_SENT_FROM = "X_SENT_FROM";

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

function submit_form(ev: HTMLElementEventMap[keyof HTMLElementEventMap]) {
  ev.preventDefault();
  ev.stopPropagation();
  const button = ev.target as HTMLElement;
  const form = button.closest('form');
  if (!form) {
    console.warn('Form not found for: ' + button.tagName);
    return false;
  }

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

  const detail = {request: f_request, element: form, do_request: true}
  document.body.dispatchEvent(new CustomEvent('request', {detail}));

  if (!detail.do_request)
    return false;

  fetch(full_action, f_request)
  .then((x: Response) => { response(x, detail) })
  .catch((x: any) => { request_error(x, detail) });
  return true;
} // === function submit_form

function body_click(ev: MouseEvent) {
  console.warn(`Event type: ${ev.type}`);
  const ele =  ev.target && (ev.target as any).tagName && (ev.target as Element);
  switch (ele) {
    case 'A':
      break;

    case 'BUTTON':
      const button = ele as HTMLButtonElement;
      if (!button.classList.contains('submit')) {
        console.warn(`Unknown button type for: ${button}`)
        return false;
      }
      ev.preventDefault();
      console.warn('You are submitting this form');
      return submit_form(ev);
  }
} // === function

async function response(resp: Response, origin: any) {
  if (!resp.ok)
    return request_reject(resp, origin);

  console.warn(`Form response: ${resp.status}`);

  const json = await resp.json();

  if (!json[X_SENT_FROM]) {
    console.warn(`Target not found: ${json}`);
    return json;
  }

  console.warn('response:');
  console.warn(json);
  document.querySelectorAll(`#${json[X_SENT_FROM]}`).forEach((e) => {
    e.dispatchEvent(new CustomEvent("response", {detail: {response: json}}));
  });
  return json;
} // === function response

function request_reject(resp: Response, origin: any) {
  console.warn(`Form response error: ${resp.status} - ${resp.statusText}`);
  const e = origin.element;
  if (e as HTMLElement) {
    document.querySelectorAll('body').forEach((e) => {
      e.dispatchEvent(new CustomEvent("request-rejected", {detail: { response: resp, origin }}));
    });
  }
} // === function request_reject

function request_error(error: any, origin: any) {
  console.warn(error);
  console.warn(`Form fetch error message: ${error.message}`);
  const e = origin.element;
  if (e as HTMLElement) {
    document.querySelectorAll('body').forEach((e) => {
      e.dispatchEvent(new CustomEvent("request-error", {detail: {error, origin}}));
    });
  }
} // === function request_reject

export function setup_events() {
  document.querySelectorAll('body').forEach((body) => {
    body.addEventListener('click', body_click);
  });
} // export function
