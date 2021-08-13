import actionTypes from "../actions/APIActions.js";
const initialState = {
  API: {
    activeAPI: null,
    APISwagger: null,
    APIEndpoints: null,
    activeEndpoints: null,
    EndpointParameters: null,
    URLParameters: null,
    queries: {},
    queryResults: {},
  },
};
const API = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.getAPISwagger:
      return { ...state, APISwagger: action.payload };
    case actionTypes.setActiveAPI:
      return { ...state, activeAPI: action.payload };
    case actionTypes.getAPIEndpoints:
      return {
        ...state,
        APIEndpoints: {
          ...state.APIEndpoints,
          [action.payload.api]: action.payload.parameters,
        },
      };
    case actionTypes.setActiveEndpoint:
      return {
        ...state,
        activeEndpoints: {
          ...state.activeEndpoints,
          [action.payload.apiName]: action.payload.endpoint,
        },
      };
    case actionTypes.getEndpointParameters:
      return {
        ...state,
        EndpointParameters: {
          [action.payload.endpoint]: action.payload.parameters,
        },
      };
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
    case actionTypes.setQueryResults:
      return {
        ...state,
        queryResults: {
          ...state.queryResults,
          [action.payload.queryPath]: {
            queryPath: action.payload.queryPath,
            query: action.payload.query,
            queryResult: action.payload.queryResult,
            status: action.payload.status || "",
          },
        },
      };
    default:
      return state;
  }
};

export default API;
