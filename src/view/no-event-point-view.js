import AbstractView from '../framework/view/abstract-view.js';

import {FilterType} from '../const.js';

const NoTasksTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

function createNoEventPointTemplate(filterType) {
  return `<p class="trip-events__msg">
          ${NoTasksTextType[filterType]}
        </p>`;
}
export default class NoEventPointView extends AbstractView{

  #filterType = null;

  constructor({filterType}){
    super();
    this.#filterType = filterType;
  }

  get template(){
    return createNoEventPointTemplate(this.#filterType);
  }
}
