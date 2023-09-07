import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddMatch from "./page/admin/Match/AddMatch";
import Match from "./page/admin/Match/Match";
import AddSeries from "./page/admin/Series/AddSeries";
import Series from "./page/admin/Series/Series";
import Home from "./page/Home";
import { Login } from "./page/Login/Login";
import Dashboard from "./page/admin/Dashboard/Dashboard";
import { Index } from "./components/layout/private/Dashboard";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<Index />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="series" element={<Series />} />
          <Route path="match" element={<Match />} />
          <Route path="addseries" element={<AddSeries />} />
          <Route path="addmatch" element={<AddMatch />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
