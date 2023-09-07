import { useNavigate } from "react-router-dom";
import { useGetMatchAllQuery } from "../../../Redux/Feature/matchApi";
import Button from "../../../components/common/button/Button";
import Heading from "../../../components/common/heading/Heading";
import Table from "../../../components/common/table/Table";
import { IoIosAddCircle } from "react-icons/io";

const Match = ({ id }) => {
  const { data = [], isLoading } = useGetMatchAllQuery();
  const nevigate = useNavigate();
  console.log(data);
  const column = [
    { name: "teamA.name" },
    { name: "teamB.name" },
    { name: "datetime" },
  ];

  if(isLoading){
    return <>Loading.....</>
  }
  return (
    <>
      <div className="flex gap-y-10 flex-col">
        <Heading title={"Match"} subtitle={"Winner Winner Chiken Dinner"} />
        <div>
          <div className="flex justify-end">
            <div className="w-36 py-2">
              <Button
                label={"Create New"}
                small
                optional={"flex gap-1"}
                onClick={() => nevigate("/admin/addmatch")}
                Icon={<IoIosAddCircle size={24} className="px-1" />}
              />
            </div>
          </div>
          <Table column={column} data={data} action={false} status={true} />
        </div>
      </div>
    </>
  );
};

export default Match;
