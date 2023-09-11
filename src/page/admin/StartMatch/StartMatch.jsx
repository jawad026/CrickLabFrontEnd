/* eslint-disable react-hooks/exhaustive-deps */
import clsx from "clsx";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useGetTeamPlayersQuery } from "../../../Redux/Feature/playerApi";
import { useLocation } from "react-router-dom";

const StartMatch = () => {
  const status = useLocation();
  const { data: player=[] } = useGetTeamPlayersQuery(status.state.team);
  console.log(player);
  const socket = io("http://localhost:3001"); // Replace with your server URL
  const [run, setRun] = useState(0);
  const [ball, setBall] = useState(0);
  const [strik, setStrik] = useState(1);
  const [out, setOut] = useState([]);
  const [active, setActive] = useState([1, 2]);
  const [nextTobat, setNextToBat] = useState(
    player.slice(2).map((item) => item.id)
  );
  const Swap = () => {
    const newArray = [...active];
    const temp = newArray[0];
    newArray[0] = newArray[1];
    newArray[1] = temp;
    setActive(newArray);
  };
  const handleScore = (runs, balls) => {
    setRun((prev) => prev + runs);
    setBall((prev) => prev + balls);
    if (runs === 1 && balls === 1) {
      Swap();
    } else if (runs === 3 && balls === 1) {
      Swap();
    }
  };

  useEffect(() => {
    socket.emit("scoreUpdated", {
      run: run,
      ball: ball,
      active: active,
      strik: strik,
      out: out,
    });
  }, [run, ball]);
  const handleOut = (id) => {
    setOut((prev) => [...prev, id]);
    setActive(active.filter((item) => item !== id));
    console.log("next to bat", nextTobat[0]);
    setActive((prev) => [...prev, nextTobat[0]]);
    setTimeout(() => {
      nextTobat.shift();
      console.log(nextTobat);
    }, 1000);
  };
  return (
    <div>
      <button onClick={() => handleScore(1, 1)}>+</button>
      <button onClick={() => handleScore(2, 1)}>2</button>
      <button onClick={() => handleScore(3, 1)}>3</button>
      <button onClick={() => handleScore(4, 1)}>4</button>
      <button onClick={() => handleScore(6, 1)}>6</button>
      <button onClick={() => handleScore(1, 0)}>wide</button>
      <h4>Run - {run}</h4>
      <h4>Balls - {ball}</h4>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Out</th>
          </tr>
        </thead>
        {player.map((item) => {
          return (
            <tbody key={item.id}>
              <tr
                className={clsx(
                  `${active.includes(item.id) ? "active" : ""}`,
                  `${out.includes(item.id) ? "out" : ""}`
                )}
              >
                <td>{item.id}</td>
                <td>
                  {item.name} {`${active[0] === item.id ? "*" : ""}`}
                </td>
                {active.includes(item.id) ? (
                  <td>
                    <button onClick={() => handleOut(item.id)}>Out</button>
                  </td>
                ) : (
                  ""
                )}
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default StartMatch;
