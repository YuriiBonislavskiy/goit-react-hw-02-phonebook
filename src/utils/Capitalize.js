export const capitalize = (str, delemitter) => {
  str = str.replaceAll(`{delemitter}{delemitter}`, delemitter);
  // str = "jkjjkjkkkjkkj-klkl";
  if (typeof str === 'string') {
    return str
      .split(delemitter)
      .map(word => {
        return word[0]
          ? `${word[0].toUpperCase()}${word
              .slice(1, word.length)
              .toLocaleLowerCase()}`
          : '';
      })
      .join(delemitter && delemitter)
      .split('-')
      .map(word => {
        return word[0]
          ? `${word[0].toUpperCase()}${word
              .slice(1, word.length)}`
          : '';
      })
      .join(delemitter && '-');
  }
  return str;
};