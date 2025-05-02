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
import LoadingView from '../view/loading-view.js';
import { RenderPosition } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

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
  #loadingComponent = new LoadingView();
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

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

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
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

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointModel.updatePoints(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        this.#pointModel.addPoint(updateType, update);
        try {
          await this.#pointModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
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
        this.#clearEventList({ resetSortType: false });
        this.#renderApp();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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
    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }

    if (this.#noEventPointComponent) {
      remove(this.#noEventPointComponent);
    }
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);
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
