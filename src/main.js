
import EventPresenter from './presenter/event-presenter.js';
import PointsModel from './model/events-model.js';

const filtersButtonsContainer = document.querySelector(
  '.trip-controls__filters'
);
const pointModel = new PointsModel();
const eventsContainer = document.querySelector('.trip-events');
const eventPresenter = new EventPresenter({
  filterContainer: filtersButtonsContainer,
  listContainer: eventsContainer,
  pointModel,
});

eventPresenter.init();
