import Heading from "../../../components/common/heading/Heading";
import Table from "../../../components/common/table/Table";

const Match = ({id}) => {
  const column = [
    { name: "id" },
    { name: "teamA" },
    { name: "teamB" },
    { name: "date" },
    { name: "status" },
  ];
  const data = [
    {
      id: 0,
      teamA: "Pakistan",
      teamB: "India",
      date: "Sunday, 23 May 2015 08 PM",
      status: "Upcoming",
    },
  ];
  return (
    <>
      <div className="flex gap-y-10 flex-col">
        <Heading title={"Match"} subtitle={"Winner Winner Chiken Dinner"} />
        <Table column={column} data={data} action={false}  />
      </div>
    </>
  );
};

export default Match;
