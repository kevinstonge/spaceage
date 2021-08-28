import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import allActions from "../actions";
import callAPI from "../lib/callAPI";
import { useHistory } from "react-router";
export default function QueryParameters() {
  const dispatch = useDispatch();
  const history = useHistory();
  const apiSwagger = useSelector((state) => state.API.APISwagger);
  const activeEndpoints = useSelector((state) => state.API.activeEndpoints);
  const EndpointParameters = useSelector(
    (state) => state.API.EndpointParameters
  );
  const URLParameters = useSelector((state) => state.API.URLParameters);
  const queries = useSelector((state) => state.API.queries);
  const queryPath = URLParameters
    ? `${URLParameters.api}/${URLParameters.endpoint}`
    : "";
  const pathString =
    URLParameters?.api && URLParameters?.endpoint
      ? URLParameters.api === URLParameters.endpoint
        ? URLParameters.api
        : `${URLParameters.api}/${URLParameters.endpoint
            .replace(":", "/")
            .replace("id", "{id}")}`
      : undefined;
  const queryPathForAPI =
    URLParameters?.api && URLParameters?.endpoint
      ? URLParameters.api === URLParameters.endpoint
        ? URLParameters.api
        : `${URLParameters.api}/${URLParameters.endpoint}`
      : "";
  useEffect(() => {
    if (URLParameters?.endpoint && URLParameters?.api && apiSwagger) {
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
      // if the endpoint has no parameters, execute the search immediately
      if (sortedParameters.length === 0 && pathData.get) {
        callAPI(pathString, pathString, "");
      }
      // if query parameters are in URLParameters.query, execute the search immediately
      if (URLParameters.query && apiSwagger.paths[`/${pathString}/`]) {
        if (URLParameters.query.length > 0) {
          dispatch({
            type: allActions.APIActions.setQuery,
            payload: { path: queryPath, data: URLParameters.queryObject },
          });
        }
        callAPI(
          pathString,
          queryPathForAPI,
          URLParameters.query.replace("?", "")
        );
      }
    }
  }, [
    URLParameters,
    pathString,
    apiSwagger,
    queryPathForAPI,
    queryPath,
    dispatch,
  ]);
  //check if query data has been stored for current path, if not create empty object for this path:
  useEffect(() => {
    if (queryPath !== "" && !queryPath.includes("undefined")) {
      const pathExists = queries ? queryPath in queries : false;
      if (!pathExists) {
        dispatch({
          type: allActions.APIActions.setQuery,
          payload: { path: queryPath, data: null },
        });
      }
    }
  }, [queries, queryPath, dispatch]);

  //if query data is null, add the first APIParameter to state to use by default:
  useEffect(() => {
    if (
      queries &&
      queries[queryPath] === null &&
      EndpointParameters &&
      EndpointParameters[pathString] &&
      EndpointParameters[pathString].length > 0
    ) {
      dispatch({
        type: allActions.APIActions.setQuery,
        payload: {
          path: queryPath,
          data: { [EndpointParameters[pathString][0].name]: "" },
        },
      });
    }
  }, [queries, queryPath, EndpointParameters, pathString, dispatch]);
  const addField = () => {
    const firstUnusedField = EndpointParameters[pathString].filter(
      (parameter) => !Object.keys(queries[queryPath]).includes(parameter.name)
    )[0].name;
    dispatch({
      type: allActions.APIActions.setQuery,
      payload: {
        path: queryPath,
        data: {
          ...queries[queryPath],
          [firstUnusedField]: "",
        },
      },
    });
  };
  const removeField = (e) => {
    const fieldName = e.target.id.substring(0, e.target.id.length - 7);
    const newQueryData = queries[queryPath];
    delete newQueryData[fieldName];
    dispatch({
      type: allActions.APIActions.setQuery,
      payload: { path: queryPath, data: newQueryData },
    });
  };
  const changeFieldName = (e) => {
    const oldFieldName = e.target.id.substring(0, e.target.id.length - 7);
    const newFieldName = e.target.value;
    const newQueryData = queries[queryPath];
    delete newQueryData[oldFieldName];
    newQueryData[newFieldName] = "";
    dispatch({
      type: allActions.APIActions.setQuery,
      payload: { path: queryPath, data: newQueryData },
    });
  };
  const changeValue = (e) => {
    const newQueryData = queries[queryPath];
    newQueryData[e.target.id.substring(0, e.target.id.length - 6)] =
      e.target.value;
    dispatch({
      type: allActions.APIActions.setQuery,
      payload: { path: queryPath, data: newQueryData },
    });
  };
  const onSubmit = () => {
    const queryParameters = Object.entries(queries[queryPath])
      .filter((entry) => entry[1] !== "")
      .map((entry) => `${entry[0]}=${entry[1]}`)
      .sort()
      .join("&");
    history.push(
      `/${URLParameters.api}/${
        activeEndpoints[URLParameters.api]
      }/?${queryParameters}`
    );
  };
  return (
    <>
      {queries &&
        queries[queryPath] &&
        EndpointParameters &&
        EndpointParameters[pathString] && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            {Object.entries(queries[queryPath]).map((entries, index) => {
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
                          Object.keys(queries[queryPath]).includes(
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
            {Object.keys(queries[queryPath]).length <
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
