import { combineReducers } from "@reduxjs/toolkit";
import counterSlice from "./counter/counterSlice";
import completeSlice from "./completed/completeSlice";

export const rootReducer = combineReducers({
  counter: counterSlice,
  completed: completeSlice,
});
