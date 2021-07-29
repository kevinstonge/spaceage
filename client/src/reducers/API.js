import actionTypes from "../actions/APIActions.js";
const initialState = {
  API: {
    activeAPI: null,
    APIList: null,
    APIEndpoints: null,
    activeEndpoint: null,
  },
};
const API = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.getAPIList:
      return { ...state, APIList: action.payload };
    case actionTypes.setActiveAPI:
      return { ...state, activeAPI: action.payload };
    case actionTypes.getAPIEndpoints:
      return { ...state, APIEndpoints: action.payload };
    case actionTypes.setActiveEndpoint:
      return { ...state, activeEndpoint: action.payload };
    default:
      return state;
  }
};

export default API;
