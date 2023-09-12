import { Link } from "react-router-dom";

function MatchCard({ match,teamA, teamB, dateTime }) {
  const date = new Date(dateTime);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  };
  return (
    <Link
     to={`/score/${match}`}
      className="block w-[18rem] p-6 bg-slate-300 border border-gray-200 rounded-lg shadow hover:bg-gray-400 "
    >
      <p className="font-extralight text-sm text-gray-800 ">
        {date.toLocaleDateString('en-US', options)}
      </p>
      <h5 className="flex justify-between mb-2 text-2xl font-medium tracking-tight text-gray-900 ">
        {teamA}
      </h5>
      <h5 className="flex justify-between  mb-2 text-2xl font-medium tracking-tight text-gray-900 ">
        {teamB}
      </h5>
    </Link>
  );
}

export default MatchCard;
