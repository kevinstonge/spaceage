import actionTypes from "../actions/APIActions.js";
const initialState = {
    APISwagger: {},
    activeEndpoints: {},
    EndpointParameters: null,
    URLParameters: {
      api: null,
      endpoint: null,
      query: null,
      pathStringForSwagger: null,
      pathStringForReact: null,
      fullQueryForAPI: null,
      fullQueryForReact: null,
    },
    queries: {},
    queryResults: {},
};
const API = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.getAPISwagger:
      return { ...state, APISwagger: action.payload };
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
      //paths in apiSwagger are in this format: "/config/launcher/{id}/"
      //and this: "/launch" for /launch/launch on frontend
      const queryPath = pathname.replace(/\/$/,"").replace(/^\//,"").split("/");
      const api = queryPath[0] || undefined;
      const endpoint = queryPath[1] || undefined;
      const pathStringForSwagger = api && endpoint
        ? api === endpoint
        ? `/${api}/` : `/${api}/${endpoint.replace(/^(id)$/,`{id}`).replace(/(:id)$/,'/{id}')}/` : undefined;
      const pathStringForReact = api && endpoint
        ? `${api}/${endpoint}` : undefined;
      const fullQueryForAPI = pathStringForSwagger
        ? search
          ? `${pathStringForSwagger.replace(`/{id}`,"")}${search.replace(`?id=`,"")}`
          : `${pathStringForSwagger.replace(`/{id}`,"")}${search.replace(`?id=`,"")}`
          : "";
      const fullQueryForReact = pathStringForReact
        ? search 
          ? `${pathStringForReact}/${search}`
          : pathStringForReact
          : undefined;
      return { ...state, URLParameters: {
        api,
        endpoint,
        query: search,
        pathStringForSwagger,
        pathStringForReact,
        fullQueryForAPI,
        fullQueryForReact,
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
          [action.payload.query]: {
            queryPath: action.payload.queryPath,
            query: action.payload.query,
            queryResult: action.payload.queryResult,
            timestamp: Date.now(),
            status: action.payload.status || "",
          },
        },
      };
    case actionTypes.cleanUpQueryResults:
      const maxSavedResults = 10;
      const newResults = {};
      Object.entries(state.queryResults)
        .sort((a,b)=>b[1].timestamp - a[1].timestamp)
        .slice(0,maxSavedResults)
        .forEach(result=>{newResults[result[0]] = result[1]});
      return {
        ...state,
        queryResults: newResults,
      };
    default:
      return state;
  }
};

export default API;
