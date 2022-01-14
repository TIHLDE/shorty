import slugify from 'slugify';
import { parseISO, format } from 'date-fns';
import nbLocale from 'date-fns/locale/nb';
import * as Sentry from '@sentry/nextjs';

/**
 * Captures errors and logs it to Sentry
 * @param e The error
 */
export const sentryCaptureException = async (e: Error) => {
  Sentry.captureException(e);

  await Sentry.flush(2000);
};

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
 * Format date in format: `Tor 12. okt. 2021 08:30`
 * Year is only shown if it's a different year than this year
 * @param date Date to be formatted
 * @param options Configure what info the formatted date should contain
 */
export const formatDate = (
  iso: string,
  {
    time = true,
    fullMonth = false,
    fullDayOfWeek = false,
    capitalizeFirstLetter = true,
  }: { time?: boolean; fullMonth?: boolean; fullDayOfWeek?: boolean; capitalizeFirstLetter?: boolean } = {},
) => {
  const isoWithoutTimezone = `${iso.substr(0, 19)}Z`;
  const date = parseISO(isoWithoutTimezone);
  const isDifferentYear = date.getFullYear() !== new Date().getFullYear();
  const formatDateString = `${fullDayOfWeek ? 'EEEE' : 'E'} do ${fullMonth ? 'MMMM' : 'MMM'}${isDifferentYear ? ' yyyy' : ''}`;
  const formatted = format(date, `${formatDateString}${time ? ' p' : ''}`, { locale: nbLocale });
  return capitalizeFirstLetter ? `${formatted.charAt(0).toUpperCase()}${formatted.slice(1)}` : formatted;
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
