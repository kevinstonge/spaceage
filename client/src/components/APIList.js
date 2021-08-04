import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import allActions from "../actions";
import xhr from "../lib/xhr.js";
export default function APIList(props) {
  const dispatch = useDispatch();
  const apiList = useSelector((state) => state.API.APIList);
  const activeAPI = useSelector((state) => state.API.activeAPI);
  const URLParameters = useSelector((state) => state.API.URLParameters);
  const history = useHistory();
  useEffect(() => {
    xhr.get("/data/apis").then((r) => {
      dispatch({
        type: allActions.APIActions.getAPIList,
        payload: r.data,
      });
    });
  }, [dispatch]);
  useEffect(() => {
    if (apiList && apiList.length) {
      if (URLParameters.api) {
        const apiMatch = apiList.filter(
          (api) => api.Name === URLParameters.api
        );
        if (apiMatch.length > 0) {
          dispatch({
            type: allActions.APIActions.setActiveAPI,
            payload: apiMatch[0],
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
  }, [URLParameters, apiList, history, dispatch]);
  return (
    <>
      {apiList && apiList.length > 0 && (
        <nav>
          {apiList.map((apiItem) => {
            return (
              <NavLink
                to={`/${apiItem.Name}`}
                key={`apiItem-${apiItem.ID}`}
                className={`nav ${
                  activeAPI && activeAPI.ID === apiItem.ID
                    ? `active`
                    : `inactive`
                }`}
              >
                {apiItem.Name}
              </NavLink>
            );
          })}
        </nav>
      )}
    </>
  );
}
