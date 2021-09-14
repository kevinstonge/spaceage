import API from "./API.js";
import user from "./user.js";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  API, user,
});

export default rootReducer;
