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
import GoLive from "./page/admin/GoLive/GoLive";
import StartMatch from "./page/admin/StartMatch/StartMatch";
import CoinTossSimulator from "./page/admin/CoinSimulation/CoinSimulation";
import ScoreCard from "./page/ScoreCard/ScoreCard";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/score/:id" element={<ScoreCard />} />
        <Route path="/admin/*" element={<Index />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="series" element={<Series />} />
          <Route path="match" element={<Match />} />
          <Route path="addseries" element={<AddSeries />} />
          <Route path="addmatch" element={<AddMatch />} />
          <Route path="golive" element={<GoLive />} />
          <Route path="startmatch/:id" element={<StartMatch />} />
          <Route path="toss/:id" element={<CoinTossSimulator />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
