import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import allActions from "../actions";
export default function APIList(props) {
  const dispatch = useDispatch();
  const apiList = useSelector((state) => state.apiList);
  useEffect(() => {
    dispatch({
      type: allActions.apiMetaDataActions.getAPIList().type,
      payload: "aaaaa",
    });
  }, [dispatch]);
  return <>--{JSON.stringify(apiList)}--</>;
}
