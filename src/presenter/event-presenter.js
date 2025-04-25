import PointPresenter from './point-presenter.js';
import EventListView from '../view/event-list-view';
import { render, remove } from '../framework/render.js';
import SortButtonsView from '../view/sort-view.js';
import NoEventPointView from '../view/no-event-point-view.js';
import { SortType } from '../const.js';
import { sortPointPrice, sortPointDay, sortPointTime } from '../utils/sort.js';
import { UserAction, UpdateType, FilterType } from '../const.js';
import { filter } from '../utils/filter.js';
import NewPointPresenter from './new-point-presenter.js';

export default class EventPresenter {
  #eventListContainer = null;
  #pointModel = null;
  #eventListComponent = new EventListView();
  #pointPresenters = new Map();
  #sortButtonsComponent = null;
  #currentSortType = SortType.DAY;
  #filterButtonsComponent = null;
  #filterModel = null;
  #noEventPointComponent = null;
  #filterType = FilterType.EVERYTHING;
  #newPointPresenter = null;

  constructor({ listContainer, pointModel, filterModel, onNewPointDestroy }) {
    this.#eventListContainer = listContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointModel: this.#pointModel,
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
    });
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {

    this.#filterType = this.#filterModel.filter;
    const filteredPoints = filter[this.#filterType](this.#pointModel.getPoints());

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointDay);
      case SortType.TIME:
        return filteredPoints.sort(sortPointTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPrice);
    }
    return filteredPoints;
  }

  init() {
    this.#renderApp();
  }

  #renderApp() {
    if (this.points.length === 0) {
      this.#renderNoEventPointView();
      return;
    }
    this.#renderSortView();
    this.#renderEventList();
    this.#renderPoints();
  }

  #renderPoint(point) {
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

  #renderPoints() {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
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
        this.#clearEventList({ resetSortType: true });
        this.#renderApp();
        break;
    }
  };

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #clearEventList({ resetSortType = false } = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#newPointPresenter.destroy();

    remove(this.#filterButtonsComponent);
    remove(this.#sortButtonsComponent);
    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }

    if (this.#noEventPointComponent) {
      remove(this.#noEventPointComponent);
    }
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
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

  #renderSortView() {
    this.#sortButtonsComponent = new SortButtonsView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType,
    });

    render(this.#sortButtonsComponent, this.#eventListContainer);
  }

  #renderEventList() {
    render(this.#eventListComponent, this.#eventListContainer);
  }

  #renderNoEventPointView() {
    this.#noEventPointComponent = new NoEventPointView({
      filterType: this.#filterType,
    });
    render(this.#noEventPointComponent, this.#eventListContainer);
  }
}
