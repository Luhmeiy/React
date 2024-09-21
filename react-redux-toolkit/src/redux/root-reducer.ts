import { combineReducers } from "redux";
import cartReducer from "./cart/slice";
import userReducer from "./user/slice";

const rootReducer = combineReducers({ cartReducer, userReducer });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
