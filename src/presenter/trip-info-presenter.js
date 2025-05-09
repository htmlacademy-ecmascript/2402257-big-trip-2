import {render, replace, remove} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import { RenderPosition } from '../framework/render.js';
import { FilterType } from '../const.js';
import { filter } from '../utils/filter.js';
import { sortPointDay } from '../utils/sort.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #pointModel = null;
  #tripInfoComponent = null;
  #filterModel = null;
  #filterType = FilterType.EVERYTHING;

  constructor({tripInfoContainer, pointModel, filterModel}) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#pointModel.addObserver(this.#handleModelEvents);
  }


  init() {

    if (this.#pointModel.getPoints() === null){
      return;
    }

    this.#filterType = this.#filterModel.filter;
    const filteredPoints = filter[this.#filterType](this.#pointModel.getPoints()).sort(sortPointDay);

    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView ({
      points: filteredPoints,
      destinations: this.#pointModel.getDestinations(),
      allOffers: this.#pointModel.getOffers(),
    });

    if (prevTripInfoComponent === null){
      render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #handleModelEvents = () => {
    this.init();
  };

}
