import "../styles/App.scss";
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Header from "./Header.js";
import APIList from "./APIList.js";
import EndpointList from "./EndpointList.js";
import QueryParameters from "./QueryParameters.js";
import allActions from "../actions";
import QueryResults from "./QueryResults";
function App() {
  const dispatch = useDispatch();
  const match = useRouteMatch("/:api?/:endpoint?");
  match.params.query = window.location.search;
  match.params.queryObject = Object.fromEntries(
    new URLSearchParams(match.params.query)
  );
  useEffect(() => {
    dispatch({ type: allActions.APIActions.setParams, payload: match.params });
  }, [match, dispatch]);
  return (
    <>
      <Header />
      <APIList />
      <EndpointList />
      <QueryParameters />
      <QueryResults />
    </>
  );
}

export default App;
