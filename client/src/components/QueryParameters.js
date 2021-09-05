import { useSelector, useDispatch } from "react-redux";
import {  useEffect } from "react";
import { useHistory } from "react-router";
import allActions from "../actions";
import callAPI from "../lib/callAPI";
import getAndSortParameters from "../lib/getAndSortParameters";
export default function QueryParameters() {
  const dispatch = useDispatch();
  const history = useHistory();
  const apiSwagger = useSelector((state) => state.API.APISwagger);
  const EndpointParameters = useSelector(
    (state) => state.API.EndpointParameters
  );
  const URLParameters = useSelector((state) => state.API.URLParameters);
  const queries = useSelector((state) => state.API.queries);
  const queryResults = useSelector((state)=> state.API.queryResults);
  const {api, endpoint, query, pathStringForSwagger, fullQueryForAPI, pathStringForReact, fullQueryForReact} = URLParameters;

  // if query parameters are in URLParameters.query, execute the search immediately
  useEffect(()=>{
    if (query && apiSwagger.paths && apiSwagger.paths[`${pathStringForSwagger}`]) {
      const queryObject = JSON.parse(
        '{"' + decodeURI(query)
          .replace(/^\?/,'')
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g,'":"') + '"}'
      );
      dispatch({
        type: allActions.APIActions.setQuery,
        payload: { path: pathStringForReact, data: queryObject }
      });
      if (!queryResults[fullQueryForReact]) {
        callAPI(URLParameters);
      }
    }
  },[query, queryResults, apiSwagger, URLParameters, pathStringForReact, fullQueryForReact, pathStringForSwagger, dispatch]);
  useEffect(() => {
    //generate list of parameters for the endpoint
    if (endpoint && api && apiSwagger.paths) {
      const pathData = apiSwagger.paths[`${pathStringForSwagger}`];
      const sortedParameters = getAndSortParameters(pathData);
      dispatch({
        type: allActions.APIActions.getEndpointParameters,
        payload: {
          endpoint: pathStringForReact,
          parameters: sortedParameters,
        },
      });
      // if the endpoint has no parameters, execute the search immediately
      if (sortedParameters.length === 0 && pathData?.get) {
        if (!queryResults[fullQueryForReact]) {
          callAPI(URLParameters);
        }
      }
    }
  }, [URLParameters, pathStringForSwagger, pathStringForReact, fullQueryForReact, api, endpoint, apiSwagger, queryResults, dispatch]);
  // if query data has not been stored for current path, create empty object for this path:
  useEffect(() => {
    if (pathStringForReact) {
      if (!queries.hasOwnProperty(pathStringForReact)) {
        dispatch({
          type: allActions.APIActions.setQuery,
          payload: { path: pathStringForReact, data: null },
        });
      }
    }
  }, [queries, pathStringForReact, dispatch]);
  //if query data is null, add the first APIParameter to state to use by default:
  useEffect(() => {
    if (
      queries[pathStringForReact] === null &&
      EndpointParameters &&
      EndpointParameters[pathStringForReact] &&
      EndpointParameters[pathStringForReact].length > 0
    ) {
      dispatch({
        type: allActions.APIActions.setQuery,
        payload: {
          path: pathStringForReact,
          data: { [EndpointParameters[pathStringForReact][0].name]: "" },
        },
      });
    }
  }, [queries, pathStringForReact, EndpointParameters, fullQueryForAPI, fullQueryForReact, dispatch]);
  const addField = () => {
    const firstUnusedField = EndpointParameters[pathStringForReact].filter(
      (parameter) => !Object.keys(queries[pathStringForReact]).includes(parameter.name)
    )[0].name;
    dispatch({
      type: allActions.APIActions.setQuery,
      payload: {
        path: pathStringForReact,
        data: {
          ...queries[pathStringForReact],
          [firstUnusedField]: "",
        },
      },
    });
  };
  const removeField = (e) => {
    const fieldName = e.target.id.substring(0, e.target.id.length - 7);
    const newQueryData = queries[pathStringForReact];
    delete newQueryData[fieldName];
    dispatch({
      type: allActions.APIActions.setQuery,
      payload: { path: pathStringForReact, data: newQueryData },
    });
  };
  const changeFieldName = (e) => {
    const oldFieldName = e.target.id.substring(0, e.target.id.length - 7);
    const newFieldName = e.target.value;
    const newQueryData = queries[pathStringForReact];
    delete newQueryData[oldFieldName];
    newQueryData[newFieldName] = "";
    dispatch({
      type: allActions.APIActions.setQuery,
      payload: { path: pathStringForReact, data: newQueryData },
    });
  };
  const changeValue = (e) => {
    const newQueryData = queries[pathStringForReact];
    newQueryData[e.target.id.substring(0, e.target.id.length - 6)] =
      e.target.value;
    dispatch({
      type: allActions.APIActions.setQuery,
      payload: { path: pathStringForReact, data: newQueryData },
    });
  };
  const onSubmit = () => {
    const queryParameters = Object.entries(queries[pathStringForReact])
      .filter((entry) => entry[1] !== "")
      .map((entry) => `${entry[0]}=${entry[1]}`)
      .sort()
      .join("&");
    history.push(`/${pathStringForReact}/?${queryParameters}`);
  };
  return (
    <>
      {queries &&
        queries[pathStringForReact] !== null &&
        EndpointParameters &&
        EndpointParameters.hasOwnProperty(pathStringForReact) && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            {Object.entries(queries[pathStringForReact]).map((entries, index) => {
              const [parameter, value] = entries;
              return (
                <div key={`queryItem-${index}`}>
                  <select
                    value={parameter}
                    id={`${parameter}-select`}
                    onChange={(e) => changeFieldName(e)}
                  >
                    {EndpointParameters[pathStringForReact] &&
                      EndpointParameters[pathStringForReact].length > 0 &&
                      EndpointParameters[pathStringForReact].map((param, index) => {
                        const disabled =
                          Object.keys(queries[pathStringForReact]).includes(
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
            {Object.keys(queries[pathStringForReact]).length <
              EndpointParameters[pathStringForReact].length && (
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
