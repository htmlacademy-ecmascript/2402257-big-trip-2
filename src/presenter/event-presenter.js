import AddEventPointView from '../view/add-event-point-view';
import EditEventPointView from '../view/edit-event-point-view';
import EventListView from '../view/event-list-view';
import EventPointView from '../view/event-point-view';
import { render } from '../render.js';

export default class EventPresenter {
  eventListComponent = new EventListView();

  constructor({ listContainer, pointModel }) {
    this.listContainer = listContainer;
    this.pointModel = pointModel;
  }

  init() {
    this.eventPoints = [...this.pointModel.getPoints()];

    render(this.eventListComponent, this.listContainer);

    render(new EditEventPointView(), this.eventListComponent.getElement());
    render(new AddEventPointView(), this.eventListComponent.getElement());

    this.renderEditPointView(this.eventPoints[0]);

    this.renderAddPointView(this.eventPoints[1]);

    this.eventPoints.forEach((point) => this.renderEventPointView(point));
  }

  renderEditPointView(point) {
    const eventOffersByType = this.pointModel.getOffersByType(point.type);
    const eventCheckedOffers = this.pointModel.getOffersById(point.type, point.offers);
    const eventDestination = this.pointModel.getDestinationsByName(point.name);

    render(
      new EditPointView({
        point: point,
        allOffers: eventOffersByType,
        checkedOffers: eventCheckedOffers,
        destinationInfo: eventDestination,
        allPoints: this.eventPoints,
      }),
      this.eventListComponent.getElement()
    );
  }

  renderAddPointView(point) {
    const eventOffersByType = this.pointModel.getOffersByType(point.type);
    const eventCheckedOffers = this.pointModel.getOffersById(point.type, point.offers);
    const eventDestination = this.pointModel.getDestinationsByName(point.name);

    render(
      new AddPointView({
        point: point,
        allOffers: eventOffersByType,
        checkedOffers: eventCheckedOffers,
        destinationInfo: eventDestination,
        allPoints: this.eventPoints,
      }),
      this.eventListComponent.getElement()
    );
  }

  renderEventPointView(point) {
    const eventOffers = [...this.pointModel.getOffersById(point.type, point.offers)];
    const eventDestinations = { ...this.pointModel.getDestinationsByName(point.name) };

    render(
      new EventPointView({
        point: point,
        offers: eventOffers,
        destinations: eventDestinations,
      }),
      this.eventListComponent.getElement()
    );
  }
}
