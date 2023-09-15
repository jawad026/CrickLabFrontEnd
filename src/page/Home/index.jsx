import { useEffect, useState } from "react";
import { useGetMatchAllQuery } from "../../Redux/Feature/matchApi";
import MatchCard from "../../components/common/MatchCard/MatchCard";
import { io } from "socket.io-client";
import { useGetSeriesAllQuery } from "../../Redux/Feature/seriesApi";
import Search from "../../components/common/Search/Search";

function Home() {
  const { data: matchData = [] } = useGetMatchAllQuery();
  const [score, setScore] = useState({});
  const { data: seriesData = [] } = useGetSeriesAllQuery();
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    setFilterData(matchData);
  }, [matchData]);
  const handleSeries = (id) => {
    if (id === "") {
      // If the ID is empty, set the filterData to matchData (return all values)
      setFilterData(matchData);
    } else {
      // If the ID is not empty, filter the data based on the ID
      const filter = matchData.filter((item) => item.seriesId === id);
      setFilterData(filter);
    }
  };
  useEffect(() => {
    const socket = io("http://localhost:3001"); // Replace with your server URL

    // Listen for score updates from the server
    socket.on("scoreUpdated", (newScore) => {
      // Update the UI with the new score
      console.log(newScore)
      if (newScore.match !== score.match) {
        setScore(newScore);
      }
    });
  }, [score.match]);
  return (
    <div className="p-3">
      <Search data={seriesData} onClick={(id) => handleSeries(id)} />
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-10">
        {filterData.map((item) => (
          <MatchCard
            key={item._id}
            live={score}
            match={item._id}
            teamA={item.teamA.name}
            teamB={item.teamB.name}
            dateTime={item.datetime}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
