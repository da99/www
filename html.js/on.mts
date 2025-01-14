
import type { Request_Origin, Network_Error_Origin, Response_Handler, Response_Detail, CSS_States } from './fetch.mts';


export interface Custom_Event_Detail<T> extends Event {
  detail: T
}

const THE_BODY = document.body;
export const on = {

  submit(selector: string, f: (data: any) => void)  {
    THE_BODY.addEventListener(`${selector} submit`, function (ev: Event) {
      const cev = ev as Custom_Event_Detail<Request_Origin>;
      f(cev.detail);
    });
  },

  request(selector: string, f: (req: Request_Origin) => void) {
    THE_BODY.addEventListener(`${selector} request`, function (ev: Event) {
      const cev = ev as Custom_Event_Detail<Request_Origin>;
      const req = cev.detail;
      f(req);
    });
  },

  network_error(selector: string, f: (req: Request_Origin, err: any) => void) {
    THE_BODY.addEventListener(`${selector} network_error`, (ev: Event) => {
      const cev = ev as Custom_Event_Detail<Network_Error_Origin>;
      f(cev.detail.error, cev.detail.request);
    });
  },

  server_error(selector: string, f: Response_Handler) {
    THE_BODY.addEventListener(`${selector} server_error`, (ev: Event) => {
      const cev = ev as Custom_Event_Detail<Response_Detail>;
      f(cev.detail.response, cev.detail.request);
    });
  },

  response(selector: string, f: Response_Handler) {
    THE_BODY.addEventListener(`${selector} response`, function (ev: Event) {
      const cev = ev as Custom_Event_Detail<Response_Detail>
      const resp = cev.detail.response;
      const req = cev.detail.request;
      f(resp, req);
    });
  },

  ok(selector: string, f: Response_Handler) { return on.status('ok', selector, f); },
  invalid(selector: string, f: Response_Handler) { return on.status('invalid', selector, f); },
  try_again(selector: string, f: Response_Handler) { return on.status('try_again', selector, f); },
  not_yet(selector: string, f: Response_Handler) { return on.status('not_yet', selector, f); },
  expired(selector: string, f: Response_Handler) { return on.status('expired', selector, f); },

  status(s: typeof CSS_States[number], selector: string, f: Response_Handler) {
    return THE_BODY.addEventListener(`${selector} ${s}`, (ev: Event) => {
      const cev = ev as Custom_Event_Detail<Response_Detail>;
      f(cev.detail.response, cev.detail.request);
    });
  },

  by_id: {
    click(id: string, f: (ev: Event) => void) {
      THE_BODY.addEventListener('click', function (ev: Event) {
        const target = ev.target;
        if (target) {
          const e = target as Element;
          if (e.id === id)
            f(ev);
        }
      });
    }
  }

}; // export on
