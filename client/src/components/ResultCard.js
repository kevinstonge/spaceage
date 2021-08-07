export default function ResultCard(props) {
  return(
    <div className="resultCard">
      {Object.entries(props.data).map((result,idx)=>{
        if (typeof result[1] === "object") {
          return(<p key={`${result[0]}-${idx}`}>[object]</p>);
        } else {
          return(<p key={`${result[0]}-${idx}`}>{`${result[0]}-${result[1]}`}</p>);
        }

      })}
    </div>
  )
}