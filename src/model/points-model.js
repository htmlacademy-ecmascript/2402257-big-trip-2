
import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class PointsModel extends Observable{
  #points = [];
  #pointsApiService = null;
  destinations = null;
  types = null;
  offers = null;

  constructor({pointsApiService}){
    super();
    this.#pointsApiService = pointsApiService;

  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      startTime: point['date_from'] !== null ? new Date(point['date_from']) : null,
      endTime: point['date_to'] !== null ? new Date(point['date_to']) : null,
      price: point['base_price'],
      name: point['destination'],
      isFavorite: point['is_favorite'],
    };

    // Ненужные ключи мы удаляем
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];
    delete adaptedPoint['base_price'];
    delete adaptedPoint['destination'];

    return adaptedPoint;

  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.destinations = await this.#pointsApiService.destinations;
      this.offers = await this.#pointsApiService.offers;
      this.#points = points.map(this.#adaptToClient);
      this.types = this.offers.map((offer) => offer.type);
    } catch(err) {
      this.#points = [];
    }
    this._notify(UpdateType.INIT);
  }

  getPoints() {
    return this.#points;
  }

  getOffers(){
    return this.offers;
  }

  getTypes(){
    return this.types;
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
    const destinationsByName = allDestinations.find((destination) => destination.id === pointsName);
    if (destinationsByName === undefined){
      return {};
    } else {
      return destinationsByName;
    }
  }


  async updatePoints(updateType, update){
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
    this.#points = [...this.#points.slice(0, index), update, ...this.#points.slice(index + 1)];
    this._notify(updateType, update);

  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {

      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  }
}


