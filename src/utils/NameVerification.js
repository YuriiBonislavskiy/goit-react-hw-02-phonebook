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

function valueMake(value, oldValue, { symbol, pos }, regPatternAdd) {
  let currentsymbol = '';
  let currentValue = '';
  for (let i = 0; i < value.length; i += 1) {
    currentsymbol = value.slice(i, i + 1);
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
        return {
          value: oldValue,
          errorMassage: 'Два символи поспьль стояти не можуть',
        };
      }
      currentValue += currentsymbol;
  }
  value = capitalize(currentValue, ' ');
  return {
    value: value,
    errorMassage: '',
  };
}
