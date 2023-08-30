import { capitalize } from 'utils';

export const nameVerification = (
  value,
  regPattern,
  regPatternAdd,
  errorMassage,
  oldValue
) => {
  const re = new RegExp(regPattern);
  // console.log(regPatternAdd);
  const lastKey =
    value.length > 1
      ? compare(value, oldValue)
      : {
          simbol: value.slice(value.length - 1, value.length),
          pos: 0,
        };

  if (!re.test(lastKey.simbol)) {
    return { value: oldValue, errorMassage: errorMassage };
  }

  //   if (value.length > mask.length) {
  //     value = value.slice(0, value.length - 1);
  // const cleanValue = cleanValueInit(value);
  //   }
  const verifiedName = valueMake(value, oldValue, lastKey, regPatternAdd);
  return { value: verifiedName.value, errorMassage: verifiedName.errorMassage };
};

function compare(value, oldValue) {
  for (let i = 0; value.length - 1; i += 1) {
    if (
      value.slice(i, i + 1) !== oldValue.slice(i, i + 1) ||
      i >= oldValue.length
    ) {
      return { simbol: value.slice(i, i + 1), pos: i };
    }
  }
}

// function cleanValueInit(value) {
//   if (value.length >= startPos) {
//     return value
//       .split('')
//       .filter((char, index) => re.test(char) && index >= startPos - 1);
//   } else {
//     return value;
//   }
// }

function valueMake(value, oldValue, { simbol, pos }, regPatternAdd) {
  let currentSimbol = '';
  let currentValue = '';

  for (let i = 0; i < value.length; i += 1) {
    currentSimbol = value.slice(i, i + 1);
    console.log(currentSimbol.indexOf(regPatternAdd), i, value.length);
    if (currentSimbol.indexOf(regPatternAdd) > 0 && i === 0) {
      return {
        value: oldValue,
        errorMassage: "Ім'я не може починатись з символу",
      };
    }
    if (
      currentSimbol.indexOf(regPatternAdd) > 0 &&
      i > 1 &&
      value.slice(i - 1, i).indexOf(regPatternAdd) > 0
    ) {
      return {
        value: oldValue,
        errorMassage: 'Два символи поспьль стояти не можуть',
      };
    }
    currentValue += currentSimbol;
    if (i > value.length) {
      return {
        value: currentValue,
        errorMassage: '',
      };
    }
  }
}
