import { remove, render, RenderPosition } from '../framework/render.js';
import AddEventPointView from '../view/add-event-point-view.js';
import { UserAction, UpdateType } from '../const.js';

const BLANCK_TYPE = 'flight';
export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #addEventPointComponent = null;

  constructor({ pointListContainer, onDataChange, onDestroy, pointModel }) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.pointModel = pointModel;

  }

  init() {
    if (this.#addEventPointComponent !== null) {
      return;
    }

    const allTypesOffers = this.pointModel.getOffers();
    const allTypes = this.pointModel.getTypes();

    this.#addEventPointComponent = new AddEventPointView({
      onSubmit: this.#handleFormSubmit,
      handleCancel: this.#handleCancelClick,
      allDestinations: this.pointModel.getDestinations(),
      allOffers: this.pointModel.getOffersByType(BLANCK_TYPE),
      allTypesOffers: allTypesOffers,
      allTypes: allTypes,
    });
    render(this.#addEventPointComponent,this.#pointListContainer,RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#addEventPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#addEventPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
      });
    };

    this.#addEventPointComponent.shake(resetFormState);
  }


  destroy() {
    if (this.#addEventPointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#addEventPointComponent);
    this.#addEventPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
