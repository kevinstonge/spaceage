import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import allActions from "../actions";
export default function EndpointList() {
  const { paths } = useSelector((state) => state.API.APISwagger);
  const activeEndpoints = useSelector((state) => state.API.activeEndpoints);
  const {api, endpoint, pathStringForReact} = useSelector((state) => state.API.URLParameters);
  const queries = useSelector((state)=>state.API.queries);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!endpoint && activeEndpoints[api]) {
      history.push(`/${api}/${activeEndpoints[api]}`);
    } else if (paths && activeEndpoints[api] !== endpoint) {
      const endpointMatch = Object.keys(paths).filter((path) => {
        const pathArray = path.split("/");
        if (pathArray[1] !== api) {
          return false;
        }
        const pathString = path
          .split("/")
          .slice(2, -1)
          .join(":")
          .replace("{id}", "id");
        console.log(`pathString: ${pathString}, endpoint: ${endpoint}`);
        if (pathString === endpoint || endpoint === api) {
          return true;
        }
        return false;
      });
      if (endpointMatch.length > 0) {
        dispatch({
          type: allActions.APIActions.setActiveEndpoint,
          payload: { apiName: api, endpoint },
        });
      } else {
        console.log('culprit');
        history.push(`/${api}`)
      }
    }
  }, [api, endpoint, activeEndpoints, paths, dispatch, history]);
  const queriesRef = useRef(queries);
  useEffect(()=>{
    if (queriesRef.current?.hasOwnProperty(pathStringForReact) && queriesRef.current[pathStringForReact] !== null) {
      const queryParameters = Object.entries(queriesRef.current[pathStringForReact])
        .filter((entry) => entry[1] !== "")
        .map((entry) => `${entry[0]}=${entry[1]}`)
        .sort()
        .join("&");
      const currentLocation = `${history.location.pathname}${history.location.search}`;
      const newLocation = `/${pathStringForReact}/?${queryParameters}`;
      if (currentLocation !== newLocation) {
        history.push(`/${pathStringForReact}/?${queryParameters}`);
      }
    }
  }, [pathStringForReact, queriesRef, history])
  return (
    <nav>
      {api && paths &&
        Object.keys(paths).map((path, index) => {
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
                  endpoint === endpointPath
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
