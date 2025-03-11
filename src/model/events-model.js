import { getRandomEventPoint } from '../mock/event-point-data';
import { mockEventPointDestinations } from '../mock/destination';
import { mockEventPointOffers } from '../mock/offers';

const POINTS_COUNT = 4;

export default class PointsModel {
  points = Array.from({ length: POINTS_COUNT }, getRandomEventPoint);
  offers = mockEventPointOffers;
  destinations = mockEventPointDestinations;

  getPoints() {
    return this.points;
  }

  getOffers(){
    return this.offers;
  }

  getOffersByType(type){
    const allOffers = this.getOffers();
    return allOffers.find((el) => el.type === type).offers;

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
    //console.log(allDestinations.find((destination) => destination.name === pointsName).pictures); тут проверяю что
    // destinations по имени точки пришли правильно
    return allDestinations.find((destination) => destination.name === pointsName);
  }
}
