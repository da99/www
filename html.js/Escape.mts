
const HTML_CHARS_REGEX = /[&<>"']/g;

const HTML_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

export function html(raw_string: string) {
  return raw_string.replace(HTML_CHARS_REGEX, html_char)
}

export function html_char(key: string) {
  return HTML_MAP[key as keyof typeof HTML_MAP] || '';
}


