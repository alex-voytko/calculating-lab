import { Cell } from "../models";
import { randomNumber } from "./randomNumber";

export const initialMatrixBuilder = (): Cell[][] => {
  return [
    [
      { id: 0, amount: randomNumber() },
      { id: 1, amount: randomNumber() },
    ],
    [
      { id: 2, amount: randomNumber() },
      { id: 3, amount: randomNumber() },
    ],
  ];
};
