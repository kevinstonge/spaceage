import ResultItem from "./ResultItem";
import validator from "validator";
import "../styles/QueryResults.scss";
export default function ResultCard(props) {
  const imageData = {
    url: null,
  };
  return (
    <div className="resultCard">
      <div className="left">
        {Object.entries(props.data).map((result, idx) => {
          const [property, value] = result;
          if (property === "image" && value?.length > 0) {
            imageData.url = value;
            return null;
          }
          if (value === null || value.length === 0) {
            return null;
          }
          return (
            <ResultItem
              key={`${property}-${idx}`}
              property={property}
              value={value}
            />
          );
        })}
      </div>
      {imageData.url !== null && validator.isURL(imageData.url) && (
        <div className="right">
          <a href={imageData.url} target="new">
            <img src={imageData.url} alt={""} />
          </a>
        </div>
      )}
    </div>
  );
}
