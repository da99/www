
export type Attributes = Partial<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>;
export const VALID_PROTO = /^(http|https|ssh|ftp|sftp|gopher):\/\//i;
export const ObjectPrototype = Object.getPrototypeOf({});
export const SPLIT_TAG_NAME = /([\.\#])([^\.\#]+)/g

// export function safe_uri(x: string) { return {content: x, type: "Safe"}; }
export function is_func(x: unknown) {
  return typeof x === "function";
}

export function is_plain_object(x: unknown) {
  return typeof x === 'object' && Object.getPrototypeOf(x) === ObjectPrototype;
}

export function is_urlish(x: unknown) {
  if (typeof x !== 'string')
    return false;

  return VALID_PROTO.test(x.toLowerCase());
} // func

export function is_void_tagname(x: string) {
    switch (x) {
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'embed':
      case 'hr':
      case 'img':
      case 'input':
      case 'link':
      case 'meta':
      case 'param':
      case 'source':
      case 'track':
      case 'wbr':
        return true;
    }
    return false;
} // func
