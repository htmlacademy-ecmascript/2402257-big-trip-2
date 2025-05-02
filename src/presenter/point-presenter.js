import EditPointView from '../view/edit-event-point-view';
import EventPointView from '../view/event-point-view';
import { render, replace, remove } from '../framework/render';
import { UserAction, UpdateType } from '../const.js';
import { SortType } from '../const.js';

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
  #currentSortType = null;

  constructor({
    pointModel,
    points,
    eventListComponent,
    onDataChange,
    onModeChange,
    currentSortType,
  }) {
    this.#pointModel = pointModel;
    this.#eventPoints = points;
    this.#eventListComponent = eventListComponent;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#currentSortType = currentSortType;
  }

  init(point) {
    this.#point = point;

    const onDocumentKeyDown = (evt) => {
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

    const eventOffers = [
      ...this.#pointModel.getOffersById(point.type, point.offers),
    ];
    const eventDestinationsAll = [...this.#pointModel.getDestinations()];
    const eventDestinations = {
      ...this.#pointModel.getDestinationsByName(point.name),
    };
    const eventOffersByType = this.#pointModel.getOffersByType(point.type);
    const eventCheckedOffers = this.#pointModel.getOffersById(
      point.type,
      point.offers
    );
    const allTypesOffers = this.#pointModel.getOffers();
    const allTypes = this.#pointModel.getTypes();

    this.#eventPointComponent = new EventPointView({
      point: this.#point,
      offers: eventOffers,
      destinationInfo: eventDestinations,
      onEditClick: () => {
        this.#handlePointClick();
        document.addEventListener('keydown', onDocumentKeyDown);
      },
      handleFavoriteClick: this.#handleFavoriteClick,
    });

    this.#editPointComponent = new EditPointView({
      point: this.#point,
      allOffers: eventOffersByType,
      allTypesOffers: allTypesOffers,
      allTypes: allTypes,
      checkedOffers: eventCheckedOffers,
      destinationInfo: eventDestinations,
      allDestinations: eventDestinationsAll,
      allPoints: this.#eventPoints,
      onSubmit: (state) => {
        this.#handleEditPointClick(state);
        document.removeEventListener('keydown', onDocumentKeyDown);
      },
      handleCancel: this.#cancelEditingHandler,
      handleDelete: this.#handleDelete,
    });
    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#eventPointComponent, this.#eventListComponent);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventPointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventPointComponent, prevEditPointComponent);
      this.#mode = Mode.DEFAULT;
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

  destroy() {
    remove(this.#eventPointComponent);
    remove(this.#editPointComponent);
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#eventPointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editPointComponent.shake(resetFormState);
  }

  #replacePointToEditPoint() {
    replace(this.#editPointComponent, this.#eventPointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditPointToPoint() {
    replace(this.#eventPointComponent, this.#editPointComponent);
    this.#mode = Mode.DEFAULT;
  }

  #handlePointClick = () => {
    this.#replacePointToEditPoint();
  };

  #handleEditPointClick = (state) => {
    let isPatchUpdate = UpdateType.MAJOR;

    switch (this.#currentSortType) {
      case SortType.TIME:
        if (
          this.#point.startTime !== state.startTime ||
          this.#point.endTime !== state.endTime
        ) {
          isPatchUpdate = UpdateType.MINOR;
        }
        break;
      case SortType.PRICE:
        if (this.#point.price !== state.price) {
          isPatchUpdate = UpdateType.MINOR;
        }
        break;
      case SortType.DAY:
        if (this.#point.startTime !== state.startTime){
          isPatchUpdate = UpdateType.MINOR;
        }
    }
    this.#handleDataChange(UserAction.UPDATE_POINT, isPatchUpdate, state);
    //this.#replaceEditPointToPoint();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(UserAction.UPDATE_POINT, UpdateType.MINOR, {
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    });
  };

  #cancelEditingHandler = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditPointToPoint();
    }
  };

  #handleDelete = (point) => {
    this.#handleDataChange(UserAction.DELETE_POINT, UpdateType.MINOR, point);
  };
}
