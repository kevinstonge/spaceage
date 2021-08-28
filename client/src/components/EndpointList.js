import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import allActions from "../actions";
export default function EndpointList() {
  const apiSwagger = useSelector((state) => state.API.APISwagger);
  const activeEndpoints = useSelector((state) => state.API.activeEndpoints);
  const URLParameters = useSelector((state) => state.API.URLParameters);
  const dispatch = useDispatch();
  const history = useHistory();
  const { api, endpoint } = URLParameters;
  useEffect(() => {
    if (apiSwagger && api) {
      const endpointMatch = Object.keys(apiSwagger.paths).filter((path) => {
        const pathArray = path.split("/");
        if (pathArray[1] !== api) {
          return false;
        }
        const pathString = path
          .split("/")
          .slice(2, -1)
          .join(":")
          .replace("{id}", "id");
        if (pathString === endpoint || endpoint === api) {
          return true;
        }
        return false;
      });
      if (
        endpointMatch.length > 0 &&
        (!activeEndpoints || !activeEndpoints.hasOwnProperty(api))
      ) {
        dispatch({
          type: allActions.APIActions.setActiveEndpoint,
          payload: { apiName: api, endpoint },
        });
      }
      if (
        endpointMatch.length > 0 &&
        activeEndpoints &&
        activeEndpoints.hasOwnProperty(api) &&
        activeEndpoints[api] !== endpoint
      ) {
        dispatch({
          type: allActions.APIActions.setActiveEndpoint,
          payload: { apiName: api, endpoint: endpoint },
        });
      }
      if (
        activeEndpoints && !endpoint && activeEndpoints.hasOwnProperty(api)
      ) {
        history.push(
          `/${api}/${activeEndpoints[api]}`
        );
      }
    }
  }, [
    URLParameters,
    dispatch,
    apiSwagger,
    api,
    endpoint,
    activeEndpoints,
    history,
  ]);
  return (
    <nav>
      {api && apiSwagger &&
        Object.keys(apiSwagger.paths).map((path, index) => {
          const pathParts = path.split("/");
          const endpointPath =
            pathParts[2] === ""
              ? api
              : pathParts.slice(2, -1).join(":").replace(/[{}]/g, "");
          if (pathParts[1] === api) {
            return (
              <NavLink
                to={`/${api}/${endpointPath}`}
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
