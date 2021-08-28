import actionTypes from "../actions/APIActions.js";
const initialState = {
  API: {
    activeAPI: null,
    APISwagger: null,
    APIEndpoints: null,
    activeEndpoints: {},
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
      const {pathname, search} = action.payload;
      const queryPath =   pathname.replace(/\/$/,"").replace(/^\//,"").split("/");
      const api = queryPath[0] || undefined;
      const endpoint = queryPath[1] || undefined;
      const pathString = api && endpoint
        ? api === endpoint
          ? api : `${api}/${endpoint.replace(":","/").replace("id","{id}")}`
        : undefined;
      const queryPathForAPI = api && endpoint
        ? api === endpoint
          ? `${api}/${search}` : `${api}/${endpoint}/${search}`
          : "";
      return { ...state, URLParameters: {
        api,
        endpoint,
        query: search,
        pathString,
        queryPathForAPI
      } };
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
