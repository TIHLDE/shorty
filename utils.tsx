import slugify from 'slugify';
import parseISO from 'date-fns/parseISO';

/**
 * Slugify a string to make it safe to use in an URL
 * @param text The string the slugify
 */
export const urlEncode = (text = '') => slugify(text, { lower: true, strict: true, locale: 'nb' });

/**
 * Add leading zero to numbers below 10.
 *
 * Example: `2 -> 02`, `12 -> 12`
 * @param number The number that should get a leading zero
 */
const addLeadingZero = (number: number) => (number < 10 ? '0' + number : number);

/**
 * Format date in format: `torsdag 12 oktober 2021 - kl. 08:30`
 * Year is only shown if it's a different year than this year
 * @param date Date to be formatted
 */
export const formatDate = (iso: string) => {
  // Since this function is runned in an environment with timezone UTC, but we want it in the Norwegian timezone
  // which is the timezone we receive from backend. To fix this we simply remove the timezone-info from the ISO-string
  // and parse the date as if it where a UTC-date. It's hacky but it works!
  const isoWithoutTimezone = `${iso.substr(0, 19)}Z`;
  const date = parseISO(isoWithoutTimezone);
  const isDifferentYear = date.getFullYear() !== new Date().getFullYear();
  return `${getDay(date.getDay())} ${date.getDate()} ${getMonth(date.getMonth())} ${isDifferentYear ? date.getFullYear() : ''} - kl. ${addLeadingZero(
    date.getHours(),
  )}:${addLeadingZero(date.getMinutes())}`;
};

/**
 * Translate a day of week number to a readable day
 * @param day Day of week
 */
export const getDay = (day: number) => {
  switch (day) {
    case 0:
      return 'Søndag';
    case 1:
      return 'Mandag';
    case 2:
      return 'Tirsdag';
    case 3:
      return 'Onsdag';
    case 4:
      return 'Torsdag';
    case 5:
      return 'Fredag';
    case 6:
      return 'Lørdag';
    default:
      return day;
  }
};

/**
 * Translate a month of year number to a readable month
 * @param month Month of year
 */
export const getMonth = (month: number) => {
  switch (month) {
    case 0:
      return 'jan';
    case 1:
      return 'feb';
    case 2:
      return 'mars';
    case 3:
      return 'april';
    case 4:
      return 'mai';
    case 5:
      return 'juni';
    case 6:
      return 'juli';
    case 7:
      return 'aug';
    case 8:
      return 'sep';
    case 9:
      return 'okt';
    case 10:
      return 'nov';
    case 11:
      return 'des';
    default:
      return month;
  }
};
