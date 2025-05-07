import AbstractView from '../framework/view/abstract-view.js';
import {
  humanizeEventDate,
} from '../utils/date.js';
import { sortPointDay, sortPointDayEnd } from '../utils/sort.js';

function getRouteNames(points, destinations) {

  const startDestination = destinations.find((destination) => destination.id === points[0].name);

  const endDestination = destinations.find((destination) => destination.id === points[points.length - 1].name);

  if (points.length > 3) {
    return `${startDestination.name} — ... — ${endDestination.name}`;
  }

  if (points.length === 3) {
    const middleDestination = destinations.find((destination) => destination.id === points[1].name);
    return `${startDestination.name} — ${middleDestination.name} — ${endDestination.name}`;
  }

  if (points.length === 2) {
    return `${startDestination.name} — ${endDestination.name}`;
  }

  if (points.length === 1) {
    return `${startDestination.name}`;
  }
}

function getRouteDateDuration(points){
  const firstDate = [...points.sort(sortPointDay)][0].startTime;
  const lastDate = [...points.sort(sortPointDayEnd)][points.length - 1].endTime;
  const eventStartDate = humanizeEventDate(firstDate);
  let eventEndDate = humanizeEventDate(lastDate);

  if (points.length > 1){
    return `<p class="trip-info__dates">${eventStartDate} — ${eventEndDate}</p>`;
  } else {
    eventEndDate = humanizeEventDate(lastDate);
    return `<p class="trip-info__dates">${eventStartDate} — ${eventEndDate}</p>`;
  }
}

function createTripMainInfoTemplate(points, destinations){
  if (points.length === 0){
    return '';
  }

  return `<div class="trip-info__main">
                    <h1 class="trip-info__title">${getRouteNames(points, destinations)}</h1>

                    ${getRouteDateDuration(points)}
              </div>`;
}

function createPriceTemplate(points, offers){
  if (points.length === 0){
    return '';
  }

  let totalPrice = 0;
  const allOffers = [];
  const allSelectedOffers = [];
  offers.map((offer) => allOffers.push(...offer.offers));
  points.map((point) => {
    allSelectedOffers.push(...point.offers);
    totalPrice += point.price;
  });
  allSelectedOffers.map((selectedOffer) => {
    allOffers.map((offer) => {
      if (offer.id === selectedOffer){
        totalPrice += offer.price;
      }
    });
  });

  return `<p class="trip-info__cost">
              Total: €&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
              </p>`;
}

function createTripInfoTemplate(points, destinations, offers) {
  return `<section class="trip-main__trip-info  trip-info">
            ${createTripMainInfoTemplate(points, destinations)}
            ${createPriceTemplate(points, offers)}
            </section>`;
}

export default class TripInfoView extends AbstractView{

  #points = null;
  #destinations = null;
  #offers = null;
  constructor({points, destinations, allOffers}){
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = allOffers;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}
