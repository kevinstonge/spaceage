import { useSelector } from "react-redux";
import ResultCard from "./ResultCard";
import Loading from "./Loading";
import "../styles/QueryResults.scss";
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
    {queryResults && queryResults[queryPath] && queryResults[queryPath].queryResult?.results &&
      <div className="queryResults">
        {queryResults[queryPath].queryResult.results.map(result=>{
          return(
            <ResultCard key={result.id} data={result} />
          )
        })}
      </div>
    }
    {(!queryResults || !queryResults[queryPath]) &&
      <p>no data</p>
    }
    {queryResults && queryResults[queryPath] && queryResults[queryPath].status === "searching" && <Loading />}
    </>
  );
}