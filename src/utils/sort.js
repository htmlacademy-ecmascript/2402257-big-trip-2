import dayjs from 'dayjs';

function getWeightForNullStartDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function getEventTimeDuration({startTime, endTime}){
  const start = dayjs(startTime);
  const end = dayjs(endTime);

  // Разница в минутах (число)
  return end.diff(start, 'minute');
}

function sortPointDay(pointA, pointB) {
  const weight = getWeightForNullStartDate(pointA.startTime, pointB.startTime);

  return weight ?? dayjs(pointA.startTime).diff(dayjs(pointB.startTime));
}

function sortPointTime(pointA, pointB) {
  const durationA = getEventTimeDuration(pointA);
  const durationB = getEventTimeDuration(pointB);

  return durationB - durationA;
}

function sortPointPrice(pointA, pointB) {
  return pointB.price - pointA.price;
}

export { sortPointDay, sortPointPrice, sortPointTime };
