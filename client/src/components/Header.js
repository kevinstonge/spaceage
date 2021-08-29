import "../styles/Header.scss";
const Header = () => {
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
        <a href="/launch/upcoming/?search=spacex">spacex:upcoming</a>
      </div>
    </header>
  );
};
export default Header;
