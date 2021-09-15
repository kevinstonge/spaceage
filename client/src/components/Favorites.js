import { useSelector, useDispatch } from "react-redux";
import {useEffect, useState} from "react";
import Modal from "./Modal.js";
import xhr from "../lib/xhr";
import allActions from "../actions/index.js";
const Favorites = () => {
  const user = useSelector((state)=>state.user);
  const { loggedIn, token } = user;
  const [ modal, setModal ] = useState({modal:false,component:null,title:"favorites"});
  const dispatch = useDispatch();
  useEffect(() => {
    if (loggedIn && token) {
      xhr.get("/users/favorites", {headers: {authorization: `Bearer ${token}`}}).then(r=>{
        console.log(r);
      })
    }
  }, [token, loggedIn]);
  const deleteFavorite = (favorite) => {
    xhr.delete("/users/favorites/remove",{favorite}).then(r=>console.log(r)).catch(e=>console.log(e));
  }
  return(
  <>
    <button onClick={()=>{setModal({modal:true,component:null,title:"favorites"})}}>favorites</button>
    {modal.modal && 
      <Modal setModal={setModal} title="favorites">
        <div className="favorites">
          {user.favorites.map((favorite,index)=>{
            return(
              <div className="favorite" key={`${favorite}-${index}`}>
                <a href={`/${favorite}`}>{favorite}</a>
                <button onClick={()=>{deleteFavorite(favorite)}}>delete</button>
              </div>
            )
          })}
        </div>
      </Modal>
    }
  </>
  )
}

export default Favorites;