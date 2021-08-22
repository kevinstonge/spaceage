import validator from 'validator';
export default function ResultItem(props) {
  const {property, value} = props;
  if (value === null || value.length === 0) { return null }
  if (typeof value === "object") {
    return (
      <div className="resultItem">
        <details>
          <summary>
            <p>
              <span className="label">
                {property}
                {value.name && ` (${value.name})`}
                {!value.name && value.title && ` (${value.title})`}
              </span>
            </p>
          </summary>
          {Object.entries(value).map((subProp,idx)=>{
            const [subProperty,subValue]=subProp;
            if (subValue === null) { return null }
            return(
              <ResultItem key={`${subProperty}-${idx}`} property={subProperty} value={subValue} />
            )
        })}
        </details>
      </div>
    )
  } else {
    const stringifiedValue = JSON.stringify(value).replace(/^"(.+)"$/,'$1');
   return (
    <div className="resultItem">
      <p><span className="label">{property}</span>: {validator.isURL(stringifiedValue) ? <a href={stringifiedValue}>{stringifiedValue}</a> : stringifiedValue}</p>
    </div>
   )
  } 
}