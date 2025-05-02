import TripInfoView from '../view/trip-info-view.js';
import { render, replace, remove } from '../framework/render.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #tripInfoComponent = null;
  constructor({tripInfoContainer, pointModel, points}){
    this.#tripInfoContainer = tripInfoContainer;
    this.points = points;
    this.pointModel = pointModel;
  }


  init(){

    const prevTripInfoComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new TripInfoView({
      points: this.points
    });

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#tripInfoContainer);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #handelPointsChange(){
    this.init();
  }

}
