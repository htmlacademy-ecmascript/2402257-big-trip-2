import AbstractView from '../framework/view/abstract-view.js';

function createNoEventPointTemplate() {
  return `<p class="trip-events__msg">
          Failed to load latest route information
        </p>`;
}
export default class FailedToLoadView extends AbstractView{

  constructor(){
    super();
  }

  get template(){
    return createNoEventPointTemplate();
  }
}
