

const PAGES = new Page_List();

class Page_List {
  constructor() {
    this.list = [];
  }

  new() {
    this.list.push(new Page());
  }

  current() {
    let c = this.list.at(this.list.length - 1);
    if (!c)
      throw new Error('No current page found.');
    return c;
  }

  pop() {
    return this.list.pop();
  }
} // class

class Page {
  constructor() {
    this.content = '';
  }

  add_raw(x) {
    this.content += x;
  }

  to_html() {
    return this.content;
  }
} // class Page


function e(tag_name, ...args) {
  const p = PAGES.current();
  p.add_raw(`<${tag_name}>`) ;
  for (let x of args) {
    switch(typeof x) {
      case 'string':
        p.add_raw(x);
        break;
      case 'function':
        x(e);
        break;
      default:
        throw new Error(`Unknown type for page content: ${typeof x}`)
    }
  }
  p.add_raw(`</${tag_name}>`) ;
}

function html5(f) {
  PAGES.new();
  let this_page = PAGES.current();
  this_page.add_raw(`<!DOCTYPE html><html lang="en">`)
  f(e);
  this_page.add_raw(`</html>`);
  return PAGES.pop();
} // func

const content = html5((e) => {
  e('p', 'This is a paragraph.');

  e('div', () => {
    e('p', () => e('span', 'Inner span'));
  });

  e('footer', `(c) ${new Date().getFullYear()}`);
}).to_html();

console.log(content);
