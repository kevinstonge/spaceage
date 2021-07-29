import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import allActions from "../actions";
import xhr from "../lib/xhr.js";
export default function APIList(props) {
  const dispatch = useDispatch();
  const apiList = useSelector((state) => state.API.APIList);
  const activeAPI = useSelector((state) => state.API.activeAPI);
  useEffect(() => {
    xhr.get("/data/apis").then((r) => {
      dispatch({
        type: allActions.APIActions.getAPIList,
        payload: r.data,
      });
    });
  }, [dispatch]);
  return (
    <>
      {apiList && apiList.length > 0 && (
        <nav>
          {apiList.map((apiItem) => {
            return (
              <button
                key={`apiItem-${apiItem.ID}`}
                onClick={() =>
                  dispatch({
                    type: allActions.APIActions.setActiveAPI,
                    payload: apiItem,
                  })
                }
                className={`nav ${
                  activeAPI && activeAPI.ID === apiItem.ID
                    ? `active`
                    : `inactive`
                }`}
              >
                {apiItem.Name}
              </button>
            );
          })}
        </nav>
      )}
    </>
  );
}
