import {render, replace, remove} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import { RenderPosition } from '../framework/render.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #pointModel = null;
  #tripInfoComponent = null;

  constructor({tripInfoContainer, pointModel}) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModelEvents);
  }


  init() {

    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView ({
      points: this.#pointModel.getPoints(),
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
