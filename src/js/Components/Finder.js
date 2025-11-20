/* eslint-disable indent */
import { templates, select } from '../settings.js';

class Finder {
  constructor(element) {
    const thisFinder = this;

    // save reference to finder page div

    thisFinder.element = element;

    // start at step 1
    thisFinder.step = 1;

    // render view for the first time
    thisFinder.render();
  }

  render() {
    const thisFinder = this;

    // determine what title and button content should be used

    let pageData = null;
    switch (thisFinder.step) {
      case 1:
        pageData = { title: 'Draw routes', btnText: 'Finish drawing' };
        break;
      case 2:
        pageData = { title: 'Pick start and finish', btnText: 'Compute' };
        break;
      case 3:
        pageData = { title: 'The best route is:', btnText: 'Start again' };
    }
    // generate view from the template and set it as page content
    const generatedHTML = templates.finder(pageData);
    thisFinder.element.innerHTML = generatedHTML;

    let html = '';
    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 10; col++) {
        html +=
          '<div class="field" data-row="' +
          row +
          '" data-col="' +
          col +
          '"></div>';
      }
    }

    thisFinder.element.querySelector(select.containerOf.finder_grid).innerHTML =
      html;
  }
}

export default Finder;
