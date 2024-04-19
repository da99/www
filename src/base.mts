
export type Attributes = Partial<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>;
// export type Attributes = Partial<HTMLAttributes>
// export interface Attributes {
//   htmlFor: string,
//   href: string
// }
export const VALID_PROTO = /^(http|https|ssh|ftp|sftp|gopher):\/\//i;
export const ObjectPrototype = Object.getPrototypeOf({});
export const SPLIT_TAG_NAME_VALID_PATTERN = /^([a-z0-9]+)([\.\#][a-z0-9\_]+)*$/
export const SPLIT_TAG_NAME_PATTERN = /([\.\#])/g
export const ALLOWED_TAGS: any = {
  p: true,
  a: true,
  div: true,
  form: true,
  span: true
};

export function allow_tags(...tags: (keyof HTMLElementTagNameMap)[]) {
  for (const x of tags)
    ALLOWED_TAGS[x] = true;
  return true;
}

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

export function split_tag_name(new_class: string) {
    // console.warn(new_class);
  if (!new_class.match(SPLIT_TAG_NAME_VALID_PATTERN)) {
    throw new Error(`Invalid characters in new element: ${new_class}`);
  }

  let curr = '';
  let tagname = 'unknown';
  const classList: string[] = [];
  let tagid = undefined;
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
          classList.push(s);
          break;
        case '#':
          tagid = s;
          break;
        default:
          tagname = s;
      }
    }
  }

  if (tagname == 'unknown')
    throw `Invalid syntax for element creation: ${new_class}`;
  if (ALLOWED_TAGS[tagname] !== true)
    throw new Error(`Tag not allowed to be created: ${tagname}`);
  return {tagname, classList, tagid};
} // func

export const EMAIL_PATTERN = /^[^@]+@[^@]+$/;
export function is_email_valid(x: string) {
  return !!x.match(EMAIL_PATTERN);
}
