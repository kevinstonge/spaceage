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
  const submitHandler = () => { console.log('submit'); }
  const addField = () => {
    const countExistingFields = Object.keys(queries[queryPath]).length;
    dispatch({
      type: allActions.APIActions.setQuery,
      payload: { path: queryPath, data: { 
        ...queries[queryPath], 
        [EndpointParameters[activeEndpoint.Name][countExistingFields].Name]: "",
      }}
    })
  }
  return (
    <>
      {queries && queries[queryPath] && activeEndpoint && EndpointParameters && EndpointParameters[activeEndpoint.Name] && (
        <form 
          onSubmit={
            (e)=>{
              e.preventDefault();
              submitHandler();
            }
          }
        >
          {
            Object.entries(queries[queryPath]).map((entries, index)=>{
              const [parameter, value] = entries;
              return(
                <div key={`queryItem-${index}`}>
                <select defaultValue={parameter}>
                  {EndpointParameters[activeEndpoint.Name].map((param) => {
                    console.log(`parameter: ${parameter}`);
                    console.log(`param.Name: ${param.Name}`);
                    const disabled = Object.keys(queries[queryPath]).includes(param.Name) && parameter !== param.Name;
                    return (
                      <option 
                        key={`paramID-${param.Parameter_ID}`}
                        disabled={disabled}
                      >
                        {param.Name}
                      </option>
                    );
                  })}
                </select>
                <input type="text" value={value} onChange={()=>console.log('change')}></input>
                { index > 0 && <button>-</button> }
                </div>
              )
          })}
          { Object.keys(queries[queryPath]).length < EndpointParameters[activeEndpoint.Name].length && (
            <p><button onClick={()=>{addField()}}>+</button></p>
          ) }
          <p><button>Search</button></p>
        </form>
      )}
      <p>{JSON.stringify(queries)}</p>
    </>
  );
}
