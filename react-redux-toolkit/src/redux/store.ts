import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

// @ts-ignore
const store = configureStore({
	reducer: rootReducer,
	middleware: (gDM) => gDM().concat(logger),
});

export default store;
