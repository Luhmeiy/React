import { combineReducers } from "redux";
import cartReducer from "./cart/reducer";
import userReducer from "./user/reducer";

const rootReducer = combineReducers({ cartReducer, userReducer });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
