import { combineReducers } from "@reduxjs/toolkit";
import messageReducer from "./message_slice";

const rootReducer = combineReducers({
  message: messageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;