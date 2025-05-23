import EventPresenter from './presenter/event-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import addNewEventButtonView from './view/add-new-event-button-view.js';
import { render } from './framework/render.js';
import PointApiService from './point-api-service.js';

const AUTHORIZATION = 'Basic hS2sS4454556hhvkkkksassd';

const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

const filtersButtonsContainer = document.querySelector(
  '.trip-controls__filters'
);

const addPointButtonContainer = document.querySelector('.trip-main');


const eventsContainer = document.querySelector('.trip-events');

const addPointButtonComponent = new addNewEventButtonView({
  onClick: handleNewPointButtonCLick,
});

const pointModel = new PointsModel(
  {
    pointsApiService: new PointApiService(END_POINT, AUTHORIZATION),
    failedToLoadContainer: eventsContainer,
    addPointButtonComponent
  }
);
const filterModel = new FilterModel();

const eventPresenter = new EventPresenter({
  listContainer: eventsContainer,
  pointModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

new TripInfoPresenter({
  tripInfoContainer: addPointButtonContainer,
  pointModel,
  filterModel
});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersButtonsContainer,
  filterModel,
  pointModel,
  points: eventPresenter.points,
});


function handleNewPointFormClose() {
  addPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonCLick() {
  eventPresenter.renderEventList();
  eventPresenter.createPoint();
  eventPresenter.removeNoEventPointComponent();
  addPointButtonComponent.element.disabled = true;
}


filterPresenter.init();
eventPresenter.init();
pointModel.init()
  .finally(() => {
    render(addPointButtonComponent, addPointButtonContainer);
  });
