import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../actions";
import ResultCard from "./ResultCard";
import Loading from "./Loading";
import "../styles/QueryResults.scss";
import { xhr } from "../lib/xhr";
export default function QueryResults() {
  const URLParameters = useSelector((state) => state.API.URLParameters);
  const { fullQueryForReact } = URLParameters;
  const dispatch = useDispatch();
  const queryResults = useSelector((state) => state.API.queryResults);
  const favorites = useSelector((state) => state.user.favorites);
  const token = useSelector((state) => state.user.token);
  const addFavorite = () => {
    const favorite = queryResults[fullQueryForReact].query;
    xhr
      .post(
        "/users/favorites/add",
        { favorite },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((r) => {
        if (r.status === 201) {
          dispatch({
            type: allActions.userActions.addFavorite,
            payload: { favorite },
          });
        } else {
          console.log("error adding favorite");
        }
      });
  };
  const removeFavorite = () => {
    const favorite = queryResults[fullQueryForReact].query;
    xhr
      .delete("/users/favorites/remove", {
        data: { favorite },
        headers: { authorization: `Bearer ${token}` },
      })
      .then((r) => {
        if (r.status === 200) {
          dispatch({
            type: allActions.userActions.removeFavorite,
            payload: { favorite },
          });
        } else {
          console.log("error deleting favorite");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const queryResultKeys = Object.keys(queryResults);
    if (Object.keys(queryResultKeys).length > 10) {
      dispatch({ type: allActions.APIActions.cleanUpQueryResults });
    }
  }, [queryResults, dispatch]);
  return (
    <>
      {queryResults[fullQueryForReact] &&
        queryResults[fullQueryForReact].queryResult.length > 0 && (
          <div className="queryResults">
            <div>
              <p>
                results for query: "{queryResults[fullQueryForReact].query}"
                {favorites.includes(queryResults[fullQueryForReact].query) ? (
                  <button onClick={() => removeFavorite()}>
                    remove from favorites
                  </button>
                ) : (
                  <button onClick={() => addFavorite()}>
                    add to favorites
                  </button>
                )}
              </p>
            </div>
            {queryResults[fullQueryForReact].queryResult.map(
              (result, index) => {
                return <ResultCard key={`resultCard-${index}`} data={result} />;
              }
            )}
          </div>
        )}
      {(!queryResults ||
        !queryResults[fullQueryForReact] ||
        queryResults[fullQueryForReact].length === 0) && <p>no data</p>}
      {queryResults &&
        queryResults[fullQueryForReact] &&
        queryResults[fullQueryForReact].status === "searching" && <Loading />}
    </>
  );
}
