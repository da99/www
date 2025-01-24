import { print_html } from '../html.js/html.mts';
import { title } from '../html.js/dom.mts';

print_html((t) => {

  title('Hello, World ;->')

  t('div', function () {
    t('p', '#blue.ish.now', 'Also inside DIV.')
    t('div', '.hello', () => t('p', 'div div p') )
  })


  t('p', '#red.ish.class', 'done')
});

