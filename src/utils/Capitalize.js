export const capitalize = (str, delemitter) => {
  str = str.replaceAll('  ', ' ');
  if (typeof str === 'string') {
    return str
      .split(' ')
      .map(word => {
        return `${word[0].toUpperCase()}${word
          .slice(1, word.length)
          .toLocaleLowerCase()}`;
      })
      .join(delemitter && delemitter)
      .split('-')
      .map(word => {
        return `${word[0].toUpperCase()}${word
          .slice(1, word.length)
          .toLocaleLowerCase()}`;
      })
      .join(delemitter && '-');
  }
  return str;
};
