import { getCaretPos } from 'utils';

export const phoneVerification = (
  value,
  maskPattern,
  errorMassage,
  oldValue,
  target
) => {
  const re = new RegExp(/[0-9]/);
  let cursorPos = getCaretPos(target);
  const lastKey =
    value.length > 1
      ? compare(value, oldValue)
      : { symbol: value.slice(value.length - 1, value.length), pos: 0 };

  const { mask, startPos } = maskArrayInit(maskPattern);
  const cleanValue = cleanValueInit(value, startPos, re);
  // const maskLength = maskPattern.length;
  // const maskLength2 = maskPattern.replaceAll('_','').length).length;
  const maxValueLength =
    maskPattern.length - maskPattern.replaceAll('_', '').length;

  if (oldValue.length >= value.length) {
    return { value: valueMake(mask, cleanValue), errorMassage: '', cursorPos };
  }

  if (!re.test(lastKey.symbol)) {
    return { value: oldValue, errorMassage: errorMassage, cursorPos };
  }

  if (value.length > mask.length && lastKey.pos >= mask.length) {
    value = value.slice(0, value.length - 1);
    return { value: oldValue, errorMassage: '', cursorPos };
  }

  const newValue = valueMake(mask, cleanValue, maxValueLength);

  cursorPos = getCaretPos(target);
  // console.log(cursorPos);
  // console.log(newValue.length);
  if (!re.test(newValue.slice(newValue.length - 1, newValue.length - 1))) {
    let iI = 1;
    for (let i = newValue.length - 1; i >= 0; i -= 1) {
      cursorPos = getCaretPos(target) + iI;
      if (re.test(newValue.slice(iI, iI))) return;
      iI += 1;
    }
  }
  // console.log(getCaretPos(target));

  return {
    value: newValue,
    errorMassage: '',
    cursorPos,
  };
};

export function compare(value, oldValue) {
  for (let i = 0; value.length - 1; i += 1) {
    if (
      value.slice(i, i + 1) !== oldValue.slice(i, i + 1) ||
      i >= oldValue.length
    ) {
      return { symbol: value.slice(i, i + 1), pos: i };
    }
  }
}

function maskArrayInit(maskPattern) {
  let i = 0;
  let startPos = 0;
  // let endPos = 0;
  const mask = maskPattern.split('').map((symbol, index) => {
    if (symbol === '_') {
      i === 0 && (startPos = index);
      i += 1;
      return symbol;
    } else {
      return symbol;
    }
  });
  return { mask, startPos };
}

function cleanValueInit(value, startPos, re) {
  if (value.length >= startPos) {
    return value
      .split('')
      .filter((char, index) => re.test(char) && index >= startPos);
  } else {
    return value;
  }
}

function valueMake(mask, cleanValue, maxValueLength) {
  let i = 0;
  let value = '';
  console.log(maxValueLength);

  for (let iI = 0; iI <= mask.length - 1; iI += 1) {
    if (mask[iI] === '_') {
      if (i <= cleanValue.length - 1) {
        value = value + cleanValue[i];
        i += 1;
      }
    } else {
      if (i < cleanValue.length || i >= maxValueLength ) {
        value = value + mask[iI];
      }
    }
  }
  return value;
}

// export function getCaretPos(obj) {
//   obj.focus();
//   if (obj.selectionStart) return obj.selectionStart;
//   else if (document.selection) {
//     var sel = document.selection.createRange();
//     var clone = sel.duplicate();
//     sel.collapse(true);
//     clone.moveToElementText(obj);
//     clone.setEndPoint('EndToEnd', sel);
//     return clone.text.length;
//   }
//   return 0;
// }
