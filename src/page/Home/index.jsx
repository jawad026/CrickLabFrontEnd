import { useGetMatchAllQuery } from "../../Redux/Feature/matchApi";
import MatchCard from "../../components/common/MatchCard/MatchCard";

function Home() {
  const { data = [], isLoading } = useGetMatchAllQuery();
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-10">
      {data.map((item) => {
        return (
          <MatchCard
            key={item._id}
            match={item._id}
            teamA={item.teamA.name}
            teamB={item.teamB.name}
            dateTime={item.datetime}
          />
        );
      })}
    </div>
  );
}

export default Home;
