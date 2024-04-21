
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

export const SPLIT_ID_CLASS_VALID_PATTERN = /^([\.\#][a-z0-9\_]+)+$/
export const SPLIT_ID_CLASS_PATTERN = /([\.\#])/g

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

export function split_id_class<T extends keyof HTMLElementTagNameMap>(tag_name: T, new_class: string) {
  if (new_class == '')
    return {tag_name, tag_id: null, classList: null};

  if (!new_class.match(SPLIT_ID_CLASS_VALID_PATTERN)) {
    throw new Error(`Invalid characters in id/class: ${new_class}`);
  }

  let curr = '';
  const classList: string[] = [];
  let tag_id = undefined;
  for (const s of new_class.split(SPLIT_ID_CLASS_PATTERN) ) {
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
          tag_id = s;
          break;
      }
    }
  }

  return {tag_name, tag_id, classList};
} // func

export function split_tag_name(new_class: string) {
    // console.warn(new_class);
  if (!new_class.match(SPLIT_TAG_NAME_VALID_PATTERN)) {
    throw new Error(`Invalid characters in new element: ${new_class}`);
  }

  let curr = '';
  let tag_name = 'unknown';
  const classList: string[] = [];
  let tag_id = undefined;
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
          tag_id = s;
          break;
        default:
          tag_name = s;
      }
    }
  }

  if (tag_name == 'unknown')
    throw `Invalid syntax for element creation: ${new_class}`;
  if (ALLOWED_TAGS[tag_name] !== true)
    throw new Error(`Tag not allowed to be created: ${tag_name}`);
  return {tag_name, tag_id, classList};
} // func

export const EMAIL_PATTERN = /^[^@]+@[^@]+$/;
export function is_email_valid(x: string) {
  return !!x.match(EMAIL_PATTERN);
}
