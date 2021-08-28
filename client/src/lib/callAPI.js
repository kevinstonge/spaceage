import allActions from "../actions";
import xhr from "./xhr";
import { store } from "../index.js";
const callAPI = (queryPath, queryPathForAPI, queryParameters) => {
  store.dispatch({
    type: allActions.APIActions.setQueryResults,
    payload: {
      queryPath,
      query: queryParameters,
      queryResult: [],
      status: "searching",
    },
  });
  xhr
    .get(`/data/${queryPathForAPI}?${queryParameters}`)
    .then((r) => {
      if (r.data) {
        store.dispatch({
          type: allActions.APIActions.setQueryResults,
          payload: {
            queryPath,
            query: queryParameters,
            queryResult: r.data,
            status: "success",
          },
        });
      }
    })
    .catch((e) => {
      store.dispatch({
        type: allActions.APIActions.setQueryResults,
        payload: {
          queryPath,
          query: queryParameters,
          queryResult: [],
          status: "unable to retrieve data from the server, try again later",
        },
      });
    });
};

export default callAPI;
