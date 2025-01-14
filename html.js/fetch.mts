
export type Response_Handler = (resp: Response_Origin, req: Request_Origin) => void;
export const Response_States = ['ok', 'invalid', 'try_again', 'not_yet', 'expired'] as const;
export const Event_States = ['request', 'network_error', 'server_error', 'response', 'loading'] as const;
export const CSS_States = [...Response_States, ...Event_States] as const;

export interface Request_Origin {
  readonly request: RequestInit,
  readonly dom_id: string,
  do_request: boolean
}

export interface Response_Origin {
  readonly status: typeof Response_States[number],
  readonly data: {
    [index: string]: string
  }
}

export interface Response_Detail {
  request: Request_Origin,
  response: Response_Origin,
}

export interface Network_Error_Origin {
  error: any,
  request: Request_Origin
}
