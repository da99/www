
export const EMAIL_PATTERN = /^[^@\.][^@]+@[^@\.]+\.[^@]+[^\.]$/;
export function is_email_valid(x: string) { return !!x.match(EMAIL_PATTERN); }

export const VALID_PROTO = /^(http|https|ssh|ftp|sftp|gopher):\/\//i;
export function is_urlish(x: unknown) {
  if (typeof x !== 'string')
    return false;

  return VALID_PROTO.test(x.toLowerCase());
} // func


export function is_func(x: unknown): x is Function {
  return typeof x === "function";
}

export function is_plain_object(x: unknown): x is Record<string, any> {
  return  !!x && typeof x === 'object' && Object.getPrototypeOf(x) === Object.prototype && x.constructor === Object;
}
export function is_positive(x: unknown): x is number {
  return is_num(x) && x > 0;
}

export function is_object(x: unknown): x is Object {
  return typeof(x) === "object";
}

export function is_string(x: unknown): x is string {
  return typeof x === "string";
}

export function is_num(x: unknown): x is number {
  return typeof x === 'number' && !isNaN(x);
}

export function is_boolean(x: unknown): x is boolean {
  return typeof x === 'boolean';
}


export function is_array(x: unknown): x is Array<unknown> {
  return !!x && typeof(x) == "object" && Object.getPrototypeOf(x) === Array.prototype;
}

export function is_regexp(x: unknown): x is RegExp {
  return(x instanceof RegExp);
}


export function is_null(x: unknown): x is null {
  return x === 'null';
}

export function is_undefined(x: unknown): x is undefined {
  return typeof(x) === "undefined";
}

export function is_error(x: unknown): x is Error {
  return is_object(x) && x.constructor === Error;
}

export function is_empty(x: Record<string, any> | { length: number }) {
  if (is_plain_object(x))
    return Object.keys(x).length === 0;
  return (x as { length: number }).length === 0;
}

