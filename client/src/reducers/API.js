import actionTypes from "../actions/APIActions.js";
const initialState = {
  API: {
    activeAPI: null,
    APIList: null,
  }
}
const API = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.getAPIList:
      return { ...state, APIList: action.payload };
    case actionTypes.setActiveAPI:
      return { ...state, activeAPI: action.payload };
    default:
      return state;
  }
};

export default API;
