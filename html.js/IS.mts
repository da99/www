
export const EMAIL_PATTERN = /^[^@\.][^@]+@[^@\.]+\.[^@]+[^\.]$/;
export function is_email_valid(x: string) { return !!x.match(EMAIL_PATTERN); }

export function is_func(x: unknown) { return typeof x === "function"; }

export const ObjectPrototype = Object.getPrototypeOf({});
export function is_plain_object(x: unknown) { return typeof x === 'object' && Object.getPrototypeOf(x) === ObjectPrototype; }


export const VALID_PROTO = /^(http|https|ssh|ftp|sftp|gopher):\/\//i;
export function is_urlish(x: unknown) {
  if (typeof x !== 'string')
    return false;

  return VALID_PROTO.test(x.toLowerCase());
} // func

