// Returns the width of a string
// param size: Size of the font
// param nChar: Number of chars
export const getCharWith = (size: number, nChar: number) => {
  const result = size * 0.63 * nChar + 0.008 * size * (nChar - 1);
  return result;
};