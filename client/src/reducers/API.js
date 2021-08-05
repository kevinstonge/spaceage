import actionTypes from "../actions/APIActions.js";
const initialState = {
  API: {
    activeAPI: null,
    APIList: null,
    APIEndpoints: null,
    activeEndpoint: null,
    APIParameters: null,
    URLParameters: null,
    queries: { },
    test: 3,
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
    case actionTypes.getAPIParameters:
      return { ...state, APIParameters: action.payload };
    case actionTypes.setParams:
      return { ...state, URLParameters: action.payload };
    case actionTypes.setQuery:
      return {
        ...state,
        queries: {
          ...state.queries,
          [action.payload.path]: action.payload.data,
        },
      };
    default:
      return state;
  }
};

export default API;
