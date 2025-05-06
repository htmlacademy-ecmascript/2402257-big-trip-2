import AbstractView from '../framework/view/abstract-view.js';
import {
  humanizeEventDate,
} from '../utils/date.js';


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

  const eventStartDate = humanizeEventDate(points[0].startTime);
  let eventEndDate = humanizeEventDate(points[points.length - 1].endTime);

  if (points.length > 1){
    return `<p class="trip-info__dates">${eventStartDate} — ${eventEndDate}</p>`;
  } else {
    eventEndDate = humanizeEventDate(points[0].endTime);
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

function createPriceTemplate(){
  return `<p class="trip-info__cost">
              Total: €&nbsp;<span class="trip-info__cost-value">1230</span>
              </p>`;
}

function createTripInfoTemplate(points, destinations) {
  return `<section class="trip-main__trip-info  trip-info">
            ${createTripMainInfoTemplate(points, destinations)}
            ${createPriceTemplate()}
            </section>`;
}

export default class TripInfoView extends AbstractView{

  #points = null;
  #destinations = null;

  constructor({points, destinations}){
    super();
    this.#points = points;
    this.#destinations = destinations;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinations);
  }
}
