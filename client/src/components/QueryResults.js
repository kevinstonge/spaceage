import { useSelector } from "react-redux";

export default function QueryResults() {
  const URLParameters = useSelector((state) => 
    state.API.URLParameters
  );
  const queryPath = URLParameters
    ? `${URLParameters.api}/${URLParameters.endpoint}`
    : "";
  const queryResults = useSelector((state) =>  state.API.queryResults);
  return (
    <>
    {queryResults && queryResults[queryPath] &&
      <>
        {JSON.stringify(queryResults[queryPath].status)}
      </>
    }
    {(!queryResults || !queryResults[queryPath]) &&
      <p>no data</p>    
    }
    </>
  );
}