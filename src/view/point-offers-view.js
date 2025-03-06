import { createElement } from '../render.js';

function createPointOffersTemplate() {
  return ` <li class="event__offer">
              <span class="event__offer-title">Switch to comfort</span>
                    &plus;&euro;&nbsp;
              <span class="event__offer-price">80</span>
          </li>`;
}

export default class pointOffersView {
  getTemplate() {
    return createPointOffersTemplate();
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
