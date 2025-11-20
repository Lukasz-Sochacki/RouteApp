/* eslint-disable indent */
import { templates, select, classNames } from '../settings.js';

class Finder {
  constructor(element) {
    const thisFinder = this;

    // save reference to finder page div

    thisFinder.element = element;

    thisFinder.grid = {};

    for (let row = 1; row <= 10; row++) {
      thisFinder.grid[row] = {};
      for (let col = 1; col <= 10; col++) {
        thisFinder.grid[row][col] = false;
      }
    }

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
    thisFinder.initActions();
  }

  changeStep(newStep) {
    const thisFinder = this;
    thisFinder.step = newStep;
    thisFinder.render();
  }

  initActions() {
    const thisFinder = this;
    if (thisFinder.step === 1) {
      thisFinder.element
        .querySelector(select.containerOf.button)
        .addEventListener('click', function (e) {
          e.preventDefault();
          thisFinder.changeStep(2);
        });

      thisFinder.element
        .querySelector(select.containerOf.finder_grid)
        .addEventListener('click', function (event) {
          event.preventDefault();
          if (event.target.classList.contains(select.containerOf.field))
            thisFinder.toggleField(event.target);
        });
    } else if (thisFinder.step === 2) {
      thisFinder.element
        .querySelector(select.containerOf.button)
        .addEventListener('click', function (event) {
          event.preventDefault();
          thisFinder.changeStep(3);
        });
      thisFinder.element
        .querySelector(select.containerOf.finder_grid)
        .addEventListener('click', function (event) {
          event.preventDefault();
          if (event.target.classList.contains(select.containerOf.field)) {
            thisFinder.toggleField(event.target);
          }
        });
    } else if (thisFinder.step === 3) {
      thisFinder.element
        .querySelector(select.containerOf.button)
        .addEventListener('click', function (event) {
          event.preventDefault();
          thisFinder.changeStep(1);
        });
      thisFinder.element
        .querySelector(select.containerOf.finder_grid)
        .addEventListener('click', function (event) {
          event.preventDefault();
          if (event.target.classList.contains(select.containerOf.field)) {
            thisFinder.toggleField(event.target);
          }
        });
    }
  }

  toggleField(fieldElem) {
    const thisFinder = this;

    // get row and col info from field elem attrs
    const field = {
      row: fieldElem.getAttribute('data-row'),
      col: fieldElem.getAttribute('data-col'),
    };

    // if field with this row and col is true -> unselect it
    if (thisFinder.grid[field.row][field.col]) {
      thisFinder.grid[field.row][field.col] = false;
      fieldElem.classList.remove(classNames.field.active);
    } else {
      // flatten object to array of values e.g. [false, false, false]
      const gridValues = Object.values(thisFinder.grid).map(function (col) {
        return Object.values(col).flat();
      });

      // if grid isn't empty...
      if (gridValues.includes(true)) {
        // determine edge fields
        const edgeFields = [];
        if (field.col > 1)
          edgeFields.push(thisFinder.grid[field.row][field.col - 1]); //get field on the left value
        if (field.col < 10)
          edgeFields.push(thisFinder.grid[field.row][field.col + 1]); //get field on the right value
        if (field.row > 1)
          edgeFields.push(thisFinder.grid[field.row - 1][field.col]); //get field on the top value
        if (field.row < 10)
          edgeFields.push(thisFinder.grid[field.row + 1][field.col]); //get field on the bottom value

        // if clicked field doesn't touch at least one that is already selected -> show alert and finish function
        if (!edgeFields.includes(true)) {
          alert(
            'A new field should touch at least one that is already selected!'
          );
          return;
        }
      }
      // select clicked field
      thisFinder.grid[field.row][field.col] = true;
      fieldElem.classList.add(classNames.field.active);
    }
  }
}

export default Finder;
