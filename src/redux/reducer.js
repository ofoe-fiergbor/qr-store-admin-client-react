import { combineReducers } from "redux";
import authReducer from "./authReducer";
import merchReducer from "./merchReducer";

export const reducer = combineReducers({
  auth: authReducer,
  merch: merchReducer,
});
