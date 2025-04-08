import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { capitalizeFirstLetter, localizeDateFormat } from '../utils/date.js';
import { EVENT_TYPES } from '../const.js';

const checked = 'checked';
const unchecked = 'unchecked';

function createOffersTemplate(title, price, id, name, checkStatus) {
  return ` <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="${name}" ${checkStatus}="">
              <label class="event__offer-label" for="${id}">
                  <span class="event__offer-title">${title}</span>
                    +€&nbsp;
                  <span class="event__offer-price">${price}</span>
              </label>
            </div>`;
}

function createDescriptionPictureTemplate(src, description){

  return ` <img class="event__photo" src="${src}" alt="${description}">`;

}

function createEventTypeItemTemplate(pointType){
  return ` <div class="event__type-item">
                          <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}">
                          <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${capitalizeFirstLetter(pointType)}</label>
                        </div>`;
}

function createDestinationListOption(destinationName){
  return ` <option value="${destinationName}"></option>`;
}

function initDestinationListOptions(allPoints){
  const allEventNames = [...new Set(allPoints.map((currentPoint) => currentPoint.name))];

  if (!allEventNames || allEventNames.length === 0) {
    return '';
  }

  return allEventNames
    .map((name) => createDestinationListOption(capitalizeFirstLetter(name)))
    .join('');
}

function initEventTypesItemTemplate(){
  const allTypes = EVENT_TYPES;

  if (!allTypes || allTypes.length === 0) {
    return '';
  }

  return allTypes
    .map((type) => createEventTypeItemTemplate(type))
    .join('');
}

function initPictures(pictures){
  if (!pictures || pictures.length === 0) {
    return '';
  }

  return pictures
    .map((picture) => createDescriptionPictureTemplate(picture.src, picture.description))
    .join('');
}

function createDescriptionPicturesTemplate(pictures){
  return `<div class="event__photos-container">
                      <div class="event__photos-tape">
                       ${initPictures(pictures)}
                      </div>
                    </div>`;

}

function initOffersTemplate(allOffers, offers) {
  return allOffers
    .map((currentOffer) => {
      const isChecked = offers.some((offer) => offer.id === currentOffer.id);

      return createOffersTemplate(
        currentOffer.title,
        currentOffer.price,
        currentOffer.id,
        currentOffer.name,
        isChecked ? checked : unchecked
      );
    })
    .join('');
}

function createEditPointTemplate(point, allOffers, checkedOffers, destinationInfo, allPoints) {

  const { infoText, pictures} = destinationInfo;

  const { type, name, startTime, endTime, price} = point;

  const eventStartDate = localizeDateFormat(startTime);
  const eventEndDate = localizeDateFormat(endTime);

  const capitalizedName = capitalizeFirstLetter(name);

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                          ${initEventTypesItemTemplate()}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${capitalizedName}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${initDestinationListOptions(allPoints)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventStartDate}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventEndDate}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${initOffersTemplate(allOffers, checkedOffers)}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${infoText}</p>

                    ${createDescriptionPicturesTemplate(pictures)}

                  </section>
                </section>
              </form>
            </li>`;
}

export default class EditEventPointView extends AbstractStatefulView{
  #handleSubmit = null;

  constructor({point, allOffers, checkedOffers, destinationInfo, allPoints, onSubmit }){
    super();
    this._setState(EditEventPointView.parsePointToState(point));
    this.allOffers = allOffers;
    this.checkedOffers = checkedOffers;
    this.destinationInfo = destinationInfo;
    this.allPoints = allPoints;
    this.#handleSubmit = onSubmit;
    this.saveButton.addEventListener('submit', this.#submitHandler);
    this.rollUpButton.addEventListener('click', this.#clickHandler);
  }

  get saveButton(){
    return this.element.querySelector('.event--edit');
  }

  get rollUpButton(){
    return this.element.querySelector('.event__rollup-btn');
  }

  get template() {
    return createEditPointTemplate(this._state,this.allOffers, this.checkedOffers, this.destinationInfo, this.allPoints);
  }

  static parsePointToState(point){
    return {...point};
  }

  static parseStateToPoint(state){
    return {...state};
  }

  #submitHandler = (evt) =>{
    evt.preventDefault();
    this.#handleSubmit(EditEventPointView.parseStateToPoint(this._state));
  };

  #clickHandler = (evt) =>{
    evt.preventDefault();
    this.#handleSubmit();
  };
}
