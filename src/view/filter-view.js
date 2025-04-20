import AbstractView from '../framework/view/abstract-view.js';


function createFiltersTemplate(filter, currentFilterType){
  return `<div class="trip-filters__filter">
                  <input id="filter-${filter.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.type}" ${filter.type === currentFilterType ? 'checked' : ''}>
                  <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.type}</label>
                </div>`;
}

function initFilters(filters, currentFilterType){
  if (!filters || filters.length === 0) {
    return '';
  }

  return filters
    .map((filter) => createFiltersTemplate(filter, currentFilterType))
    .join('');
}

function createNewFilterButtonsTemplate(filters, currentFilterType) {
  return `<form class="trip-filters" action="#" method="get">
                ${initFilters(filters, currentFilterType)}
                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
}


export default class FilterButtonsView extends AbstractView{
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;
  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createNewFilterButtonsTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
