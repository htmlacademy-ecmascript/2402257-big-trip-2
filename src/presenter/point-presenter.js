import EditPointView from '../view/edit-event-point-view';
import EventPointView from '../view/event-point-view';
import { render, replace, remove } from '../framework/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export default class PointPresenter {

  #mode = Mode.DEFAULT;
  #pointModel = null;
  #eventPoints = [];
  #eventListComponent = null;
  #eventPointComponent = null;
  #point = null;
  #editPointComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;

  constructor({pointModel, points, eventListComponent, onDataChange, onModeChange }){
    this.#pointModel = pointModel;
    this.#eventPoints = points;
    this.#eventListComponent = eventListComponent;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }


  init(point){

    this.#point = point;

    const onDocumentKeyDown = (evt) =>{
      if (evt.key === 'Escape') {
        evt.preventDefault();
        if (this.#mode !== Mode.DEFAULT) {
          this.#editPointComponent.reset(this.#point);
          this.#replaceEditPointToPoint();
        }
      }
    };

    const prevPointComponent = this.#eventPointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    const eventOffers = [...this.#pointModel.getOffersById(point.type, point.offers)];
    const eventDestinationsAll = [...this.#pointModel.getDestinations()];
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
      },
      handleFavoriteClick: this.#handleFavoriteClick
    });

    this.#editPointComponent = new EditPointView({
      point: this.#point,
      allOffers: eventOffersByType,
      checkedOffers: eventCheckedOffers,
      destinationInfo: eventDestinations,
      allDestinations: eventDestinationsAll,
      allPoints: this.#eventPoints,
      onSubmit: (state) => {
        this.#handleEditPointClick(state);
        document.removeEventListener('keydown', onDocumentKeyDown);
      },
      cancelHandler: this.#cancelEditingHandler,
    });
    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#eventPointComponent, this.#eventListComponent);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventPointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);

  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditPointToPoint();
    }
  }

  destroy(){
    remove(this.#eventPointComponent);
    remove(this.#editPointComponent);
  }


  #replacePointToEditPoint () {
    replace(this.#editPointComponent, this.#eventPointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditPointToPoint(){
    replace(this.#eventPointComponent, this.#editPointComponent);
    this.#mode = Mode.DEFAULT;
  }

  #handlePointClick = () => {
    this.#replacePointToEditPoint();
  };

  #handleEditPointClick = (state) => {
    this.#handleDataChange(state);
    this.#replaceEditPointToPoint();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #cancelEditingHandler = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditPointToPoint();
    }
  };
}
