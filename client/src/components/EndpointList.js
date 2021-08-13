import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import allActions from "../actions";
export default function EndpointList(props) {
  const activeAPI = useSelector((state) => state.API.activeAPI);
  const apiSwagger = useSelector((state) => state.API.APISwagger);
  const activeEndpoints = useSelector((state) => state.API.activeEndpoints);
  const URLParameters = useSelector((state) => state.API.URLParameters);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (URLParameters && URLParameters.endpoint && apiSwagger) {
      const endpointMatch = Object.keys(apiSwagger.paths).filter(
        (path) => path.split("/")[2] === URLParameters.endpoint
      );
      if (endpointMatch.length > 0) {
        dispatch({
          type: allActions.APIActions.setActiveEndpoint,
          payload: { apiName: activeAPI, endpoint: URLParameters.endpoint },
        });
      } else {
        dispatch({
          type: allActions.APIActions.setActiveEndpoint,
          payload: { apiName: activeAPI, endpoint: null },
        });
        history.push(`${URLParameters.api}/`);
      }
    } else if (URLParameters && URLParameters.endpoint === null) {
      if (activeEndpoints[URLParameters.api]) {
        history.push(
          `${URLParameters.api}/${activeEndpoints[URLParameters.api]}`
        );
      }
    }
  }, [
    URLParameters,
    dispatch,
    apiSwagger,
    activeAPI,
    activeEndpoints,
    history,
  ]);

  return (
    <nav>
      {URLParameters?.api &&
        apiSwagger &&
        Object.keys(apiSwagger.paths).map((path, index) => {
          if (
            path.split("/")[1] === activeAPI &&
            path.split("/").length === 4
          ) {
            const endpoint = path.split("/")[2];
            return (
              <NavLink
                to={`/${activeAPI}/${endpoint}`}
                key={`endpoint-${endpoint}-${index}`}
                className={`nav ${
                  URLParameters.endpoint === endpoint ? `active` : `inactive`
                }`}
              >
                {endpoint}
              </NavLink>
            );
          } else {
            return null;
          }
        })}
    </nav>
  );
}
