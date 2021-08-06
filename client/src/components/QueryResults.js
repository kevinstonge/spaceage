import { useSelector } from "react-redux";

export default function QueryResults() {
  const URLParameters = useSelector((state) => 
    state.API.URLParameters
  );
  const queryPath = URLParameters
    ? `${URLParameters.api}/${URLParameters.endpoint}`
    : "";
  const queryResults = useSelector((state) =>  state.API.queryResults);
  if (queryResults && queryResults[queryPath]) {
    console.log(queryResults);
  }
  return (
    <>
    {queryResults && queryResults[queryPath] && queryResults[queryPath].queryResult.results &&
      <>
        {queryResults[queryPath].queryResult.results.map(result=>{
          return(
            <div key={result.id}>
              <p>{result.id}</p>
            </div>
          )
        })}
      </>
    }
    {(!queryResults || !queryResults[queryPath]) &&
      <p>no data</p>    
    }
    </>
  );
}