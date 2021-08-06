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

  //if query data is null, choose one APIParameter to use by default (search, name, id):
  useEffect(()=>{
    if (queries && queries[queryPath] === null && activeEndpoint && EndpointParameters && EndpointParameters[activeEndpoint.Name] && EndpointParameters[activeEndpoint.Name].length > 0) {
      console.log(EndpointParameters[activeEndpoint.Name]);
      
    }
  }, [queries, queryPath, EndpointParameters, activeEndpoint, dispatch])

  const submitHandler = () => { console.log('submit'); }
  return (
    <>
      {activeEndpoint && EndpointParameters && EndpointParameters[activeEndpoint.Name] && (
        <form 
          onSubmit={
            (e)=>{
              e.preventDefault();
              submitHandler();
            }
          }
        >
          <select>
            {EndpointParameters[activeEndpoint.Name].map((param) => {
              return <option key={`param-${param.ID}`}>{param.Name}</option>;
            })}
          </select>
          <input type="text" ></input>
        </form>
      )}
      <p>{JSON.stringify(queries)}</p>
    </>
  );
}
