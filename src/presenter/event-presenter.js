import AddPointView from '../view/add-event-point-view';
import PointPresenter from './point-presenter.js';
import EventListView from '../view/event-list-view';
import { render } from '../framework/render';
import FilterButtonsView from '../view/filter-view.js';
import SortButtonsView from '../view/sort-view.js';
import NoEventPointView from '../view/no-event-point-view.js';
import { generateFilter } from '../mock/filter.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortPointPrice, sortPointDay, sortPointTime } from '../utils/sort.js';
export default class EventPresenter {

  #eventListContainer = null;
  #pointModel = null;
  #eventListComponent = new EventListView();
  #eventPoints = [];
  #filterContainer = null;
  #pointPresenters = new Map();
  #sortButtonsComponent = null;
  #sourcedListPoints = [];
  #currentSortType = SortType.DAY;

  constructor({ listContainer, pointModel, filterContainer }) {
    this.#eventListContainer = listContainer;
    this.#pointModel = pointModel;
    this.#filterContainer = filterContainer;
  }

  init() {
    this.#eventPoints = [...this.#pointModel.getPoints()];
    this.#sourcedListPoints = [...this.#pointModel.getPoints()];
    this.#renderApp();
  }

  #renderApp(){
    if (this.#eventPoints.length === 0){
      render(new NoEventPointView(), this.#eventListContainer);
      return;
    }

    this.#renderFilterView();
    this.#renderSortView();
    this.#renderEventList();
    this.#sortPoints(SortType.DAY);
    this.#renderPoints();


  }

  #renderPoint(point){
    const pointPresenter = new PointPresenter({
      pointModel: this.#pointModel,
      points: this.#eventPoints,
      eventListComponent: this.#eventListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints(){

    this.#eventPoints.forEach(
      (point) => {
        this.#renderPoint(point);
      }
    );
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
        allPoints: this.#eventPoints,
      }),
      this.#eventListComponent.element
    );
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) =>{
    this.#eventPoints = updateItem(this.#eventPoints, updatedPoint);
    this.#sourcedListPoints = updateItem(this.#sourcedListPoints, updatedPoint);
    // после этой строчки в методе инит начинаются проблемы
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };


  #sortPoints(sortType){

    switch (sortType) {
      case SortType.DAY:
        this.#eventPoints.sort(sortPointDay);
        break;
      case SortType.PRICE:
        this.#eventPoints.sort(sortPointPrice);
        break;
      case SortType.TIME:
        this.#eventPoints.sort(sortPointTime);
        break;
      default:

        //this.#eventPoints = [...this.#sourcedListPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPoints();
  };

  #renderSortView(){
    this.#sortButtonsComponent = new SortButtonsView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortButtonsComponent, this.#eventListContainer);
  }

  #renderFilterView(){
    render(new FilterButtonsView({ filters:generateFilter(this.#eventPoints)}), this.#filterContainer);
  }

  #renderEventList(){
    render(this.#eventListComponent, this.#eventListContainer);
  }
}
