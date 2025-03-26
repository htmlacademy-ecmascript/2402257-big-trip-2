import EditPointView from '../view/edit-event-point-view';
import EventPointView from '../view/event-point-view';
import { render, replace } from '../framework/render';

export default class PointPresenter {

  #pointModel = null;
  #eventPoints = [];
  #eventListComponent = null;
  #listContainer = null;
  #eventPointComponent = null;
  #editPointComponent = null;

  constructor({pointModel, points, eventListComponent, listContainer }){
    this.#pointModel = pointModel;
    this.#eventPoints = points;
    this.#eventListComponent = eventListComponent;
    this.#listContainer = listContainer;
  }

  #renderEventPointView(point) {
    const onDocumentKeyDown = (evt) =>{
      if (evt.key === 'Escape'){
        evt.preventDefault();
        replaceEditPointToPoint();
        document.removeEventListener('keydown', onDocumentKeyDown);
      }
    };


    const eventOffers = [...this.#pointModel.getOffersById(point.type, point.offers)];
    const eventDestinations = { ...this.#pointModel.getDestinationsByName(point.name) };
    const eventOffersByType = this.#pointModel.getOffersByType(point.type);
    const eventCheckedOffers = this.#pointModel.getOffersById(point.type, point.offers);

    const eventPointComponent = new EventPointView({
      point: point,
      offers: eventOffers,
      destinations: eventDestinations,
      onEditClick: () => {
        replacePointToEditPoint();
        document.addEventListener('keydown', onDocumentKeyDown);
      }
    });

    const editPointComponent = new EditPointView({
      point: point,
      allOffers: eventOffersByType,
      checkedOffers: eventCheckedOffers,
      destinationInfo: eventDestinations,
      allPoints: this.#eventPoints,
      onSubmit: () => {
        replaceEditPointToPoint();
        document.removeEventListener('keydown', onDocumentKeyDown);
      }
    });

    render(eventPointComponent, this.#eventListComponent.element);

    function replacePointToEditPoint(){
      replace(editPointComponent, eventPointComponent);
    }

    function replaceEditPointToPoint(){
      replace(eventPointComponent, editPointComponent);
    }
  }


  init(){
    render(this.#eventListComponent, this.#listContainer);


    for (let i = 0; i < this.#eventPoints.length; i++){
      this.#renderEventPointView(this.#eventPoints[i]);
    }
  }
}
