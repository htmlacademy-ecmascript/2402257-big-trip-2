import { remove, render, RenderPosition } from '../framework/render.js';
import AddEventPointView from '../view/add-event-point-view.js';
import { UserAction, UpdateType } from '../const.js';
import { getRandomNumber } from '../utils/random.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #addEventPointComponent = null;

  constructor({ pointListContainer, onDataChange, onDestroy }) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#addEventPointComponent !== null) {
      return;
    }

    this.#addEventPointComponent = new AddEventPointView({
      onSubmit: this.#handleFormSubmit,
      handleDelete: this.#handleDeleteClick,
    });
    render(this.#addEventPointComponent,this.#pointListContainer,RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#addEventPointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#addEventPointComponent);
    this.#addEventPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      // Пока у нас нет сервера, который бы после сохранения
      // выдывал честный id задачи, нам нужно позаботиться об этом самим
      { id: getRandomNumber(), ...point }
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
