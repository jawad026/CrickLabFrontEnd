/* eslint-disable react-hooks/exhaustive-deps */
import clsx from "clsx";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useGetTeamPlayersQuery } from "../../../Redux/Feature/playerApi";
import { useParams } from "react-router-dom";
import Button from "../../../components/common/button/Button";
import Heading from "../../../components/common/heading/Heading";

const StartMatch = () => {
  const param = useParams();
  const match = localStorage.getItem(param.id);
  console.log(match);
  const { data: bat = [] } = useGetTeamPlayersQuery(JSON.parse(match).bat);
  const { data: balling = [] } = useGetTeamPlayersQuery(JSON.parse(match).ball);
  const socket = io("http://localhost:3001"); // Replace with your server URL
  const [run, setRun] = useState(0);
  const [ball, setBall] = useState(0);
  const [out, setOut] = useState([]);
  const [playerScore, setPlayerScore] = useState([]);
  const [active, setActive] = useState([]);
  const [over, setOver] = useState("0.0");
  const [nextTobat, setNextToBat] = useState([]);
  const [baller, setBaller] = useState([]);
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (bat.length > 0) {
      setActive([bat[0]._id, bat[1]._id]);
      setNextToBat(bat.slice(2).map((item) => item._id));

      const playerScores = {};
      bat.forEach((bat) => {
        playerScores[bat._id] = 0;
      });
      setPlayerScore(playerScores);
    }
  }, [bat.length]);

  const incrementPlayerScore = (playerId, score) => {
    setPlayerScore((prevScores) => ({
      ...prevScores,
      [playerId]: (prevScores[playerId] || 0) + score, // Increment the score by 1 or set to 1 if undefined
    }));
  };
  const Swap = () => {
    const newArray = [...active];
    const temp = newArray[0];
    newArray[0] = newArray[1];
    newArray[1] = temp;
    setActive(newArray);
  };
  const convertBallsToOvers = () => {
    const overs = Math.floor((ball + 1) / 6);
    const remainingBalls = (ball + 1) % 6;
    console.log(remainingBalls, ball);
    setOver(`${overs}.${remainingBalls}`);
  };
  const handleScore = (runs, balls) => {
    setRun((prev) => prev + runs);
    setBall((prev) => prev + balls);
    setTimeout(() => {
      convertBallsToOvers();
    }, 0);

    incrementPlayerScore(active[0], runs);
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
      out: out,
      baller:baller,
      playerScore: playerScore,
      over:over
    });

    if (ball % 6 === 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [run, ball]);
  const handleOut = (id) => {
    setOut((prev) => [...prev, id]);
    setActive(active.filter((item) => item !== id));
    setActive((prev) => [nextTobat[0], ...prev]);
    setTimeout(() => {
      nextTobat.shift();
    }, 1000);
  };

  const handleBaller = (id) => {
    setBaller((prev) => [id, ...prev]);
    baller.pop();
  };
  console.log(baller);
  return (
    <div className="">
      <Heading title={"Score Mointering System"} center />
      <div className="flex justify-center mt-10">
        <div className="grid auto-rows-max grid-cols-4 grid-rows-2  gap-1 w-1/2 ">
          <Button label={"+"} onClick={() => handleScore(1, 1)} />
          <Button label={"2"} onClick={() => handleScore(2, 1)} />
          <Button label={"3"} onClick={() => handleScore(3, 1)} />
          <Button label={"4"} onClick={() => handleScore(4, 1)} />
          <Button
            optional={"col-span-2"}
            label={"6"}
            onClick={() => handleScore(6, 1)}
          />
          <Button
            optional={"col-span-2"}
            label={"Wide"}
            onClick={() => handleScore(1, 0)}
          />
        </div>
      </div>

      <div className="flex justify-center gap-20 mt-10">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          Run - <span className="font-bold text-blue-700 text-2xl">{run}</span>
        </h4>
        <h4 className="text-lg font-semibold flex items-center gap-2">
          Ball -{" "}
          <span className="font-bold text-blue-700 text-2xl">{ball}</span>
        </h4>
        <h4 className="text-lg font-semibold flex items-center gap-2">
          Over -{" "}
          <span className="font-bold text-blue-700 text-2xl">{over}</span>
        </h4>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="relative overflow-x-auto box-border rounded-lg">
          <Heading title={"Batting"} center />
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Score
                </th>
                <th scope="col" className="px-6 py-3">
                  Out
                </th>
              </tr>
            </thead>
            {bat.map((item, i) => {
              return (
                <tbody key={item._id}>
                  <tr
                    className={clsx(
                      `${
                        active.includes(item._id)
                          ? "bg-green-100 text-slate-500"
                          : ""
                      }`,
                      `${out.includes(item._id) ? " text-red-500" : ""}`,

                      "bg-white border-b  dark:border-gray-700"
                    )}
                  >
                    <td
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {i}
                    </td>
                    <td className="px-6 py-2 text-gray-800 ">
                      {item.name}{" "}
                      <span className="text-green-700 text-xl">{`${
                        active[0] === item._id ? "*" : ""
                      }`}</span>
                    </td>
                    <td className="px-6 py-2 text-gray-800">
                      {playerScore[item._id]}
                    </td>
                    {active.includes(item._id) ? (
                      <td className="px-6 py-2">
                        <Button
                          optional={"bg-red-500"}
                          label={"Out"}
                          onClick={() => handleOut(item._id)}
                        />
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
        <div className="relative overflow-x-auto box-border rounded-lg">
          <Heading title={"Balling"} center />
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Score
                </th>
                <th scope="col" className="px-6 py-3">
                  Baller
                </th>
              </tr>
            </thead>
            {balling.slice(-5).map((item, i) => {
              return (
                <tbody key={item._id}>
                  <tr
                    className={clsx(
                      `${
                        active.includes(item._id)
                          ? "bg-green-100 text-slate-500"
                          : ""
                      }`,
                      `${out.includes(item._id) ? " text-red-500" : ""}`,

                      "bg-white border-b  dark:border-gray-700"
                    )}
                  >
                    <td
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {i}
                    </td>
                    <td className="px-6 py-2 text-gray-800 ">
                      {item.name}{" "}
                      <span className="text-green-700 text-xl">{`${
                        baller[0] === item._id ? "*" : ""
                      }`}</span>
                    </td>
                    <td className="px-6 py-2 text-gray-800">
                      {playerScore[item._id]}
                    </td>
                    {!baller.includes(item._id) ? (
                      <td className="px-6 py-2">
                        <Button
                          optional={"bg-red-500"}
                          label={"Baller"}
                          disabled={disable}
                          onClick={() => handleBaller(item._id)}
                        />
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
      </div>
    </div>
  );
};

export default StartMatch;
