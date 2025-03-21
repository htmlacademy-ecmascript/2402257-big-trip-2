import AddPointView from '../view/add-event-point-view';
import EditPointView from '../view/edit-event-point-view';
import EventListView from '../view/event-list-view';
import EventPointView from '../view/event-point-view';
import { render, replace } from '../framework/render';
import FilterButtonsView from '../view/filter-view.js';
import SortButtonsView from '../view/sort-view.js';
import NoEventPointView from '../view/no-event-point-view.js';
export default class EventPresenter {

  #listContainer = null;
  #pointModel = null;
  #eventListComponent = new EventListView();
  #eventPoints = [];
  #filterContainer = null;

  constructor({ listContainer, pointModel, filterContainer }) {
    this.#listContainer = listContainer;
    this.#pointModel = pointModel;
    this.#filterContainer = filterContainer;
  }

  init() {
    this.#eventPoints = [...this.#pointModel.getPoints()];
    this.#renderFilterView();
    if (this.#eventPoints.length === 0){
      render(new NoEventPointView(), this.#listContainer);
      return;
    }
    this.#renderSortView();
    this.#renderEventListView();
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

    render(
      eventPointComponent,
      this.#eventListComponent.element
    );

    function replacePointToEditPoint(){
      replace(editPointComponent, eventPointComponent);
    }

    function replaceEditPointToPoint(){
      replace(eventPointComponent, editPointComponent);
    }


  }

  #renderEventListView(){
    render(this.#eventListComponent, this.#listContainer);

    //this.#renderEditPointView(this.#eventPoints[0]);

    // this.#renderAddPointView(this.#eventPoints[1]);

    for (let i = 0; i < this.#eventPoints.length; i++){
      this.#renderEventPointView(this.#eventPoints[i]);
    }
  }

  #renderSortView(){
    render(new SortButtonsView(), this.#listContainer);
  }

  #renderFilterView(){
    render(new FilterButtonsView(), this.#filterContainer);
  }

}
