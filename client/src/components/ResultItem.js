import validator from 'validator';
import { useSelector } from 'react-redux';
export default function ResultItem(props) {
  const apiSwagger = useSelector((state)=>state.API.APISwagger);
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
              <ResultItem key={`${property}-${subProperty}-${idx}`} property={subProperty} value={subValue} />
            )
        })}
        </details>
      </div>
    )
  } else {
    const stringifiedValue = JSON.stringify(value).replace(/^"(.+)"$/,'$1');
    const isLink = validator.isURL(stringifiedValue);
    const isAPILink = stringifiedValue.includes(apiSwagger.basePath);
    const stripFromURL = new RegExp(`https://${process.env.NODE_ENV === "development" && apiSwagger.host.replace(/^(ll\.)/,"lldev.")}${apiSwagger.basePath}`.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'));
    const swaggerToReact = (string) => {
      const arr = string.split("/");
      if (arr.length === 4) {
        return(`/${arr[1]}/id/?id=${arr[2]}/`);
      }
      if (arr.length === 5) {
        return(`/${arr[1]}/${arr[2]}:id/?id=${arr[3]}/`);
      }
      return "";
    }
    const linkTarget = isLink && property === "url" && isAPILink
        ? swaggerToReact(stringifiedValue.replace(stripFromURL,""))
        : stringifiedValue
    if (property === "url") {
    }
    const linkText = isAPILink
      ? stringifiedValue.replace(stripFromURL,"")
      : stringifiedValue.replace(/^(http){1}(s)*:\/\/(www.)*/i,"");
   return (
    <div className="resultItem">
      <p>
        <span className="label">{property}</span>: {isLink ? <a href={linkTarget} target={isAPILink ? "_self" : "new"}>{linkText}</a> : stringifiedValue}</p>
    </div>
   )
  } 
}