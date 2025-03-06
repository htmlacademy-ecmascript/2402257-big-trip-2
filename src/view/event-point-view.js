import { createElement } from '../render.js';
import { humanizeEventDate, humanizeEventTime } from '../util.js';
//import { pointOffersView } from './point-offers-view.js';

// здесь создать темплейт для оффера, будет возвращать разметку для офера и будем это вставлять
// на 35 строке до тех пор пока оферы не закончатся

function createEventPointTemplate(point) {
  const { type, name, startTime, endTime, price } = point;

  const eventStartDate = humanizeEventDate(startTime);
  const eventEndDate = humanizeEventDate(endTime);
  const eventStartTime = humanizeEventTime(startTime);
  const eventEndTime = humanizeEventTime(endTime);

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${eventStartDate}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${eventStartDate}">${eventStartTime}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${eventEndDate}">${eventEndTime}</time>
                  </p>
                  <p class="event__duration">1H 30M</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">


                </ul>
                <button class="event__favorite-btn" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}

export default class EventPointView {
  constructor({ point, offers, destinations }) {
    this.offers = offers;
    this.destinations = destinations;
    this.point = point;
  }

  getTemplate() {
    return createEventPointTemplate(this.point, this.offers, this.destinations);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
