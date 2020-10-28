import { combineReducers } from "redux";
import { homeReducer } from "./home";

const AppReducer = combineReducers({
  homeReducer,
});

export default AppReducer;
