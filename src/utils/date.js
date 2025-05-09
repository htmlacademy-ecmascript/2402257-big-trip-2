import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);
dayjs.extend(duration);

const DATE_FORMAT_POINT = 'MMM D';
const DATE_FORMAT_EDIT_POINT = 'DD/MM/YY';
const TIME_FORMAT = 'HH:mm';


function humanizeEventDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT_POINT) : '';
}

function humanizeEventTime(dueDate) {
  return dueDate ? dayjs(dueDate).format(TIME_FORMAT) : '';
}

function localizeDateFormat(dueDate){
  return dueDate ? `${dayjs(dueDate).format(DATE_FORMAT_EDIT_POINT)} ${dayjs(dueDate).format(TIME_FORMAT)}` : '';
}

function capitalizeFirstLetter(name) {
  if (!name) {
    return name;
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
}


function getEventTimeDuration(startTime, endTime) {
  const start = dayjs(startTime, 'DD/MM/YY HH:mm');
  const end = dayjs(endTime, 'DD/MM/YY HH:mm');

  if (!start.isValid() || !end.isValid() || end.isBefore(start)) {
    return '0M';
  }

  const totalMinutes = end.diff(start, 'minute');
  const days = Math.floor(totalMinutes / (60 * 24));
  const remainingMinutes = totalMinutes % (60 * 24);
  const hours = Math.floor(remainingMinutes / 60);
  const minutes = remainingMinutes % 60;

  return formatDuration(days, hours, minutes);
}

function formatDuration(days, hours, minutes) {
  const parts = [];

  if (days > 0 && days < 10) {
    parts.push(`0${days}D`);
    parts.push(`${String(hours).padStart(2, '0')}H`);
    parts.push(`${String(minutes).padStart(2, '0')}M`);
  } else if (days > 10) {
    parts.push(`${days}D`);
    parts.push(`${String(hours).padStart(2, '0')}H`);
    parts.push(`${String(minutes).padStart(2, '0')}M`);
  } else if (hours < 10) {
    parts.push(`0${hours}H`);
    parts.push(`${String(minutes).padStart(2, '0')}M`);
  } else if (hours > 10) {
    parts.push(`${hours}H`);
    parts.push(`${String(minutes).padStart(2, '0')}M`);
  } else {
    parts.push(`${minutes}M`);
  }

  return parts.join(' ');
}

function isDatePresent(dueDate){
  return dueDate && dayjs(dueDate).isSame(dayjs(), 'D');
}

function isDateFuture(dueDate){
  return dueDate && dayjs(dueDate).isAfter(dayjs(), 'D');
}

function isDatePast(startDate, endDate){
  return startDate && endDate && dayjs(startDate).isBefore(dayjs(), 'D') && dayjs(endDate).isBefore(dayjs(), 'D');
}
export {
  humanizeEventDate,
  humanizeEventTime,
  capitalizeFirstLetter,
  localizeDateFormat,
  getEventTimeDuration,
  isDatePresent,
  isDateFuture,
  isDatePast
};
