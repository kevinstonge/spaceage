import ResultItem from "./ResultItem";
import "../styles/QueryResults.scss"
export default function ResultCard(props) {
  return(
    <div className="resultCard">
      {Object.entries(props.data).map((result,idx)=>{
        const [property, value] = result;
        if (value === null || value.length === 0) { return null }
        return(
            <ResultItem key={`${property}-${idx}`} property={property} value={value} />
        );
      })}
    </div>
  )
}