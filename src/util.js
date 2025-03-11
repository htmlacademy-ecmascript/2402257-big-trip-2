import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import LocalizedFormat from 'dayjs/plugin/LocalizedFormat';

dayjs.extend(LocalizedFormat);
dayjs.extend(duration);

const DATE_FORMAT_POINT = 'D MMMM';
const DATE_FORMAT_EDIT_POINT = 'DD/MM/YY';
const TIME_FORMAT = 'HH:mm';

function getRandomElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(maxLimit = 10000) {
  return Math.floor(Math.random() * maxLimit);
}

function humanizeEventDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT_POINT) : '';
}

function humanizeEventTime(dueDate) {
  return dueDate ? dayjs(dueDate).format(TIME_FORMAT) : '';
}

function localizeDateFormat(dueDate){
  return dueDate ? `${dayjs(dueDate).format(DATE_FORMAT_EDIT_POINT)} ${dayjs(dueDate).format(TIME_FORMAT)}` : '';
}

function capitalizeFirstLetter(str) {
  if (!str) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDuration(durationObj) {
  const days = durationObj.days();
  const hours = durationObj.hours();
  const minutes = durationObj.minutes();

  if (days > 0) {
    return `${days.toString().padStart(2, '0')}D ${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else if (hours > 0) {

    return `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else {
    return `${minutes.toString().padStart(2, '0')}M`;
  }
}


function getEventTimeDuration(startTime, endTime) {
  const eventStartTime = dayjs(startTime);
  const eventEndTime = dayjs(endTime);

  const diffInMilliseconds = eventEndTime.diff(eventStartTime);
  const durationObj = dayjs.duration(diffInMilliseconds);

  const formattedDuration = formatDuration(durationObj);

  return `${formattedDuration}`;
}

export {
  getRandomElement,
  humanizeEventDate,
  getRandomInteger,
  humanizeEventTime,
  capitalizeFirstLetter,
  localizeDateFormat,
  getEventTimeDuration
};
