const EVENT_TYPES = ['taxi', 'flight', 'train', 'ship', 'drive', 'check-in', 'sightseeing', 'restaurant'];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};

export { EVENT_TYPES, FilterType, SortType };
