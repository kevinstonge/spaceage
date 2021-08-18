import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import allActions from "../actions";
export default function EndpointList() {
  const activeAPI = useSelector((state) => state.API.activeAPI);
  const apiSwagger = useSelector((state) => state.API.APISwagger);
  const activeEndpoints = useSelector((state) => state.API.activeEndpoints);
  const URLParameters = useSelector((state) => state.API.URLParameters);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (URLParameters && apiSwagger && activeAPI) {
      const endpointMatch = Object.keys(apiSwagger.paths).filter(
        (path) =>
          path.split("/")[2] === URLParameters.endpoint ||
          URLParameters.endpoint === URLParameters.api
      );
      if (
        endpointMatch.length > 0 &&
        (!activeEndpoints || !activeEndpoints.hasOwnProperty(URLParameters.api))
      ) {
        dispatch({
          type: allActions.APIActions.setActiveEndpoint,
          payload: { apiName: activeAPI, endpoint: URLParameters.endpoint },
        });
      }
      if (
        endpointMatch.length > 0 &&
        activeEndpoints &&
        activeEndpoints.hasOwnProperty(URLParameters.api) &&
        activeEndpoints[URLParameters.api] !== URLParameters.endpoint
      ) {
        dispatch({
          type: allActions.APIActions.setActiveEndpoint,
          payload: { apiName: activeAPI, endpoint: URLParameters.endpoint },
        });
      }
      if (
        URLParameters &&
        activeEndpoints &&
        (!URLParameters.hasOwnProperty("endpoint") ||
          URLParameters.endpoint === undefined) &&
        activeEndpoints.hasOwnProperty(URLParameters.api)
      ) {
        history.push(
          `/${URLParameters.api}/${activeEndpoints[URLParameters.api]}`
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
          const pathParts = path.split("/");
          const endpointPath =
            pathParts[2] === ""
              ? activeAPI
              : pathParts.slice(2, -1).join(":").replace(/[{}]/g, "");
          if (pathParts[1] === activeAPI) {
            return (
              <NavLink
                to={`/${activeAPI}/${endpointPath}`}
                key={`endpoint-${endpointPath}-${index}`}
                className={`nav ${
                  URLParameters.endpoint === endpointPath
                    ? `active`
                    : `inactive`
                }`}
              >
                {endpointPath}
              </NavLink>
            );
          } else {
            return null;
          }
        })}
    </nav>
  );
}
