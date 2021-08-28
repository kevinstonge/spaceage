import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router";
import allActions from "../actions";
import callAPI from "../lib/callAPI";

export default function QueryParameters() {
  const dispatch = useDispatch();
  const history = useHistory();
  const apiSwagger = useSelector((state) => state.API.APISwagger);
  const EndpointParameters = useSelector(
    (state) => state.API.EndpointParameters
  );
  const URLParameters = useSelector((state) => state.API.URLParameters);
  const queries = useSelector((state) => state.API.queries);
  const {api, endpoint, query, pathString, queryPathForAPI} = URLParameters;

  useEffect(() => {
    if (endpoint && api && apiSwagger) {
      const favoriteParameters = ["search"];
      const pathData = apiSwagger.paths[`/${pathString}/`];
      const parameters = [];
      if (pathData?.get?.parameters && pathData.get.parameters.length > 0) {
        parameters.push(...pathData.get.parameters);
      }
      if (pathData?.parameters && pathData.parameters.length > 0) {
        parameters.push(...pathData.parameters);
      }
      const favoritesInParameters = parameters.filter((parameter) =>
        favoriteParameters.includes(parameter.name)
      );
      const parametersMinusFavorites = parameters.filter((parameter) => {
        let match = 0;
        favoritesInParameters.forEach((fav) => {
          if (fav.name === parameter.name) {
            match++;
          }
        });
        if (match > 0) {
          return false;
        }
        return true;
      });
      const sortedParameters = [
        ...favoritesInParameters,
        ...parametersMinusFavorites,
      ];
      dispatch({
        type: allActions.APIActions.getEndpointParameters,
        payload: {
          endpoint: pathString,
          parameters: sortedParameters,
        },
      });
      if (sortedParameters.length === 0 && pathData.get) {
        callAPI(pathString, pathString, "");
      }
      // if query parameters are in URLParameters.query, execute the search immediately
      if (query && apiSwagger.paths[`/${pathString}/`]) {
        callAPI(
          pathString,
          queryPathForAPI,
          query.replace("?", "")
        );
      }
    }
  }, [pathString, query, queryPathForAPI, api, endpoint, apiSwagger, dispatch]);
  //check if query data has been stored for current path, if not create empty object for this path:
  useEffect(() => {
    if (pathString && pathString !== "" && !pathString.includes("undefined")) {
      const pathExists = queries ? pathString in queries : false;
      if (!pathExists) {
        dispatch({
          type: allActions.APIActions.setQuery,
          payload: { path: pathString, data: null },
        });
      }
    }
  }, [queries, pathString, dispatch]);

  //if query data is null, add the first APIParameter to state to use by default:
  useEffect(() => {
    if (
      queries &&
      queries[pathString] === null &&
      EndpointParameters &&
      EndpointParameters[pathString] &&
      EndpointParameters[pathString].length > 0
    ) {
      dispatch({
        type: allActions.APIActions.setQuery,
        payload: {
          path: pathString,
          data: { [EndpointParameters[pathString][0].name]: "" },
        },
      });
    }
  }, [queries, pathString, EndpointParameters, dispatch]);
  const addField = () => {
    const firstUnusedField = EndpointParameters[pathString].filter(
      (parameter) => !Object.keys(queries[pathString]).includes(parameter.name)
    )[0].name;
    dispatch({
      type: allActions.APIActions.setQuery,
      payload: {
        path: pathString,
        data: {
          ...queries[pathString],
          [firstUnusedField]: "",
        },
      },
    });
  };
  const removeField = (e) => {
    const fieldName = e.target.id.substring(0, e.target.id.length - 7);
    const newQueryData = queries[pathString];
    delete newQueryData[fieldName];
    dispatch({
      type: allActions.APIActions.setQuery,
      payload: { path: pathString, data: newQueryData },
    });
  };
  const changeFieldName = (e) => {
    const oldFieldName = e.target.id.substring(0, e.target.id.length - 7);
    const newFieldName = e.target.value;
    const newQueryData = queries[pathString];
    delete newQueryData[oldFieldName];
    newQueryData[newFieldName] = "";
    dispatch({
      type: allActions.APIActions.setQuery,
      payload: { path: pathString, data: newQueryData },
    });
  };
  const changeValue = (e) => {
    const newQueryData = queries[pathString];
    newQueryData[e.target.id.substring(0, e.target.id.length - 6)] =
      e.target.value;
    dispatch({
      type: allActions.APIActions.setQuery,
      payload: { path: pathString, data: newQueryData },
    });
  };
  const onSubmit = () => {
    const queryParameters = Object.entries(queries[pathString])
      .filter((entry) => entry[1] !== "")
      .map((entry) => `${entry[0]}=${entry[1]}`)
      .sort()
      .join("&");
    history.push(`/${pathString}/${queryParameters}`);
    callAPI(pathString, queryPathForAPI, queryParameters);
  };
  return (
    <>
      {queries &&
        queries[pathString] &&
        EndpointParameters &&
        EndpointParameters[pathString] && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            {Object.entries(queries[pathString]).map((entries, index) => {
              const [parameter, value] = entries;
              return (
                <div key={`queryItem-${index}`}>
                  <select
                    value={parameter}
                    id={`${parameter}-select`}
                    onChange={(e) => changeFieldName(e)}
                  >
                    {EndpointParameters[pathString] &&
                      EndpointParameters[pathString].length > 0 &&
                      EndpointParameters[pathString].map((param, index) => {
                        const disabled =
                          Object.keys(queries[pathString]).includes(
                            param.name
                          ) && parameter !== param.name;
                        return (
                          <option
                            key={`param-${index}`}
                            disabled={disabled}
                            id={`${param.name}-option`}
                          >
                            {param.name}
                          </option>
                        );
                      })}
                  </select>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => changeValue(e)}
                    id={`${parameter}-input`}
                  ></input>
                  {index > 0 && (
                    <button
                      type="button"
                      id={`${parameter}-remove`}
                      onClick={(e) => {
                        e.preventDefault();
                        removeField(e);
                      }}
                    >
                      -
                    </button>
                  )}
                </div>
              );
            })}
            {Object.keys(queries[pathString]).length <
              EndpointParameters[pathString].length && (
              <p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    addField();
                  }}
                >
                  +
                </button>
              </p>
            )}
            <p>
              <input type="submit" value="search" />
            </p>
          </form>
        )}
    </>
  );
}
