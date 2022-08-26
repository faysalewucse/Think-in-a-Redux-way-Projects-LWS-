import { applyMiddleware, createStore } from "redux";
import cartReducer from "./cart/cartReducer";
import logger from "redux-logger";
import cartLogger from "./middlewares/cartLogger";

const store = createStore(cartReducer, applyMiddleware(logger, cartLogger));

export default store;
