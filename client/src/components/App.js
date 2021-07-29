import "../styles/App.scss";
import Header from "./Header.js";
import APIList from "./APIList.js";
import ListData from "./ListData.js";
import QueryParameters from "./QueryParameters.js";
function App() {
  return (
    <>
      <Header />
      <APIList />
      <ListData />
      <QueryParameters />
    </>
  );
}

export default App;
