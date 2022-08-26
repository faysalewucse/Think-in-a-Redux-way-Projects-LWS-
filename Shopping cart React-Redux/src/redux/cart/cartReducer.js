import CartItems from "../../data/cartItems";
import items from "../../data/items";
import { INCREMENET, DECREMENT } from "./actionTypes";

const cartReducer = (state = CartItems, action) => {
  //check if the item already exists or not in the cart list
  const haveItem = state.items.find(({ id }) => id === action.id);
  // getting item price
  const itemInfo = items.find(({ id }) => id === action.id);
  switch (action.type) {
    case INCREMENET:
      if (!haveItem)
        return {
          ...state,
          items: [...state.items, { id: action.id, quantity: 1 }],
          totalPrice: state.totalPrice + itemInfo.price,
        };
      else {
        return {
          ...state,
          items: [
            ...state.items.map((item) => {
              if (item.id === action.id) {
                return { ...item, quantity: item.quantity + 1 };
              } else return item;
            }),
          ],
          totalPrice: state.totalPrice + itemInfo.price,
        };
      }

    case DECREMENT:
      if (haveItem.quantity === 1) {
        var newItemsArray = state.items.filter((item) => item.id !== action.id);
        return {
          ...state,
          items: newItemsArray,
          totalPrice: state.totalPrice - itemInfo.price,
        };
      } else {
        return {
          ...state,
          items: [
            ...state.items.map((item) => {
              if (item.id === action.id) {
                return { ...item, quantity: item.quantity - 1 };
              } else return item;
            }),
          ],
          totalPrice: state.totalPrice - itemInfo.price,
        };
      }

    default:
      return state;
  }
};

export default cartReducer;
