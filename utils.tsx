import slugify from 'slugify';
import parseISO from 'date-fns/parseISO';

export const urlEncode = (text = '') => slugify(text, { lower: true, strict: true, locale: 'nb' });

// Add leading zero to numbers below 10. Ex: 2 -> 02, 12 -> 12
const addLeadingZero = (number: number) => (number < 10 ? '0' + number : number);

export const formatDate = (iso: string) => {
  const date = parseISO(iso);
  return (
    getDay(date.getDay()) +
    ' ' +
    date.getDate() +
    ' ' +
    getMonth(date.getMonth()) +
    ' - kl. ' +
    addLeadingZero(date.getHours()) +
    ':' +
    addLeadingZero(date.getMinutes())
  );
};

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
