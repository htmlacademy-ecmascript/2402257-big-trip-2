import { FilterType } from '../const.js';
import { isDateFuture, isDatePresent, isDatePast } from './date.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.PRESENT]: (points) => points.filter((point) => isDatePresent(point.startTime)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isDateFuture(point.startTime)),
  [FilterType.PAST]: (points) => points.filter((point) => isDatePast(point.startTime)),
};

export { filter };
