
export const Response_States = ['ok', 'invalid', 'try_again', 'expired'] as const;
export const Event_States = ['request', 'network_error', 'server_error', 'response', 'loading'] as const;
export const CSS_States = [...Response_States, ...Event_States] as const;

export interface Fields_State {
  [index: string]: string
}

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

export interface Response_Origin {
  readonly X_SENT_FROM: string,
  readonly status: typeof Response_States[number],
  readonly fields: {
    [index: string]: string
  }
}

export interface Response_Detail {
  request: Request_Origin,
  response: Response_Origin,
}

const THE_BODY = document.body;
export const IS_DEV = window.location.href.indexOf('://localhost:') > 0;

import { is_plain_object, SPLIT_TAG_NAME_PATTERN } from './base.mts';

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


export const dom = {

  id: {
    __plus_one(): number {
      let current_id_count =  THE_BODY.getAttribute('data-id-count') || "-1";
      const new_id = parseInt(current_id_count) + 1;
      THE_BODY.setAttribute('data-id-count', new_id.toString());
      return new_id;
    },

    // Gets id attribute of element.
    // Creates an id if it is missing.
    upsert(e: HTMLElement): string {
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
  }

}; // export const


function full_url(x: string): string {
  const url = new URL(location.toString());
  url.pathname = x;
  return url.toString();
}

export const css = {
  do(f: (e: Element) => void, ...args: Array<string | Element>) {
    for (const x of args) {
      if (typeof x === 'string')
        document.querySelectorAll(x).forEach(f)
      else
        f(x);
    }
    return args;
  },

  hide(...args: Array<Element | string>) {
    return css.do(e => e.classList.add('hide'), ...args);
  },

  unhide(...args: Array<Element | string>) {
    return css.do(e => e.classList.remove('hide'), ...args);
  },

  reset(e_id: string, new_class?: typeof CSS_States[number]) {
    const e = document.querySelector(`#${e_id}`);

    if (e) {
      for (const s of CSS_States) {
        e.classList.remove(s);
      }

      if (new_class)
        css.set(e_id, new_class);
    }

    return e;
  },

  set(e_id: string, new_class: typeof CSS_States[number]) {
    THE_BODY.classList.add(`${e_id}-${new_class}`);
    const e = document.querySelector(`#${e_id}`);
    if (e)
      e.classList.add(new_class);

    return THE_BODY;
  }

}; // export const

export function use_default_forms() {
  return THE_BODY.addEventListener('click', form.on_click_submit);
} // export function

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

  on_click_submit(ev: MouseEvent) {
    log(`Event type: ${ev.type}`);
    const ele =  ev.target && (ev.target as Element).tagName && (ev.target as Element);

    if (!ele)
      return false;

    if (ele.tagName !== 'BUTTON')
      return false;

    const button = ele as HTMLButtonElement;
    if (!button.classList.contains('submit'))
      return false;

    const e_form = button.closest('form');
    if (!e_form) {
      warn('Form not found for: ' + button.tagName);
      return false;
    }

    ev.preventDefault();
    ev.stopPropagation();

    return form.submit(e_form);
  }, // === function

  submit(e: HTMLFormElement) {
    const form_id = dom.id.upsert(e);

    css.reset(form_id, 'loading');

    const action = e.getAttribute('action');
    if (!action)
      throw new Error(`action attribute not set for ${form_id}`);

    const full_action = full_url( action );

    const f_request: FetchRequestInit = {
      method: "POST",
      referrerPolicy: "no-referrer",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        X_SENT_FROM: dom.id.upsert(e)
      },
      body: JSON.stringify(form.data(e))
    };

    const request: Request_Origin = {
      request: f_request,
      element_id: dom.id.upsert(e),
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
  reload(n?: number) {
    if (typeof n !== 'number')
      return window.location.reload();

    if (n < 0)
      throw new Error(`!!! Invalid value for reload_in: ${n}`);

    setTimeout(page.reload, n * 1000);
    return;
  }
};


export const dispatch = {

  request(req: Request_Origin) {
    THE_BODY.dispatchEvent(new CustomEvent(`* request`, {detail: req}));
    THE_BODY.dispatchEvent(new CustomEvent(`${req.element_id} request`, {detail: req}));
  },

  async response(req: Request_Origin, raw_resp: Response) {
    if (!raw_resp.ok)
      return dispatch.server_error(req, raw_resp);

    const resp: Response_Origin = (await raw_resp.json()) as Response_Origin;

    if (!resp['X_SENT_FROM']) {
      warn(`X_SENT_FROM key not found in response: ${Object.keys(resp).join(', ')}`);
      return resp;
    }

    const form_id = req.element_id;
    const form = document.getElementById(form_id);

    const detail = {detail: {response: resp, request: req}};

    THE_BODY.dispatchEvent(new CustomEvent('* response', detail));
    THE_BODY.dispatchEvent(new CustomEvent(`#${form_id} response`, detail));

    if (form) {
      css.reset(form_id);
    }

    if (resp.status === 'ok') {
      return dispatch.ok(resp, req);
    }

    dispatch.invalid(resp, req);
  },

  ok(resp: Response_Origin, req: Request_Origin) {
    const detail = {detail: {response: resp, request: req}};
    css.set(`#${req.element_id}`, 'ok');
    THE_BODY.dispatchEvent(new CustomEvent(`* ok`, detail));
    THE_BODY.dispatchEvent(new CustomEvent(`#${req.element_id} ok`, detail));
  },

  invalid(resp: Response_Origin, req: Request_Origin) {
    const detail = {detail: {response: resp, request: req}};
    css.set(req.element_id, 'invalid');
    const e_form = document.getElementById(req.element_id);
    if (e_form)
      form.invalid_fields(e_form as HTMLFormElement, resp.fields);
    THE_BODY.dispatchEvent(new CustomEvent(`* invalid`, detail));
    THE_BODY.dispatchEvent(new CustomEvent(`#${req.element_id} invalid`, detail));
  },

  server_error(req: Request_Origin, raw_resp: Response) {
    warn(`!!! Server Error: ${raw_resp.status} - ${raw_resp.statusText}`);

    const e = e_id(req.element_id);
    if (e) {
      css.reset(e.id, 'server_error')
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
      css.reset(e.id, 'network_error')
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
