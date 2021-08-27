import "../styles/Loading.scss";
const Loading = () => {
  return (
  <div className="loadingContainer">
    <p className="loadingText">...searching...</p>
    <img className="loadingImage" alt="rocket flying around" src={`${process.env.PUBLIC_URL}/logo150.png`} />
  </div>
  )
}
export default Loading;
