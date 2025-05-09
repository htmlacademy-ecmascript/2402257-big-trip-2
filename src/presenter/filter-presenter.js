import {render, replace, remove} from '../framework/render.js';
import FilterButtonsView from '../view/filter-buttons-view.js';
import {FilterType, UpdateType} from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointModel = null;

  #filterComponent = null;

  constructor({filterContainer, filterModel, pointModel, points}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointModel = pointModel;
    this.points = points;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return Object.values(FilterType).map((type) => ({
      type,
    }));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterButtonsView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange,
      points: this.#pointModel.getPoints(),
    });
    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
