import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import allActions from "../actions";
import xhr from "../lib/xhr";

export default function QueryParameters() {
  const dispatch = useDispatch();
  const activeEndpoint = useSelector((state) => state.API.activeEndpoint);
  const APIParameters = useSelector((state) => state.API.APIParameters);
  const queryState = useSelector((state) => state.API.queryState);
  useEffect(() => {
    if (activeEndpoint && activeEndpoint.ID) {
      xhr.get(`/data/parameters/${activeEndpoint.ID}`).then((r) => {
        dispatch({
          type: allActions.APIActions.getAPIParameters,
          payload: r.data,
        });
      });
    }
  }, [activeEndpoint, dispatch]);
  return (
    <>
      {APIParameters && APIParameters.length > 0 && (
        <form>
          <select>
            {APIParameters.map((param) => {
              return <option key={`param-${param.ID}`}>{param.Name}</option>;
            })}
          </select>
          <input type="text"></input>
        </form>
      )}
    </>
  );
}
