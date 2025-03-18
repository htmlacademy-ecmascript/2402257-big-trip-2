import AbstractView from '../framework/view/abstract-view.js';
import { humanizeEventDate, humanizeEventTime, capitalizeFirstLetter, getEventTimeDuration } from '../util.js';

function createPointOffersTemplate(title, price) {
  return ` <li class="event__offer">
              <span class="event__offer-title">${title}</span>
                    &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
          </li>`;
}

function parseOffersInfo(offers) {
  if (!offers || offers.length === 0) {
    return '';
  }

  return offers
    .map((offer) => createPointOffersTemplate(offer.title, offer.price))
    .join('');
}

function createEventPointTemplate(point, offers) {
  const { type, name, startTime, endTime, price, isFavorite } = point;

  const eventStartDate = humanizeEventDate(startTime);
  const eventEndDate = humanizeEventDate(endTime);
  const eventStartTime = humanizeEventTime(startTime);
  const eventEndTime = humanizeEventTime(endTime);

  const capitalizedName = capitalizeFirstLetter(name);
  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${eventStartDate}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${capitalizedName}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${eventStartDate}">${eventStartTime}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${eventEndDate}">${eventEndTime}</time>
                  </p>
                  <p class="event__duration">${getEventTimeDuration(startTime ,endTime)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">

                  ${parseOffersInfo(offers)}

                </ul>
                <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
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

export default class EventPointView extends AbstractView{
  #handleClick = null;

  constructor({ point, offers, descriptionInfo, onClick }) {
    super();
    this.#handleClick = onClick;
    this.offers = offers;
    this.destinations = descriptionInfo;
    this.point = point;
    this.rollUpButtonElement.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createEventPointTemplate(this.point, this.offers, this.destinations);
  }

  get rollUpButtonElement() {
    return this.element.querySelector('.event__rollup-btn');
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
