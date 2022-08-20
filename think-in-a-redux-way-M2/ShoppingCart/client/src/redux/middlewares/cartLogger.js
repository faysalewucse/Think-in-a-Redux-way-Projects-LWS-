const cartLogger = (state) => (next) => (action) => {
  console.log(JSON.stringify(action));
  const prevState = state.getState();
  if (prevState.items.length > 0) {
    const itemInfo = prevState.items.find(({ id }) => id === action.id);
    if (itemInfo) {
      if (action.type === "cart/increment") {
        if (itemInfo.quantity < 20) {
          return next(action);
        }
      } else return next(action);
    } else return next(action);
  } else {
    return next(action);
  }
};

export default cartLogger;
