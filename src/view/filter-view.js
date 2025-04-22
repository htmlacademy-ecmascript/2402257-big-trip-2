import AbstractView from '../framework/view/abstract-view.js';
import { filter } from '../utils/filter.js';


function hasPointsByFilterType(filterType, points){
  if (filter[filterType](points).length === 0) {
    return `
    disabled
    `;
  } else{
    return '';
  }
}

function createFiltersTemplate(currentfilter, currentFilterType, points){
  return `<div class="trip-filters__filter">
                  <input id="filter-${currentfilter.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${currentfilter.type}" ${currentfilter.type === currentFilterType ? 'checked' : ''} ${hasPointsByFilterType(currentfilter.type, points)}>
                  <label class="trip-filters__filter-label" for="filter-${currentfilter.type}">${currentfilter.type}</label>
                </div>`;
}

function initFilters(filters, currentFilterType, points){
  if (!filters || filters.length === 0 || !points || points.length === 0) {
    return '';
  }

  return filters
    .map((currentFilter) => createFiltersTemplate(currentFilter, currentFilterType, points))
    .join('');
}

function createNewFilterButtonsTemplate(filters, currentFilterType, points) {
  return `<form class="trip-filters" action="#" method="get">
                ${initFilters(filters, currentFilterType, points)}
                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
}


export default class FilterButtonsView extends AbstractView{
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;
  constructor({filters, currentFilterType, onFilterTypeChange, points}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;
    this.points = points;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createNewFilterButtonsTemplate(this.#filters, this.#currentFilter, this.points);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
