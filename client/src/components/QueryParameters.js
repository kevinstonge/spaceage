import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import allActions from "../actions";
import xhr from "../lib/xhr";

export default function QueryParameters() {
  const dispatch = useDispatch();
  const activeEndpoint = useSelector((state) => state.API.activeEndpoint);
  const APIParameters = useSelector((state) => state.API.APIParameters);
  const URLParameters = useSelector((state) => state.API.URLParameters);
  const queryPath = URLParameters
    ? `${URLParameters.api}/${URLParameters.endpoint}`
    : "";
  const queries = useSelector((state) => state.API.queries);
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
  // useEffect(() => {
  //   if (queries[queryPath]) {
  //     console.log("exists");
  //   } else {
  //     dispatch({
  //       type: allActions.APIActions.setQuery,
  //       payload: { path: queryPath, data: {} },
  //     });
  //   }
  // }, []);
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
