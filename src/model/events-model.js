import { mockEventPoint } from '../mock/event-point-data';
import { mockEventPointDestinations } from '../mock/destination';
import { mockEventPointOffers } from '../mock/offers';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable{
  #points = mockEventPoint;
  offers = mockEventPointOffers;
  destinations = mockEventPointDestinations;

  getPoints() {
    return this.#points;
  }

  getOffers(){
    return this.offers;
  }

  getOffersByType(type){
    const allOffers = this.getOffers();
    const typedOffers = allOffers.find((el) => el.type === type);

    if (typedOffers === undefined){
      return [];
    }
    return typedOffers.offers;

  }

  getOffersById(type, pointsId){

    const offersType = this.getOffersByType(type);
    //console.log(offersType); тут проверяю что правильно приходит массив с оферами
    const offersById = [];
    offersType.forEach((typedOffer) => {

      if(pointsId.some((pointOfferId) => pointOfferId === typedOffer.id)){
        offersById.push(typedOffer);

      }

    });
    //console.log(offersById); тут проверяю отсортированный массив
    return offersById;
  }

  getDestinations(){
    return this.destinations;
  }

  getDestinationsByName(pointsName){
    const allDestinations = this.getDestinations();
    const destinationsByName = allDestinations.find((destination) => destination.name === pointsName);
    if (destinationsByName === undefined){
      return {};
    } else {
      return destinationsByName;
    }
  }

  updatePoints(updateType, update){
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [...this.#points.slice(0, index), update, ...this.#points.slice(index + 1)];
    this._notify(updateType, update);

  }

  addPoint(updateType, update){
    this.#points = [update, ...this.#points];
    this._notify(updateType, update);
  }

  deletePoint(updateType, update){
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [...this.#points.slice(0, index), ...this.#points.slice(index + 1)];

    this._notify(updateType);
  }
}


