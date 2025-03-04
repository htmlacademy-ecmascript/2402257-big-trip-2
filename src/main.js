import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import EventPresenter from './presenter/event-presenter.js';
import { render } from './render.js';

const filtersContainer = document.querySelector(
  '.trip-controls__filters'
);
const eventsContainer = document.querySelector('.trip-events');
const eventPresenter = new EventPresenter({ listContainer: eventsContainer });

render(new FilterView(), filtersContainer);
render(new SortView(), eventsContainer);
eventPresenter.init();
//hello
