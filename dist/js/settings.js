export const select = {
  templateOf: {
    finder: '#template-finder',
    about: '#template-about',
  },
  containerOf: {
    pages: '#pages',
    finder: '.finder__wrapper',
    finder_grid: '.finder__grid',
    about: '.about__wrapper',
  },
  nav: {
    links: '.header__navigation a',
  },
};

export const classNames = {
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  },
};

export const settings = {
  db: {
    url:
      '//' +
      window.location.hostname +
      (window.location.hostname == 'localhost' ? ':3131' : ''),
  },
};

export const templates = {
  finder: Handlebars.compile(
    document.querySelector(select.templateOf.finder).innerHTML
  ),
  about: Handlebars.compile(
    document.querySelector(select.templateOf.about).innerHTML
  ),
};
