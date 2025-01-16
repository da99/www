
// === TEMPLATEs in DA_STANDARD are inspired by Mustache.
// === * No partials are included. (This should be taken care of
// ===   by the scripting lang. used to generate the templates.
// === * By default, the values are included AS IS, no escaping.
// ===   Escaping should be done by the server passing the info.
// ===   to the browser/client.

import { is_array } from "./IS.mts";

export const HTML_CHARS_TO_ESCAPE = {
  '&' : "&#x26;",
  '<' : "&#x3c;",
  '>' : "&#x3e;",
  '"' : "&#x22;",
  "'" : "&#x27;",
  '`' : "&#x60;",
  '{' : "&#x7b;",
    '}' : "&#x7d;"
};

export class ALLOWED {
  static chars: string[]  = [
    HTML_CHARS_TO_ESCAPE['&'], HTML_CHARS_TO_ESCAPE['<'], HTML_CHARS_TO_ESCAPE['>']
  ]
}

export class PATTERN {
  static replace: RegExp = new RegExp( '(?:' + ALLOWED.chars.join('|') + ')', 'g');
}

// function unescape_specs() {
//   string s = "&#x3c;p id=\"main\" class=\"red hot\"&#x3e;&#x26;#x22;&#x26;#x27;hello&#x26;#x27;&#x26;#x22;&#x3c;/p&#x3e;";
//   should_eq('<p id="main" class="red hot">&#x22;&#x27;hello&#x27;&#x22;</p>', TEMPLATE.unescape(s));
// }


export function unescape_string(s: string): string {
  switch (s) {
    case "&#x26;" : return '&';
    case "&#x3c;" : return '<';
    case "&#x3e;" : return '>';
    /* case "&#x22;" : return '"'; */
    /* case "&#x27;" : return "'"; */
    /* case "&#x60;" : return '`'; */
    /* case "&#x7b;" : return '{'; */
    /* case "&#x7d;" : return '}'; */
    default: throw new Error("Unknown string to unescape for Template");
  }
} // func

export function unescape(source: string): string {
  return source.replace(PATTERN.replace, unescape_string);
} // func

  // void template_render_specs() {
  //   string str = "a {{abc}} {{unknown}} b {{# arr }} {{a}}->{{abc}} {{/arr}} {{#o}} {{inner}} {{/o}}";
  //   var o      = {a: "default", abc: " A-B-C ", arr: [{a: "a"},{a: "b"},{a: "c"}], o: {inner: "inside"}, name: " BWC "};
  //   should_eq(
  //       "a  A-B-C  {{unknown}} b  a-> A-B-C   b-> A-B-C   c-> A-B-C    inside ",
  //       TEMPLATE.render(str, o)
  //   );
  //
  //   should_eq( " No name here. ", TEMPLATE.render("{{^name}} No name here. {{/name}}", {name: false}));
  //   should_eq( " No names. ", TEMPLATE.render("{{^names}} No names. {{/names}}", {names: []}));
  //   should_eq( " COMMENT: one line", TEMPLATE.render(" COMMENT: one line{{! This is nice. }}", {names: []}));
  //
  // } // === template_render_specs

  export function render(raw: string, obj: Record<string, string | number>): string {
    return render_var(
        render_iter(
          remove_comment(raw),
          obj),
        obj
        );
  }

  export function remove_comment(raw: string): string {
    return raw.replace(/\{\{\!([^\{]+)\}\}/g, "");
  }

  export function render_var(raw: string, obj: Record<string, string | number>) {
    return raw.replace(/\{\{([\!])?\ *([a-zA-Z0-9\_]+)\ *\}\}/g, (matched) => {
      const modifier = arguments[1];
      const key      = arguments[2];
      if (modifier == "!")
        return "";
      if (obj.hasOwnProperty(key)) { return("" + obj[key]); }
        return matched;
      });
  }

  export function render_array(partial: string, obj: Record<string, any>, arr: any[]): string {
    let rendered: string = "";
    for (let i = 0; i < arr.length; i++) {
      rendered += render(partial, Object.assign(obj, (arr[i].constructor == {}.constructor ? arr[i] : {})));
    }
    return rendered;
  }

  function render_obj(partial: string, o1: Record<string, any>, o2: Record<string, any>): string {
    return render(partial, Object.assign(o1, o2));
  }

  function render_iter(str: string, obj: Record<string, any>): string {
    return str.replace(
        /\{\{([\#\^])\ *([^\}]+)\ *\}\}(.+)\{\{\/\ *\2\ *\}\}/g,
        (matched: string) => {
          let s_type  = arguments[1];
          let key     = arguments[2];
          let partial = arguments[3];

          switch (s_type) {
            case "#":
              if (obj.hasOwnProperty(key)) {
                var inner_o = obj[key];
                if (is_array(inner_o)) {
                  return render_array(partial, obj, inner_o);
                }
                return render_obj(partial, obj, inner_o);
              }
              break;

            case "!":
              return "";

            case "^":
              var x = obj.hasOwnProperty(key) && obj[key];
              if (!x || (is_array(x) && x.length == 0)) {
                return render(partial, obj);
              }
              break;

            default:
              throw new Error("Unknown section type: " + s_type);
          } // === switch type

          return matched;
        }
    );
  } // === string render_iter

