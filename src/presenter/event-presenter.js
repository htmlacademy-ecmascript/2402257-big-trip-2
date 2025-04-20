import AddPointView from '../view/add-event-point-view';
import PointPresenter from './point-presenter.js';
import EventListView from '../view/event-list-view';
import { render, remove } from '../framework/render.js';
import FilterButtonsView from '../view/filter-view.js';
import SortButtonsView from '../view/sort-view.js';
import NoEventPointView from '../view/no-event-point-view.js';
import { generateFilter } from '../mock/filter.js';
import { SortType } from '../const.js';
import { sortPointPrice, sortPointDay, sortPointTime } from '../utils/sort.js';
import { UserAction, UpdateType } from '../const.js';
export default class EventPresenter {

  #eventListContainer = null;
  #pointModel = null;
  #eventListComponent = new EventListView();
  #filterContainer = null;
  #pointPresenters = new Map();
  #sortButtonsComponent = null;
  #currentSortType = SortType.DAY;
  #filterButtonsComponent = null;

  constructor({ listContainer, pointModel, filterContainer, }) {
    this.#eventListContainer = listContainer;
    this.#pointModel = pointModel;
    this.#filterContainer = filterContainer;

    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  get points(){
    switch(this.#currentSortType){
      case SortType.DAY:
        return [...this.#pointModel.getPoints()].sort(sortPointDay);
      case SortType.TIME:
        return [...this.#pointModel.getPoints()].sort(sortPointTime);
      case SortType.PRICE:
        return [...this.#pointModel.getPoints()].sort(sortPointPrice);
    }
    return this.#pointModel.getPoints();
  }

  init() {
    this.#renderApp();
  }

  #renderApp(){
    if (this.points.length === 0) {
      render(new NoEventPointView(), this.#eventListContainer);
      return;
    }

    this.#renderFilterView();
    this.#renderSortView();
    this.#renderEventList();
    this.#renderPoints();


  }

  #renderPoint(point){
    const pointPresenter = new PointPresenter({
      pointModel: this.#pointModel,
      points: this.points,
      eventListComponent: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      currentSortType: this.#currentSortType,
    });
    pointPresenter.init(point);

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints(){

    this.points.forEach(
      (point) => {
        this.#renderPoint(point);
      }
    );
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoints(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEventList();
        this.#renderApp();
        break;
      case UpdateType.MAJOR:
        this.#clearEventList({resetSortType: true});
        this.#renderApp();
        break;
    }
  };

  #clearEventList({resetSortType = false} = {}) {

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#filterButtonsComponent);
    remove(this.#eventListComponent);
    remove(this.#sortButtonsComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }


  #renderAddPointView(point) {
    const eventOffersByType = this.#pointModel.getOffersByType(point.type);
    const eventCheckedOffers = this.#pointModel.getOffersById(point.type, point.offers);
    const eventDestination = this.#pointModel.getDestinationsByName(point.name);

    render(
      new AddPointView({
        point: point,
        allOffers: eventOffersByType,
        checkedOffers: eventCheckedOffers,
        destinationInfo: eventDestination,
        allPoints: this.points,
      }),
      this.#eventListComponent.element
    );
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearEventList();
    this.#renderApp();
  };

  #renderSortView(){
    this.#sortButtonsComponent = new SortButtonsView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });

    render(this.#sortButtonsComponent, this.#eventListContainer);
  }

  #renderFilterView(){
    this.#filterButtonsComponent = new FilterButtonsView({ filters:generateFilter(this.points)});
    render(this.#filterButtonsComponent, this.#filterContainer);
  }

  #renderEventList(){
    render(this.#eventListComponent, this.#eventListContainer);
  }
}
