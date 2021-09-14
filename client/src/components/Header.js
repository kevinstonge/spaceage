import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import allActions from "../actions";
import "../styles/Header.scss";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
const Header = (props) => {
  const user = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const setModal = props.setModal;
  useEffect(()=>{
    if (user.loggedIn) {
      setModal({        
        modal: false,
        component: null,
        title: "",
      })
    }
  },[dispatch, user.loggedIn, setModal])
  return (
    <header>
      <div className="left">
        <img
          src={`${process.env.PUBLIC_URL}/logo70.png`}
          alt="cute purple rocket ship"
        />
        <h1>spaceage</h1>
      </div>
      <div className="right">
        {user.loggedIn === false && 
          <>
          <button
            onClick={() => {
              setModal({ modal: true, component: LogIn, title: "log_in" });
            }}
          >
            log_in
          </button>
          <button
            onClick={() => {
              setModal({
                modal: true,
                component: SignUp,
                title: "sign_up",
              });
            }}
          >
            sign_up
          </button>
          </>
        }
        {user.loggedIn === true &&
        <>
        <p>favorites</p>
        <button onClick={()=>{
          dispatch({type: allActions.userActions.loggedOut});}}>log out</button>
        </>
        }
      </div>
    </header>
  );
};
export default Header;
