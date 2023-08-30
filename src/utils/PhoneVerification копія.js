export const phoneVerification = (
  value,
  maskPattern,
  errorMassage,
  oldValue
) => {
  const re = new RegExp(/[0-9]/);

  const lastKey =
    value.length > 1
      ? compare(value, oldValue)
      : { simbol: value.slice(value.length - 1, value.length), pos: 0 };
    

  const { mask, startPos } = maskArrayInit(maskPattern);
  const cleanValue = cleanValueInit(value, startPos, re);

  if (oldValue.length >= value.length) {
    return { value: valueMake(mask, cleanValue), errorMassage: '' };
  }

  if (!re.test(lastKey.simbol)) {
    return { value: oldValue, errorMassage: errorMassage };
  }

  if (value.length > mask.length && lastKey.pos >= mask.length) {
    value = value.slice(0, value.length - 1);
    return { value: oldValue, errorMassage: '' };
  }

  return {
    value: valueMake(mask, cleanValue),
    errorMassage: '',
  };
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

function maskArrayInit(maskPattern) {
  let i = 0;
  let startPos = 0;
  let endPos = 0;
  const mask = maskPattern.split('').map((simbol, index) => {
    if (simbol === '_') {
      i === 0 && (startPos = index);
      i += 1;
      return simbol;
    } else {
      return simbol;
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

function valueMake(mask, cleanValue) {
  let i = 0;
  let value = '';

  for (let iI = 0; mask.length - 1; iI += 1) {
    if (mask[iI] === '_') {
      if (i <= cleanValue.length - 1) {
        value = value + cleanValue[i];
        i += 1;
      }
    } else {
      if (iI < mask.length - 1) {
        if (i < cleanValue.length) {
          value = value + mask[iI];
        }
      }
    }
      if (iI > mask.length - 1) {
      return value;
    }
  }
}
