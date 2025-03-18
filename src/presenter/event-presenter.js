import AddPointView from '../view/add-event-point-view';
import EditPointView from '../view/edit-event-point-view';
import EventListView from '../view/event-list-view';
import EventPointView from '../view/event-point-view';
import { render, replace } from '../framework/render';

export default class EventPresenter {
  #listContainer = null;
  #pointModel = null;
  #eventListComponent = new EventListView();
  #eventPoints = [];

  constructor({ listContainer, pointModel }) {
    this.#listContainer = listContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#eventPoints = [...this.#pointModel.getPoints()];

    render(this.#eventListComponent, this.#listContainer);

    //this.#renderEditPointView(this.#eventPoints[0]);

    // this.#renderAddPointView(this.#eventPoints[1]);

    for (let i = 0; i < this.#eventPoints.length; i++){
      this.#renderEventPointView(this.#eventPoints[i]);
    }
  }

  #renderEditPointView(point) {
    const eventOffersByType = this.#pointModel.getOffersByType(point.type);
    const eventCheckedOffers = this.#pointModel.getOffersById(point.type, point.offers);
    const eventDestination = this.#pointModel.getDestinationsByName(point.name);

    render(
      new EditPointView({
        point: point,
        allOffers: eventOffersByType,
        checkedOffers: eventCheckedOffers,
        destinationInfo: eventDestination,
        allPoints: this.#eventPoints,
      }),
      this.#eventListComponent.element
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

  #renderEventPointView(point) {
    const eventOffers = [...this.#pointModel.getOffersById(point.type, point.offers)];
    const eventDestinations = { ...this.#pointModel.getDestinationsByName(point.name) };

    render(
      new EventPointView({
        point: point,
        offers: eventOffers,
        destinations: eventDestinations,
        onClick: this.#handleRollUpButtonClick
      }),
      this.#eventListComponent.element
    );
  }

  #handleRollUpButtonClick(){
    replace();
  }
}
