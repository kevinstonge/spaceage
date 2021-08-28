import allActions from "../actions";
import xhr from "./xhr";
import { store } from "../index.js";
const callAPI = ({ query, pathStringForSwagger, pathStringForReact, fullQueryForAPI }) => {
  store.dispatch({
    type: allActions.APIActions.setQueryResults,
    payload: {
      queryPath: pathStringForReact,
      query,
      queryResult: [],
      status: "searching",
    },
  });
  xhr
    .get(`/data/${fullQueryForAPI}`)
    .then((r) => {
      if (r.data) {
        store.dispatch({
          type: allActions.APIActions.setQueryResults,
          payload: {
            queryPath: pathStringForReact,
            query,
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
          queryPath: pathStringForReact,
          query,
          queryResult: [],
          status: "unable to retrieve data from the server, try again later",
        },
      });
    });
};

export default callAPI;
