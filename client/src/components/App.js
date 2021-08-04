import "../styles/App.scss";
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Header from "./Header.js";
import APIList from "./APIList.js";
import EndpointList from "./EndpointList.js";
import QueryParameters from "./QueryParameters.js";
import allActions from "../actions";
function App() {
  const dispatch = useDispatch();
  const match = useRouteMatch("/:api?/:endpoint?/:query?");
  useEffect(() => {
    dispatch({ type: allActions.APIActions.setParams, payload: match.params });
    console.log("route changed");
  }, [match, dispatch]);
  return (
    <>
      <Header />
      <APIList />
      <EndpointList />
      <QueryParameters />
    </>
  );
}

export default App;
