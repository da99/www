// src/types.mts
var VALID_PROTO = /^(http|https|ssh|ftp|sftp|gopher):\/\//i;
var ObjectPrototype = Object.getPrototypeOf({});
var SPLIT_TAG_NAME = /([\.\#])([^\.\#]+)/g;

// src/index.mts
function is_func(x) {
  return typeof x === "function";
}
function is_plain_object(x) {
  return typeof x === "object" && Object.getPrototypeOf(x) === ObjectPrototype;
}
function is_urlish(x) {
  if (typeof x !== "string")
    return false;
  return VALID_PROTO.test(x.toLowerCase());
}
function fragment(...eles) {
  let dom_fragment = document.createDocumentFragment();
  for (const x of eles) {
    if (typeof x === "string")
      dom_fragment.appendChild(document.createTextNode(x));
    else
      dom_fragment.appendChild(x);
  }
  return dom_fragment;
}
function body(...eles) {
  document.body.append(fragment(...eles));
  return document.body;
}
function split_tag_name(new_class) {
  let e = null;
  let curr = "";
  for (const s of new_class.split(SPLIT_TAG_NAME)) {
    switch (s) {
      case ".":
      case "#":
        curr = s;
        break;
      case "":
        break;
      default:
        switch (curr) {
          case ".":
            e?.classList.add(s);
            break;
          case "#":
            e?.setAttribute("id", s);
            break;
          default:
            e = document.createElement(s);
        }
    }
  }
  if (!e)
    throw `Invalid syntax for element creation: ${new_class}`;
  return e;
}
var set_attrs = function(ele, attrs) {
  for (const k in attrs) {
    switch (k) {
      case "htmlFor":
        ele.setAttribute("for", attrs[k]);
        break;
      case "href":
        try {
          ele.setAttribute(k, new URL(attrs["href"]).toString());
        } catch (e) {
          console.warn("Invalid url.");
        }
        break;
      default:
        ele.setAttribute(k, attrs[k]);
    }
  }
  return ele;
};
function element(tag_name, ...pieces) {
  const e = split_tag_name(tag_name);
  pieces.forEach((x, _i) => {
    if (typeof x === "string")
      return e.appendChild(document.createTextNode(x));
    if (is_plain_object(x))
      return set_attrs(e, x);
    e.appendChild(x);
  });
  return e;
}
function form_data(f) {
  const raw_data = new FormData(f);
  const data = {};
  for (let [k, v] of raw_data.entries()) {
    if (data.hasOwnProperty(k)) {
      if (!Array.isArray(data[k]))
        data[k] = [data[k]];
      data[k].push(v);
    } else
      data[k] = v;
  }
  return data;
}
var handle_form_fetch_error = function(error) {
  console.warn(`Form fetch error: ${error.message}`);
};
async function handle_form_response(resp) {
  if (!resp.ok) {
    console.warn(`Form response error: ${resp.status} - ${resp.statusText}`);
    return false;
  }
  console.warn(`Form response: ${resp.status}`);
  const json = await resp.json();
  if (json.__target) {
    console.warn(`         body: ${json}`);
    document.getElementById(json.__target)?.dispatchEvent(new CustomEvent("formOK", { detail: json }));
  } else {
    console.warn(`Target not found: ${json}`);
  }
}
var handle_form_post = function(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  const e = ev.target;
  const form = e.closest("form");
  if (!form) {
    console.warn("Form not found for: " + e.tagName);
    return false;
  }
  const action = form.getAttribute("action");
  const headers = {
    "Content-Type": "application/json"
  };
  headers[X_SENT_FROM] = form.getAttribute("id") || "[NONE]";
  console.warn(headers);
  fetch(action, {
    method: "POST",
    referrerPolicy: "no-referrer",
    cache: "no-cache",
    headers,
    body: JSON.stringify(form_data(form))
  }).then(handle_form_response).catch(handle_form_fetch_error);
  return false;
};
function form_post(b) {
  b.addEventListener("click", handle_form_post);
  return b;
}
var X_SENT_FROM = "X-Sent-From";
export {
  split_tag_name,
  is_urlish,
  is_plain_object,
  is_func,
  fragment,
  form_post,
  form_data,
  element,
  body,
  X_SENT_FROM
};
