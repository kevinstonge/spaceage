import "../styles/Header.scss";
import LogIn from "./LogIn";
const Header = (props) => {
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
        <button onClick={()=>{props.setModal({modal:true,component:LogIn,title:"log in"})}}>log in</button>
        <button>sign up</button>
      </div>
    </header>
  );
};
export default Header;
