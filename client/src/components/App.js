import "../styles/App.scss";
import { useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Header from "./Header.js";
import APIList from "./APIList.js";
import EndpointList from "./EndpointList.js";
import QueryParameters from "./QueryParameters.js";
function App() {
  const activeAPI = useSelector((state) => state.API.APIList);
  const activeEndpoint = useSelector((state) => state.API.activeEndpoint);
  const match = useRouteMatch("/:api/:endpoint/:queryString");
  console.log(match);
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
