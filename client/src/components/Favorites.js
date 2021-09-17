import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "./Modal.js";
import { xhrAuth } from "../lib/xhr";
import allActions from "../actions/index.js";
const Favorites = () => {
  const user = useSelector((state) => state.user);
  const { loggedIn, token } = user;
  const [modal, setModal] = useState({
    modal: false,
    component: null,
    title: "favorites",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (loggedIn && token) {
      xhrAuth(token)
        .get("/users/favorites")
        .then((r) => {
          dispatch({
            type: allActions.userActions.getFavorites,
            payload: { favorites: r.data.favorites },
          });
        });
    }
  }, [token, loggedIn, dispatch]);
  const deleteFavorite = (id) => {
    xhrAuth(token)
      .delete("/users/favorites/remove", { data: { favoriteID: id } })
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  };
  return (
    <>
      <button
        onClick={() => {
          setModal({ modal: true, component: null, title: "favorites" });
        }}
      >
        favorites
      </button>
      {modal.modal && (
        <Modal setModal={setModal} title="favorites">
          <div className="favorites">
            {user.favorites.map((favorite) => {
              return (
                <div className="favorite" key={`favorite-${favorite.ID}`}>
                  <a href={`/${favorite.QueryString}`}>
                    {favorite.QueryString}
                  </a>
                  <button
                    onClick={() => {
                      deleteFavorite(favorite.ID);
                    }}
                  >
                    delete
                  </button>
                </div>
              );
            })}
          </div>
        </Modal>
      )}
    </>
  );
};

export default Favorites;
