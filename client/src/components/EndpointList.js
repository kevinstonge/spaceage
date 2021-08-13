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
    if (
      URLParameters &&
      URLParameters.endpoint &&
      APIEndpoints &&
      APIEndpoints[URLParameters.api]
    ) {
      const endpointMatch = APIEndpoints[URLParameters.api].filter(
        (endpoint) => endpoint.Name === URLParameters.endpoint
      );
      if (endpointMatch.length > 0) {
        dispatch({
          type: allActions.APIActions.setActiveEndpoint,
          payload: URLParameters.endpoint,
        });
      } else {
        dispatch({
          type: allActions.APIActions.setActiveEndpoint,
          payload: null,
        });
        history.push(`${URLParameters.api}/`);
      }
    }
  }, [APIEndpoints, URLParameters, dispatch, history]);
  useEffect(() => {
    if (activeAPI && (!APIEndpoints || !APIEndpoints[activeAPI])) {
      xhr.get(`/data/endpoints/${activeAPI}`).then((r) => {
        dispatch({
          type: allActions.APIActions.getAPIEndpoints,
          payload: { api: activeAPI, parameters: r.data },
        });
      });
    }
  }, [activeAPI, APIEndpoints, dispatch]);
  useEffect(() => {
    if (
      APIEndpoints &&
      activeAPI &&
      APIEndpoints[activeAPI] &&
      APIEndpoints[activeAPI].length > 0
    ) {
      if (URLParameters.endpoint) {
        const endpointMatch = APIEndpoints[activeAPI].filter(
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
          history.push(`/${activeAPI}`);
        }
      } else {
        dispatch({
          type: allActions.APIActions.setActiveEndpoint,
          payload: null,
        });
      }
    }
  }, [history, dispatch, APIEndpoints, URLParameters, activeAPI]);
  // console.log(APIEndpoints);
  return (
    <nav>
      {APIEndpoints &&
        APIEndpoints[activeAPI] &&
        APIEndpoints[activeAPI].length > 0 &&
        APIEndpoints[activeAPI].map((endpoint) => {
          return (
            <NavLink
              to={`/${activeAPI}/${endpoint.Name}`}
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
