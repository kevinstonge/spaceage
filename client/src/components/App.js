import "../styles/App.scss";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header.js";
import APIList from "./APIList.js";
import EndpointList from "./EndpointList.js";
import QueryParameters from "./QueryParameters.js";
import allActions from "../actions";
import QueryResults from "./QueryResults";
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [justLanded, setJustLanded] = useState(true);
  const URLParameters = useSelector((state)=>state.API.URLParameters);
  useEffect(() => {
    if (justLanded) {
      setJustLanded(false);
      dispatch({ type: allActions.APIActions.setParams, payload: location });
      const pathForHistory = `${location.pathname}${location.search}`;
      if (pathForHistory.length > 2) {
        history.push(pathForHistory);
      }
      else {
        history.push('/');
      }
    } else {
      dispatch({ type: allActions.APIActions.setParams, payload: location });
    }
  }, [location, justLanded, setJustLanded, history, dispatch]);
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
