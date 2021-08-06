import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import xhr from "../lib/xhr";
import allActions from "../actions";
export default function EndpointList(props) {
  const activeAPI = useSelector((state) => state.API.activeAPI);
  const APIEndpoints = useSelector((state) => state.API.APIEndpoints);
  const activeEndpoint = useSelector((state) => state.API.activeEndpoint);
  const URLParameters = useSelector((state) => state.API.URLParameters);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (URLParameters && URLParameters.endpoint && APIEndpoints && APIEndpoints[URLParameters.api]) {
      const endpointMatch = APIEndpoints[URLParameters.api].filter((endpoint) => endpoint.Name === URLParameters.endpoint);
      if (endpointMatch.length > 0) {
        dispatch({type: allActions.APIActions.setActiveEndpoint, payload: URLParameters.endpoint })
      } else {
        dispatch({ type: allActions.APIActions.setActiveEndpoint, payload: null});
        history.push(`${URLParameters.api}/`);
      }
    }
  },[APIEndpoints, URLParameters, dispatch, history])
  useEffect(() => {
    if (activeAPI && activeAPI.ID && (!APIEndpoints || !APIEndpoints[activeAPI.Name])) {
      xhr.get(`/data/endpoints/${activeAPI.ID}`).then((r) => {
        dispatch({
          type: allActions.APIActions.getAPIEndpoints,
          payload: { api: activeAPI.Name, parameters: r.data }
        });
      });
    }
  }, [activeAPI, APIEndpoints, dispatch]);
  useEffect(() => {
    if (APIEndpoints && activeAPI && APIEndpoints[activeAPI.Name] && APIEndpoints[activeAPI.Name].length > 0) {
      if (URLParameters.endpoint) {
        const endpointMatch = APIEndpoints[activeAPI.Name].filter(
          (endpoint) => endpoint.Name === URLParameters.endpoint
        );
        if (endpointMatch.length > 0) {
          dispatch({
            type: allActions.APIActions.setActiveEndpoint,
            payload: endpointMatch[0],
          });
        } else {
          dispatch({
            type: allActions.APIActions.setActiveEndpoint,
            payload: null,
          });
          history.push(`/${activeAPI.Name}`);
        }
      } else {
        dispatch({
          type: allActions.APIActions.setActiveEndpoint,
          payload: null,
        });
      }
    }
  }, [history, dispatch, APIEndpoints, URLParameters, activeAPI]);
  return (
    <nav>
      {APIEndpoints &&
        APIEndpoints[activeAPI.Name] &&
        APIEndpoints[activeAPI.Name].length > 0 &&
        APIEndpoints[activeAPI.Name].map((endpoint) => {
          return (
            <NavLink
              to={`/${activeAPI.Name}/${endpoint.Name}`}
              key={`endpoint-${endpoint.ID}`}
              className={`nav ${
                activeEndpoint && activeEndpoint.ID === endpoint.ID
                  ? `active`
                  : `inactive`
              }`}
            >
              {endpoint.Name}
            </NavLink>
          );
        })}
    </nav>
  );
}
