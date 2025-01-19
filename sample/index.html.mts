import { html5 } from '../html.js/html.mts';

html5((x) => {
  x('body', (b) => {
    b('p', 'Hello, HTML5.');
    b('p', '#red.with.class', 'done');
  })
});
