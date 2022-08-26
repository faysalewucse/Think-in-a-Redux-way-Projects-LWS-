import { DECREMENT, INCREMENET } from "./actionTypes";

export const increment = (id) => {
  return {
    type: INCREMENET,
    id: id,
  };
};

export const decrement = (id) => {
  return {
    type: DECREMENT,
    id: id,
  };
};
