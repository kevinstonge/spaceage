import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import allActions from "../actions";
import xhr from "../lib/xhr.js";
export default function APIList(props) {
  const dispatch = useDispatch();
  const apiList = useSelector((state) => state.getAPIList.apiList);
  useEffect(() => {
    xhr.get("/data/apis").then(r=>{
      dispatch({
        type: allActions.apiMetaDataActions.getAPIList().type,
        payload: r.data,
      });
    })
  }, [dispatch]);
  return (
    <>
      {apiList && apiList.length > 0 && <>
        { apiList.map((apiItem) => {
            return (
            <button 
              key={`apiItem-${apiItem.ID}`}
            >
              {apiItem.Name}
            </button>);
          })
        }
      </>}  
    </>
  );
}
