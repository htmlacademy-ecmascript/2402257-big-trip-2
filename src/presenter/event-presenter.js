import AddPointView from '../view/add-event-point-view';
import PointPresenter from './point-presenter.js';
import EventListView from '../view/event-list-view';
import { render } from '../framework/render';
import FilterButtonsView from '../view/filter-view.js';
import SortButtonsView from '../view/sort-view.js';
import NoEventPointView from '../view/no-event-point-view.js';
import { generateFilter } from '../mock/filter.js';
export default class EventPresenter {

  #eventListContainer = null;
  #pointModel = null;
  #eventListComponent = new EventListView();
  #eventPoints = [];
  #filterContainer = null;

  constructor({ listContainer, pointModel, filterContainer }) {
    this.#eventListContainer = listContainer;
    this.#pointModel = pointModel;
    this.#filterContainer = filterContainer;
  }

  init() {
    this.#eventPoints = [...this.#pointModel.getPoints()];
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
    this.#renderPoints();


  }

  #renderPoint(point){
    const pointPresenter = new PointPresenter({pointModel: this.#pointModel,points: this.#eventPoints, eventListComponent: this.#eventListComponent });
    pointPresenter.init(point);
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


  #renderSortView(){
    render(new SortButtonsView(), this.#eventListContainer);
  }

  #renderFilterView(){
    render(new FilterButtonsView({ filters:generateFilter(this.#eventPoints)}), this.#filterContainer);
  }

  #renderEventList(){
    render(this.#eventListComponent, this.#eventListContainer);
  }
}
