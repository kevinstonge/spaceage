import "../styles/Header.scss";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
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
        <button
          onClick={() => {
            props.setModal({ modal: true, component: LogIn, title: "log_in" });
          }}
        >
          log_in
        </button>
        <button
          onClick={() => {
            props.setModal({
              modal: true,
              component: SignUp,
              title: "sign_up",
            });
          }}
        >
          sign_up
        </button>
      </div>
    </header>
  );
};
export default Header;
