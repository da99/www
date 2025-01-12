
export const EMAIL_PATTERN = /^[^@\.][^@]+@[^@\.]+\.[^@]+[^\.]$/;
export function is_email_valid(x: string) { return !!x.match(EMAIL_PATTERN); }

export function is_func(x: unknown): x is Function {
  return typeof x === "function";
}

export function is_plain_object(x: unknown): x is Object {
  return  !!x && typeof x === 'object' && Object.getPrototypeOf(x) === Object.prototype && x.constructor === Object;
}


export const VALID_PROTO = /^(http|https|ssh|ftp|sftp|gopher):\/\//i;
export function is_urlish(x: unknown) {
  if (typeof x !== 'string')
    return false;

  return VALID_PROTO.test(x.toLowerCase());
} // func

