import { print_html } from '../html.js/html.mts';
import { title } from '../html.js/dom.mts';

print_html((t) => {

  title('Hello, World ;->')

  t('div', function (div) {
    div('p', '#blue.ish.now', 'Also inside DIV.')
    div('div', '.hello', (d2) => d2('p', 'div div p') )
  })


  t('div', '.hello', (d1) => d1('p', 'add_to_body') )
  t('p', '#red.ish.class', 'done')

});

