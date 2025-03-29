import EditPointView from '../view/edit-event-point-view';
import EventPointView from '../view/event-point-view';
import { render, replace, remove } from '../framework/render';

export default class PointPresenter {

  #pointModel = null;
  #eventPoints = [];
  #eventListComponent = null;
  #eventPointComponent = null;
  #point = null;
  #editPointComponent = null;

  constructor({pointModel, points, eventListComponent }){
    this.#pointModel = pointModel;
    this.#eventPoints = points;
    this.#eventListComponent = eventListComponent;
  }


  init(point){

    this.#point = point;

    const onDocumentKeyDown = (evt) =>{
      if (evt.key === 'Escape'){
        evt.preventDefault();
        this.#replaceEditPointToPoint();
        document.removeEventListener('keydown', onDocumentKeyDown);
      }
    };

    const prevPointComponent = this.#eventPointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    const eventOffers = [...this.#pointModel.getOffersById(point.type, point.offers)];
    const eventDestinations = { ...this.#pointModel.getDestinationsByName(point.name) };
    const eventOffersByType = this.#pointModel.getOffersByType(point.type);
    const eventCheckedOffers = this.#pointModel.getOffersById(point.type, point.offers);

    this.#eventPointComponent = new EventPointView({
      point: this.#point,
      offers: eventOffers,
      destinations: eventDestinations,
      onEditClick: () => {
        this.#handlePointClick();
        document.addEventListener('keydown', onDocumentKeyDown);
      }
    });

    this.#editPointComponent = new EditPointView({
      point: this.#point,
      allOffers: eventOffersByType,
      checkedOffers: eventCheckedOffers,
      destinationInfo: eventDestinations,
      allPoints: this.#eventPoints,
      onSubmit: () => {
        this.#handleEditPointClick();
        document.removeEventListener('keydown', onDocumentKeyDown);
      }
    });
    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#eventPointComponent, this.#eventListComponent.element);
      return;
    }

    if (this.#eventListComponent.contains(prevPointComponent.element)) {
      replace(this.#eventPointComponent, prevPointComponent);
    }

    if (this.#eventListComponent.contains(prevEditPointComponent.element)) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);

  }

  destroy(){
    remove(this.#eventPointComponent);
    remove(this.#editPointComponent);
  }

  #replacePointToEditPoint () {
    replace(this.#editPointComponent, this.#eventPointComponent);
  }

  #replaceEditPointToPoint(){
    replace(this.#eventPointComponent, this.#editPointComponent);
  }

  #handlePointClick = () => {
    this.#replacePointToEditPoint();
  };

  #handleEditPointClick = () => {
    this.#replaceEditPointToPoint();
  };
}
