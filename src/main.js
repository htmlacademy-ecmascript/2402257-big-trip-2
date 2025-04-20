import FilterButtonsView from './view/filter-view.js';
import EventPresenter from './presenter/event-presenter.js';
import PointsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import { render } from './framework/render.js';

// const filters = [
//   {
//     type: 'everything',
//     count: 0,
//   },
// ];

const filtersButtonsContainer = document.querySelector(
  '.trip-controls__filters'
);

// const filterModel = new FilterModel();
const pointModel = new PointsModel();
const eventsContainer = document.querySelector('.trip-events');
const eventPresenter = new EventPresenter({
  filterContainer: filtersButtonsContainer,
  listContainer: eventsContainer,
  pointModel,
});

// render(new FilterButtonsView({
//   filters,
//   currentFilterType: 'everything',
//   onFilterTypeChange: () => {}
// }), filtersButtonsContainer);

eventPresenter.init();
