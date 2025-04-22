import EventPresenter from './presenter/event-presenter.js';
import PointsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import addNewEventButtonView from './view/add-new-event-btn-view.js';
import { render } from './framework/render.js';

const filtersButtonsContainer = document.querySelector(
  '.trip-controls__filters'
);

const addPointButtonContainer = document.querySelector('.trip-main');

const pointModel = new PointsModel();
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({
  filterContainer: filtersButtonsContainer,
  filterModel,
  pointModel,
});

const eventsContainer = document.querySelector('.trip-events');
const eventPresenter = new EventPresenter({
  listContainer: eventsContainer,
  pointModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const AddPointButtonComponent = new addNewEventButtonView({
  onClick: handleNewPointButtonCLick,
});

function handleNewPointFormClose() {
  AddPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonCLick() {
  eventPresenter.createPoint();
  AddPointButtonComponent.element.disabled = true;
}
render(AddPointButtonComponent, addPointButtonContainer);
filterPresenter.init();
eventPresenter.init();
