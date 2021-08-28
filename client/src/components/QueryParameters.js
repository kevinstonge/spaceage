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
  const {api, endpoint, query, pathStringForSwagger, fullQueryForAPI, pathStringForReact, fullQueryForReact} = URLParameters;
  useEffect(() => {
    if (endpoint && api && apiSwagger) {
      const favoriteParameters = ["search"];
      const pathData = apiSwagger.paths[`${pathStringForSwagger}`];
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
          endpoint: pathStringForReact,
          parameters: sortedParameters,
        },
      });
      // if the endpoint has no parameters, execute the search immediately
      if (sortedParameters.length === 0 && pathData?.get) {
        callAPI(URLParameters);
      }
      // if query parameters are in URLParameters.query, execute the search immediately
      if (query && apiSwagger.paths[`/${pathStringForSwagger}/`]) {
        callAPI(URLParameters);
      }
    }
  }, [URLParameters, pathStringForSwagger, query, fullQueryForAPI, pathStringForReact, api, endpoint, apiSwagger, dispatch]);
  //check if query data has been stored for current path, if not create empty object for this path:
  useEffect(() => {
    if (fullQueryForReact && fullQueryForReact !== "" && !fullQueryForReact.includes("undefined")) {
      const pathExists = queries ? fullQueryForReact in queries : false;
      if (!pathExists) {
        dispatch({
          type: allActions.APIActions.setQuery,
          payload: { path: fullQueryForReact, data: null },
        });
      }
    }
  }, [queries, fullQueryForReact, dispatch]);

  //if query data is null, add the first APIParameter to state to use by default:
  useEffect(() => {
    if (
      queries &&
      queries[fullQueryForReact] === null &&
      EndpointParameters &&
      EndpointParameters[pathStringForReact] &&
      EndpointParameters[pathStringForReact].length > 0
    ) {
      console.log(EndpointParameters[pathStringForReact]);
      dispatch({
        type: allActions.APIActions.setQuery,
        payload: {
          path: fullQueryForReact,
          data: { [EndpointParameters[pathStringForReact][0].name]: "" },
        },
      });
    }
  }, [queries, pathStringForReact, EndpointParameters, fullQueryForAPI, fullQueryForReact, dispatch]);
  const addField = () => {
    const firstUnusedField = EndpointParameters[pathStringForSwagger].filter(
      (parameter) => !Object.keys(queries[pathStringForSwagger]).includes(parameter.name)
    )[0].name;
    dispatch({
      type: allActions.APIActions.setQuery,
      payload: {
        path: pathStringForSwagger,
        data: {
          ...queries[pathStringForSwagger],
          [firstUnusedField]: "",
        },
      },
    });
  };
  const removeField = (e) => {
    const fieldName = e.target.id.substring(0, e.target.id.length - 7);
    const newQueryData = queries[pathStringForSwagger];
    delete newQueryData[fieldName];
    dispatch({
      type: allActions.APIActions.setQuery,
      payload: { path: pathStringForSwagger, data: newQueryData },
    });
  };
  const changeFieldName = (e) => {
    const oldFieldName = e.target.id.substring(0, e.target.id.length - 7);
    const newFieldName = e.target.value;
    const newQueryData = queries[pathStringForSwagger];
    delete newQueryData[oldFieldName];
    newQueryData[newFieldName] = "";
    dispatch({
      type: allActions.APIActions.setQuery,
      payload: { path: pathStringForSwagger, data: newQueryData },
    });
  };
  const changeValue = (e) => {
    const newQueryData = queries[pathStringForSwagger];
    newQueryData[e.target.id.substring(0, e.target.id.length - 6)] =
      e.target.value;
    dispatch({
      type: allActions.APIActions.setQuery,
      payload: { path: pathStringForSwagger, data: newQueryData },
    });
  };
  const onSubmit = () => {
    const queryParameters = Object.entries(queries[pathStringForSwagger])
      .filter((entry) => entry[1] !== "")
      .map((entry) => `${entry[0]}=${entry[1]}`)
      .sort()
      .join("&");
    history.push(`/${pathStringForReact}/?${queryParameters}`);
    callAPI(URLParameters);
  };
  return (
    <>
      {queries &&
        queries[fullQueryForReact] &&
        EndpointParameters &&
        EndpointParameters[pathStringForSwagger] && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            {Object.entries(queries[pathStringForSwagger]).map((entries, index) => {
              const [parameter, value] = entries;
              return (
                <div key={`queryItem-${index}`}>
                  <select
                    value={parameter}
                    id={`${parameter}-select`}
                    onChange={(e) => changeFieldName(e)}
                  >
                    {EndpointParameters[pathStringForSwagger] &&
                      EndpointParameters[pathStringForSwagger].length > 0 &&
                      EndpointParameters[pathStringForSwagger].map((param, index) => {
                        const disabled =
                          Object.keys(queries[pathStringForSwagger]).includes(
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
            {Object.keys(queries[pathStringForSwagger]).length <
              EndpointParameters[pathStringForSwagger].length && (
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
