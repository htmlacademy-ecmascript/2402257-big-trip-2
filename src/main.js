import EventPresenter from './presenter/event-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import addNewEventButtonView from './view/add-new-event-btn-view.js';
import { render } from './framework/render.js';
import PointApiService from './point-api-service.js';

const AUTHORIZATION = 'Basic hS2sfS44545hghgh';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

const filtersButtonsContainer = document.querySelector(
  '.trip-controls__filters'
);

const pointModel = new PointsModel(
  {
    pointsApiService: new PointApiService(END_POINT, AUTHORIZATION)
  }
);
const filterModel = new FilterModel();

const addPointButtonContainer = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events');

const eventPresenter = new EventPresenter({
  listContainer: eventsContainer,
  pointModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersButtonsContainer,
  filterModel,
  pointModel,
  points: eventPresenter.points,
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

filterPresenter.init();
eventPresenter.init();
pointModel.init()
  .finally(() => {
    render(AddPointButtonComponent, addPointButtonContainer);
  });

