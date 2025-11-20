import { classNames, select } from './settings.js';
import Finder from './Components/Finder.js';
import About from './Components/About.js';

const app = {
  initFinder: function () {
    const thisApp = this;

    thisApp.finderContainer = document.querySelector(select.containerOf.finder);

    thisApp.finder = new Finder(thisApp.finderContainer);
  },

  initAbout: function () {
    const thisApp = this;

    thisApp.aboutContainer = document.querySelector(select.containerOf.about);

    thisApp.about = new About(thisApp.aboutContainer);
  },
  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;

    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();

        /* get page id from href attribute */
        const id = clickedElement.getAttribute('href').replace('#', '');
        /* run thisApp.activatePage with that ID */
        thisApp.activatePage(id);
        /* change URL hash */
        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function (pageId) {
    const thisApp = this;
    /* add class "active" to matching pages, remove from non-matching */

    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    /* add class "active" to matching links, remove from non-matching */
    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  init: function () {
    const thisApp = this;

    thisApp.initAbout();
    thisApp.initFinder();
    thisApp.initPages();
  },
};

app.init();
