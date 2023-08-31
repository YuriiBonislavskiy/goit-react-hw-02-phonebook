import { capitalize } from 'utils';
import { getCaretPos } from 'utils';

export const nameVerification = (
  value,
  regPattern,
  regPatternAdd,
  errorMassage,
  oldValue,
  target
) => {
  const re = new RegExp(regPattern);
  let cursorPos = getCaretPos(target);

  // console.log(regPatternAdd);
  const lastKey =
    value.length > 1
      ? compare(value, oldValue)
      : {
          symbol: value.slice(value.length - 1, value.length),
          pos: 0,
        };
  if (value.length < oldValue.length) {
    return { value: value, errorMassage: '', cursorPos };
  }

  if (!re.test(lastKey.symbol)) {
    return { value: oldValue, errorMassage: errorMassage, cursorPos };
  }

  const verifiedName = valueMake(value, oldValue, lastKey, regPatternAdd);
  // console.log(verifiedName);
  cursorPos = getCaretPos(target);
  return {
    value: verifiedName.value,
    errorMassage: verifiedName.errorMassage,
    cursorPos,
  };
};

function compare(value, oldValue) {
  for (let i = 0; i < value.length; i += 1) {
    if (
      value.slice(i, i + 1) !== oldValue.slice(i, i + 1) ||
      i >= oldValue.length
    ) {
      return { symbol: value.slice(i, i + 1), pos: i };
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

function valueMake(value, oldValue, { symbol, pos }, regPatternAdd) {
  let currentsymbol = '';
  let currentValue = '';

  for (let i = 0; i < value.length; i += 1) {
    currentsymbol = value.slice(i, i + 1);
    // console.log(currentsymbol+"!",regPatternAdd, "  ", currentsymbol.includes(regPatternAdd), i, value.length);

    if (regPatternAdd.includes(currentsymbol) && i === 0) {
      return {
        value: oldValue,
        errorMassage: "Ім'я не може починатись з символу",
      };
    }

    if (
      regPatternAdd.includes(currentsymbol) &&
      i > 1 &&
      regPatternAdd.includes(value.slice(i - 1, i))
    ) {
      // console.log("!!!!!!!!!");
      return {
        value: oldValue,
        errorMassage: 'Два символи поспьль стояти не можуть',
      };
    }
    currentValue += currentsymbol;
  }
value = capitalize(currentValue, " ");
  return {
    value: value,
    errorMassage: '',
  };
}
