import AbstractView from '../framework/view/abstract-view.js';

function isChecked(filter){
  return filter.count === 0 ? 'disabled' : 'unchecked';
}
function createFiltersTemplate(filter){
  return `<div class="trip-filters__filter">
                  <input id="filter-${filter.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.type}" ${isChecked(filter)}>
                  <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.type}</label>
                </div>`;
}

function initFilters(filters){
  if (!filters || filters.length === 0) {
    return '';
  }

  return filters
    .map((filter) => createFiltersTemplate(filter))
    .join('');
}

function createNewFilterButtonsTemplate(filters) {
  return `<form class="trip-filters" action="#" method="get">
                ${initFilters(filters)}
                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
}


export default class FilterButtonsView extends AbstractView{
  #filters = null;
  constructor({filters}){
    super();
    this.#filters = filters;
  }

  get template() {
    return createNewFilterButtonsTemplate(this.#filters);
  }
}
