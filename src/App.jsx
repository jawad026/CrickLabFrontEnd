import "./App.css";
import { Index } from "./components/layout/private/Dashboard";
import Match from "./page/admin/Match/Match";
import Series from "./page/admin/Series/Series";
// import { Login } from "./page/Login/Login";

function App() {
  return (
    <>
      <Index>
        <Series />
      </Index>
    </>
  );
}

export default App;
