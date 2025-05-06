import {render, replace, remove} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import { RenderPosition } from '../framework/render.js';
import { FilterType } from '../const.js';
import { filter } from '../utils/filter.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #pointModel = null;
  #tripInfoComponent = null;
  #points = null;
  #filterModel = null;
  #filterType = FilterType.EVERYTHING;

  constructor({tripInfoContainer, pointModel, points, filterModel}) {
    this.#filterModel = filterModel;
    this.#tripInfoContainer = tripInfoContainer;
    this.#pointModel = pointModel;
    this.#points = points;
    this.#pointModel.addObserver(this.#handleModelEvents);
    this.#filterModel.addObserver(this.#handleModelEvents);
  }


  init() {

    this.#filterType = this.#filterModel.filter;
    console.log(this.#filterType);
    const filteredPoints = filter[this.#filterType](this.#pointModel.getPoints());

    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView ({
      points: filteredPoints,
      destinations: this.#pointModel.getDestinations(),
    });

    if (prevTripInfoComponent === null){
      render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }


  #getPrice = () => {
    //opppopo
  };

  #handleModelEvents = () => {
    this.init();
  };

}
