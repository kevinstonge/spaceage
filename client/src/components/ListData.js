import { useSelector } from "react-redux";
export default function ListData(props) {
  const activeAPI = useSelector((state) => state.API.activeAPI)
  return (
    <>
      <p>listdata component</p>
      <p>{activeAPI && activeAPI.Name}</p>
    </>
  );
}
