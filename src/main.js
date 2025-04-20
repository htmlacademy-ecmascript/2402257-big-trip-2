
import EventPresenter from './presenter/event-presenter.js';
import PointsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';


const filtersButtonsContainer = document.querySelector(
  '.trip-controls__filters'
);
const pointModel = new PointsModel();
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({
  filterContainer: filtersButtonsContainer,
  filterModel,
  pointModel
});

const eventsContainer = document.querySelector('.trip-events');
const eventPresenter = new EventPresenter({
  listContainer: eventsContainer,
  pointModel,
  filterModel
});

filterPresenter.init();
eventPresenter.init();
