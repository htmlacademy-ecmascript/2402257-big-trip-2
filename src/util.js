import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const DATE_FORMAT = 'D MMMM';
const TIME_FORMAT = 'HH:mm';
function getRandomElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(maxLimit = 10000) {
  return Math.floor(Math.random() * maxLimit);
}

function humanizeEventDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

function humanizeEventTime(dueDate) {
  return dueDate ? dayjs(dueDate).format(TIME_FORMAT) : '';
}

export {
  getRandomElement,
  humanizeEventDate,
  getRandomInteger,
  humanizeEventTime,
};
