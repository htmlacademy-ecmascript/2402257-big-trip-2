import AddPointView from '../view/add-event-point-view';
import EditPointView from '../view/edit-event-point-view';
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
    render(new EditPointView(), this.eventListComponent.getElement());
    render(new AddPointView(), this.eventListComponent.getElement());

    for (let i = 0; i < this.eventPoints.length; i++) {
      //console.log(this.eventPoints[i].type); проверяю тип итерируемой точки
      //console.log(this.eventPoints[i].offers); проверяю какие оферы соответсвуют данной точке
      const eventOffers = [...this.pointModel.getOffersById(this.eventPoints[i].type, this.eventPoints[i].offers)];
      const eventDestinations = [...this.pointModel.getDestinationsByName(this.eventPoints[i].name)];
      render(
        new EventPointView({ point: this.eventPoints[i], offers: eventOffers, destinations: eventDestinations }),
        this.eventListComponent.getElement()
      );
    }
  }
}
