import FilterButtonsView from './view/filter-view.js';
import SortButtonsView from './view/sort-view.js';
import EventPresenter from './presenter/event-presenter.js';
import PointsModel from './model/events-model.js';
import { render } from './framework/render.js';

const filtersButtonsContainer = document.querySelector(
  '.trip-controls__filters'
);
const pointModel = new PointsModel();
const eventsContainer = document.querySelector('.trip-events');
const eventPresenter = new EventPresenter({
  listContainer: eventsContainer,
  pointModel,
});

render(new FilterButtonsView(), filtersButtonsContainer);
render(new SortButtonsView(), eventsContainer);
eventPresenter.init();
