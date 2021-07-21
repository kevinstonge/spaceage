import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import allActions from "../actions";
export default function APIList(props) {
  const dispatch = useDispatch();
  const fullState = useSelector((state) => state);
  useEffect(() => {
    dispatch({
      type: allActions.apiMetaDataActions.getAPIList().type,
      payload: "aaaaa",
    });
  }, [dispatch]);
  return <>--{JSON.stringify(fullState)}--</>;
}
