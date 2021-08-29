import { useSelector } from "react-redux";
import ResultCard from "./ResultCard";
import Loading from "./Loading";
import "../styles/QueryResults.scss";
export default function QueryResults() {
  const URLParameters = useSelector((state) => 
    state.API.URLParameters
  );
  const {fullQueryForReact} = URLParameters
  const queryResults = useSelector((state) =>  state.API.queryResults);
  return (
    <>
    {queryResults && queryResults[fullQueryForReact] && queryResults[fullQueryForReact].queryResult?.results &&
      <div className="queryResults">
        {queryResults[fullQueryForReact].queryResult.results.map((result,index)=>{
          return(
            <ResultCard key={`resultCard-${index}`} data={result} />
          )
        })}
      </div>
    }
    {(!queryResults || !queryResults[fullQueryForReact]) &&
      <p>no data</p>
    }
    {queryResults && queryResults[fullQueryForReact] && queryResults[fullQueryForReact].status === "searching" && <Loading />}
    </>
  );
}