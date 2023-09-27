export const randomNumber = (range?: [number, number]): number => {
  if (!range) {
    range = [0, 100];
  }
  let rand = range[0] + Math.random() * (range[1] + 1 - range[0]);
  return Math.floor(rand);
};
