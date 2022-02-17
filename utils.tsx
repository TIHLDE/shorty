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
