export const countSumm = (numbers: number[]): number =>
  numbers.reduce((acc, cur) => acc + cur, 0);

export const calculateAvarage = (sum: number, length: number): number =>
  Math.round((sum / length) * 10) / 10;

export const calculatePercentage = (a: number, b: number): number =>
  Math.round((a / b) * 100 * 10) / 10;
