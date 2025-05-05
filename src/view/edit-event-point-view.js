import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { capitalizeFirstLetter, localizeDateFormat } from '../utils/date.js';
import flatpickr from 'flatpickr';
import he from 'he';
import 'flatpickr/dist/flatpickr.min.css';

const checked = 'checked';
const unchecked = '';

function validateName(name, allDestinations){
  return allDestinations.some((destination) => destination.name === name);
}

function checkIfValid(name, startTime, endTime, allDestinations, isDisabled) {
  if (name === '' || !startTime || !endTime || validateName(name, allDestinations) === false || isDisabled) {
    return 'disabled';
  }
  return '';

}

function createOffersTemplate(title, price, id, name, checkStatus, isDisabled) {
  return ` <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="${name}" ${checkStatus} ${isDisabled ? 'disabled' : ''}>
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

function initDestinationListOptions(allDestinations){

  const allEventNames = [...new Set(allDestinations.map((currentDestination) => currentDestination.name))];

  if (!allEventNames || allEventNames.length === 0) {
    return '';
  }

  return allEventNames
    .map((name) => createDestinationListOption(capitalizeFirstLetter(name)))
    .join('');
}

function initEventTypesItemTemplate(allTypes){

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

function createDescriptionPicturesTemplate(destinationInfo){

  return `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destinationInfo?.description ?? ''}</p>
                    ${destinationInfo.pictures.length === 0 ? '' : `
                      <div class="event__photos-container">
                      <div class="event__photos-tape">
                       ${initPictures(destinationInfo.pictures)}
                      </div>
                    </div>`}
            </section>`;

}

function initOffersTemplate(allOffers, offers, isDisabled) {
  return `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
      ${allOffers
    .map((currentOffer) => {
      const isChecked = offers.some((offer) => offer.id === currentOffer.id);
      return createOffersTemplate(
        currentOffer.title,
        currentOffer.price,
        currentOffer.id,
        currentOffer.name,
        isChecked ? checked : unchecked,
        isDisabled
      );
    }).join('')}
              </div>
            </section>`;
}

function createEditPointTemplate({type, startTime, endTime, price , allOffers, checkedOffers, destinationInfo , allDestinations, allTypes, isSaving, isDeleting, isDisabled}) {

  const eventStartDate = localizeDateFormat(startTime);
  const eventEndDate = localizeDateFormat(endTime);

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                          ${initEventTypesItemTemplate(allTypes)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destinationInfo.name)}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
                    <datalist id="destination-list-1">
                      ${initDestinationListOptions(allDestinations)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input event__input--time event__input--time-1" id="event-start-time-1" type="text" name="event-start-time" value="${eventStartDate}" ${isDisabled ? 'disabled' : ''}>&mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time event__input--time-2" id="event-end-time-1" type="text" name="event-end-time" value="${eventEndDate}" ${isDisabled ? 'disabled' : ''}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" pattern="^[ 0-9]+$" name="event-price" value="${price}" min="1" ${isDisabled ? 'disabled' : ''}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${checkIfValid(destinationInfo.name, startTime, endTime, allDestinations, isDisabled)}>${isSaving ? 'Saving...' : 'Save'}</button>
                  <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                ${allOffers.length === 0 ? '' : initOffersTemplate(allOffers, checkedOffers, isDisabled)}
                ${destinationInfo.pictures.length === 0 && !(destinationInfo.description) ? '' : createDescriptionPicturesTemplate(destinationInfo)}

                </section>
              </form>
            </li>`;
}

export default class EditEventPointView extends AbstractStatefulView{
  #handleSubmit = null;
  #handleDelete = null;
  #datepickerStart = null;
  #datepickerEnd = null;

  constructor({point, allOffers, allTypesOffers, checkedOffers, destinationInfo, allDestinations, allPoints, onSubmit, handleCancel, handleDelete, allTypes }){
    super();
    this.pointData = { ...point, allOffers, checkedOffers, destinationInfo, allPoints, allDestinations, allTypes };
    this.allDestinations = allDestinations;
    this.allTypesOffers = allTypesOffers;
    this.handleCancel = handleCancel;
    this._setState(EditEventPointView.parsePointToState(this.pointData));
    this.#handleSubmit = onSubmit;
    this.#handleDelete = handleDelete;
    this._restoreHandlers();
    this.allTypes = this.#getAllTypes(allTypesOffers);
  }

  _restoreHandlers(){
    this.formElement.addEventListener('submit', this.#submitHandler);
    this.rollUpButton.addEventListener('click', this.#clickHandler);
    this.pointTypeParentElement.addEventListener('change', this.#pointTypeHandler);
    this.pointDestinationTextInput.addEventListener('change', this.#pointDestinationHandler);
    this.deleteButton.addEventListener('click', this.#pointDeleteHandler);
    this.pointPriceInput.addEventListener('change', this.#pointPriceHandler);
    this.eventOffersContainer.addEventListener('click', this.#eventOffersHandler);
    this.#setDatepicker();
  }

  get formElement(){
    return this.element.querySelector('.event--edit');
  }

  get saveButton(){
    return this.element.querySelector('.event__save-btn');
  }

  get rollUpButton(){
    return this.element.querySelector('.event__rollup-btn');
  }

  get pointTypeParentElement(){
    return this.element.querySelector('.event__type-group');
  }

  get pointDestinationTextInput(){
    return this.element.querySelector('.event__input--destination');
  }

  get deleteButton(){
    return this.element.querySelector('.event__reset-btn');
  }

  get pointPriceInput(){
    return this.element.querySelector('.event__input--price');
  }

  get template() {
    return createEditPointTemplate(this._state);
  }

  get eventOffersContainer(){
    return this.element.querySelector('.event__details');
  }

  static parsePointToState(point){
    return {...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state){

    const point = {...state};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;


  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerStart && this.#datepickerEnd){
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }

  }

  #getAllTypes(data){
    return data.map((item) => item.type);
  }

  #dueDateStartChangeHandler = ([userStartDate]) => {
    this.updateElement({
      startTime: userStartDate
    });
  };

  #dueDateEndChangeHandler = ([userEndDate]) => {
    this.updateElement({
      endTime: userEndDate
    });
  };


  #setDatepicker(){
    this.#datepickerStart = flatpickr(
      this.element.querySelector('.event__input--time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        maxDate: this._state.endTime,
        defaultDate: this._state.startTime,
        onChange: this.#dueDateStartChangeHandler
      }
    );
    this.#datepickerStart = flatpickr(
      this.element.querySelector('.event__input--time-2'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        minDate: this._state.startTime,
        defaultDate: this._state.endTime,
        onChange: this.#dueDateEndChangeHandler
      }
    );
  }

  #pointTypeHandler = (evt) => {
    this.updateElement({type: evt.target.value, offers: [], checkedOffers: [], allOffers: this.#getOffersByType(evt.target.value) });
  };

  #pointDestinationHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({ destinationInfo: this.#findDestinationInfo(evt.target.value), name: this.#findNewId(evt.target.value) });
  };

  #getOffersByType = (type) => {
    const typedOffers = this.allTypesOffers.find((el) => el.type === type);

    if (typedOffers === undefined){
      return [];
    } else{
      return typedOffers.offers;
    }
  };

  #findDestinationInfo = (name) => {
    const destinationsByName = this.allDestinations.find((destination) => destination.name === name);
    if (!(destinationsByName)){
      return {
        name: '',
        pictures: [],
        description: '',
      };
    }
    return destinationsByName;
  };

  #findNewId = (name) => {
    const destinationsByName = this.allDestinations.find((destination) => destination.name === name);
    if (!(destinationsByName)){
      return '';
    }
    return destinationsByName.id;
  };


  #submitHandler = (evt) =>{
    evt.preventDefault();
    this.#handleSubmit(EditEventPointView.parseStateToPoint(this._state));
  };

  #clickHandler = (evt) =>{
    evt.preventDefault();
    this.handleCancel();
  };

  #pointPriceHandler = (evt) => {
    this.updateElement({price: +evt.target.value});
  };

  #pointDeleteHandler = (evt) => {
    evt.preventDefault();
    this.#handleDelete(EditEventPointView.parseStateToPoint(this._state));
  };

  reset(point) {
    this.updateElement({...EditEventPointView.parsePointToState(point),
      allOffers: this.#getOffersByType(point.type),
    }
    );
  }

  #eventOffersHandler = (evt) => {
    if (evt.target.classList.contains('event__offer-checkbox')){

      if (this._state.offers.includes(evt.target.id)){
        this._state.offers = this._state.offers.filter((offer) => offer !== +evt.target.id);

      } else {
        this._state.offers.push(evt.target.id);
        this._setState({allOffers: this.#getOffersByType(this._state.type)});
        this._setState({checkedOffers: this._state.allOffers.filter((offer) => this._state.offers.includes(offer.id))});
      }
    }
  };
}
