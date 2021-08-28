import "../styles/App.scss";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header.js";
import APIList from "./APIList.js";
import EndpointList from "./EndpointList.js";
import QueryParameters from "./QueryParameters.js";
import allActions from "../actions";
import QueryResults from "./QueryResults";
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const URLParameters = useSelector((state)=>state.API.URLParameters);
  useEffect(() => {
    dispatch({ type: allActions.APIActions.setParams, payload: location });
  }, [location, dispatch]);
  return (
    <>
      <Header />
      <APIList />
      {URLParameters?.api && 
        <>
          <EndpointList />
          {URLParameters?.endpoint &&
            <>
              <QueryParameters />
              <QueryResults />
            </>
          }
        </>
      }
    </>
  );
}

export default App;
