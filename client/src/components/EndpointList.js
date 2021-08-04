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
    if (activeAPI && activeAPI.ID) {
      xhr.get(`/data/endpoints/${activeAPI.ID}`).then((r) => {
        dispatch({
          type: allActions.APIActions.getAPIEndpoints,
          payload: r.data,
        });
      });
    }
  }, [activeAPI, dispatch]);
  useEffect(() => {
    if (APIEndpoints && APIEndpoints.length) {
      if (URLParameters.endpoint) {
        const endpointMatch = APIEndpoints.filter(
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
        APIEndpoints.length > 0 &&
        APIEndpoints.map((endpoint) => {
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
