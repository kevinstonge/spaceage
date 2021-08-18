import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import allActions from "../actions";
import xhr from "../lib/xhr.js";
export default function APIList(props) {
  const dispatch = useDispatch();
  const apiSwagger = useSelector((state) => state.API.APISwagger);
  const activeAPI = useSelector((state) => state.API.activeAPI);
  const URLParameters = useSelector((state) => state.API.URLParameters);
  const history = useHistory();
  useEffect(() => {
    xhr.get("/data/apis").then((r) => {
      dispatch({
        type: allActions.APIActions.getAPISwagger,
        payload: r.data,
      });
    });
  }, [dispatch]);
  useEffect(() => {
    if (apiSwagger && apiSwagger.paths) {
      if (URLParameters.api) {
        const apiMatch = Object.keys(apiSwagger.paths).filter(
          (api) => api.split("/")[1] === URLParameters.api
        );
        if (apiMatch.length > 0) {
          dispatch({
            type: allActions.APIActions.setActiveAPI,
            payload: apiMatch[0].split("/")[1],
          });
        } else {
          dispatch({
            type: allActions.APIActions.setActiveAPI,
            payload: null,
          });
          history.push("/");
        }
      } else {
        dispatch({
          type: allActions.APIActions.setActiveAPI,
          payload: null,
        });
      }
    }
  }, [URLParameters, apiSwagger, history, dispatch]);

  return (
    <>
      {apiSwagger?.paths && (
        <nav>
          {Array.from(
            new Set(
              Object.keys(apiSwagger.paths).map((path) => {
                return path.split("/")[1];
              })
            )
          ).map((apiItem, index) => {
            return (
              <NavLink
                to={`/${apiItem}`}
                key={`apiItem-${index}`}
                className={`nav ${
                  activeAPI && activeAPI.Name === apiItem
                    ? `active`
                    : `inactive`
                }`}
              >
                {apiItem}
              </NavLink>
            );
          })}
        </nav>
      )}
    </>
  );
}
