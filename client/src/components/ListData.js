import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import xhr from "../lib/xhr";
import allActions from "../actions";
export default function ListData(props) {
  const activeAPI = useSelector((state) => state.API.activeAPI);
  const APIEndpoints = useSelector((state) => state.API.APIEndpoints);
  const activeEndpoint = useSelector((state) => state.API.activeEndpoint);
  const dispatch = useDispatch();
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
  return (
    <nav>
      {APIEndpoints &&
        APIEndpoints.map((endpoint) => {
          return (
            <button
              key={`endpoint-${endpoint.ID}`}
              className={`nav ${
                activeEndpoint && activeEndpoint.ID === endpoint.ID
                  ? `active`
                  : `inactive`
              }`}
              onClick={() => {
                dispatch({
                  type: allActions.APIActions.setActiveEndpoint,
                  payload: endpoint,
                });
              }}
            >
              {endpoint.Name}
            </button>
          );
        })}
    </nav>
  );
}
