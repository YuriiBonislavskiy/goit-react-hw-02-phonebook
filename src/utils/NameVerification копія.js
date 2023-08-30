import { capitalize } from 'utils';
import Notiflix from 'notiflix';

export const nameVerification = (value, pattern, errorMassage) => {
  const lastKey = value.slice(value.length - 1, value.length);
  const re = new RegExp(pattern);
  let isLastKeyValid = false;
  // console.log(value);
  if (value.length === 0) {
    return '';
  }

  if (
    value.length >= 2 &&
    value.slice(value.length - 2, value.length) === '. '
  ) {
    Notiflix.Notify.failure(
      'Two non-alphabetic characters cannot be adjacent',
      {
        timeout: 2000,
      }
    );
    return value.slice(0, value.length - 2);
  }

  if (
    (lastKey === ' ' ||
      lastKey === '-' ||
      lastKey === "'" ||
      lastKey === '`') &&
    value.length === 1
  ) {
    Notiflix.Notify.failure(
      'The first character must be a letterTwo non-alphabetic characters must not be repeated',
      {
        timeout: 2000,
      }
    );
    return value.slice(0, value.length - 1);
  }

  if (
    value.length >= 2 &&
    (lastKey === ' ' ||
      lastKey === '-' ||
      lastKey === "'" ||
      lastKey === '`') &&
    " -'`".indexOf(value.slice(value.length - 2, value.length - 1)) !== -1
  ) {
    Notiflix.Notify.failure(
      'Two non-alphabetic characters cannot be adjacent',
      {
        timeout: 2000,
      }
    );
    return value.slice(0, value.length - 1);
  }

  if (
    lastKey !== ' ' &&
    lastKey !== '-' &&
    lastKey !== "'" &&
    lastKey !== '`'
  ) {
    isLastKeyValid = re.test(lastKey);
  }

  if (
    !isLastKeyValid &&
    lastKey !== ' ' &&
    lastKey !== '-' &&
    lastKey !== "'" &&
    lastKey !== '`'
  ) {
    Notiflix.Notify.failure(errorMassage, {
      timeout: 2000,
    });
    return value.slice(0, value.length - 1);
  }
  if (
    lastKey !== ' ' &&
    lastKey !== '-' &&
    lastKey !== "'" &&
    lastKey !== '`'
  ) {
    return capitalize(value, ' ');
  } else {
    return value;
  }
};
