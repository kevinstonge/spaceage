import { useSelector } from "react-redux";
import {useEffect} from "react";
import xhr from "../lib/xhr";
const Favorites = () => {
  const user = useSelector((state)=>state.user);
  const { loggedIn, token } = user;
  useEffect(() => {
    if (loggedIn && token) {
      xhr.get("/users/favorites", {headers: {authorization: `Bearer ${token}`}}).then(r=>{
        console.log(r);
      })
    }
  }, [token, loggedIn])
  return(<p>favorites</p>)
}

export default Favorites;