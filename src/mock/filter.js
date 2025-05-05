import { filter } from '../utils/filter';

function generateFilter(points) {
  return Object.entries(filter).map(
    ([filterType, filterPoints]) => ({
      type: filterType,
      count: filterPoints(points).length,
      filteredPoints: filterPoints(points)
    }),
  );
}

export { generateFilter };
