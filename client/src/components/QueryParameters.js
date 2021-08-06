import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import allActions from "../actions";
import xhr from "../lib/xhr";

export default function QueryParameters() {
  const dispatch = useDispatch();
  const activeEndpoint = useSelector((state) => state.API.activeEndpoint);
  const EndpointParameters = useSelector((state) => state.API.EndpointParameters);
  const URLParameters = useSelector((state) => state.API.URLParameters);
  const queries = useSelector((state) => state.API.queries);
  const queryPath = URLParameters
    ? `${URLParameters.api}/${URLParameters.endpoint}`
    : "";
  useEffect(() => {
    if (activeEndpoint && activeEndpoint.ID) {
      xhr.get(`/data/parameters/${activeEndpoint.ID}`).then((r) => {
        dispatch({
          type: allActions.APIActions.getEndpointParameters,
          payload: {
            endpoint: activeEndpoint.Name,
            parameters: r.data,
          },
        });
      });
    }
  }, [activeEndpoint, dispatch]);
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
  useEffect(()=>{
    if (queries && queries[queryPath] === null && activeEndpoint && EndpointParameters && EndpointParameters[activeEndpoint.Name] && EndpointParameters[activeEndpoint.Name].length > 0) {
      dispatch({
        type: allActions.APIActions.setQuery,
        payload: { path: queryPath, data: { [EndpointParameters[activeEndpoint.Name][0].Name]: "" } },
      })
    }
  }, [queries, queryPath, EndpointParameters, activeEndpoint, dispatch])
  const addField = () => {
    const firstUnusedField = EndpointParameters[activeEndpoint.Name].filter(parameter=>
      !Object.keys(queries[queryPath]).includes(parameter.Name)
    )[0].Name;
    console.log(firstUnusedField);
    dispatch({
      type: allActions.APIActions.setQuery,
      payload: { path: queryPath, data: { 
        ...queries[queryPath], 
        [firstUnusedField]: "",
      }}
    })
  }
  const removeField = (e) => {
    const fieldName = e.target.id.substring(0,e.target.id.length - 7);
    const newQueryData = queries[queryPath];
    delete newQueryData[fieldName];
    dispatch({
      type: allActions.APIActions.setQuery,
      payload: { path: queryPath, data: newQueryData, },
    })
  }
  const changeFieldName = (e) => {
    const oldFieldName = e.target.id.substring(0,e.target.id.length - 7);
    const newFieldName = e.target.value;
    const newQueryData = queries[queryPath];
    delete newQueryData[oldFieldName];
    newQueryData[newFieldName] = "";
    dispatch({
      type: allActions.APIActions.setQuery,
      payload: { path: queryPath, data: newQueryData }
    })
  }
  const changeValue = (e) => {
    const newQueryData = queries[queryPath];
    newQueryData[e.target.id.substring(0,e.target.id.length - 6)] = e.target.value;
    dispatch({
      type: allActions.APIActions.setQuery,
      payload: { path: queryPath, data: newQueryData }
    })
  }
  const onSubmit = () => {
    const queryParameters = Object.entries(queries[queryPath]).filter((entry)=>entry[1]!=="").map(entry=>`${entry[0]}=${entry[1]}`).join('&');
    dispatch({
      type: allActions.APIActions.setQueryResults,
      payload: {
        queryPath,
        query: queryParameters,
        queryResult: [],
        status: "searching",
      },
    });
    xhr.get(`/data/${queryPath}/?${queryParameters}`)
      .then((r)=>{
        console.log(r);
        if (r.data) {
          dispatch({
            type: allActions.APIActions.setQueryResults,
            payload: {
              queryPath,
              query: queryParameters,
              queryResult: r.data,
              status: "success",
            }
          })
        }
      })
  }
  return (
    <>
      {queries && queries[queryPath] && activeEndpoint && EndpointParameters && EndpointParameters[activeEndpoint.Name] && (
        <form 
          onSubmit={
            (e)=>{
              e.preventDefault();
              onSubmit();
            }
          }
        >
          {
            Object.entries(queries[queryPath]).map((entries, index)=>{
              const [parameter, value] = entries;
              return(
                <div key={`queryItem-${index}`}>
                <select value={parameter} id={`${parameter}-select`} onChange={(e)=>changeFieldName(e)}>
                  {EndpointParameters[activeEndpoint.Name].map((param) => {
                    const disabled = Object.keys(queries[queryPath]).includes(param.Name) && parameter !== param.Name;
                    return (
                      <option 
                        key={`paramID-${param.Parameter_ID}`}
                        disabled={disabled}
                        id={`${param.Name}-option`}
                      >
                        {param.Name}
                      </option>
                    );
                  })}
                </select>
                <input type="text" value={value} onChange={(e)=>changeValue(e)} id={`${parameter}-input`}></input>
                { index > 0 && <button id={`${parameter}-remove`} onClick={(e)=>{e.preventDefault(); removeField(e);}}>-</button> }
                </div>
              )
          })}
          { Object.keys(queries[queryPath]).length < EndpointParameters[activeEndpoint.Name].length && (
            <p><button onClick={(e)=>{e.preventDefault(); addField();}}>+</button></p>
          ) }
          <p><button type="submit">Search</button></p>
        </form>
      )}
      <p>{JSON.stringify(queries)}</p>
    </>
  );
}
