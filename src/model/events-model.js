import { mockEventPoint } from '../mock/event-point-data';
import { mockEventPointDestinations } from '../mock/destination';
import { mockEventPointOffers } from '../mock/offers';


export default class PointsModel {
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
}
