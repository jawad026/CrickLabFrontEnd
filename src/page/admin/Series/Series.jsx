import Button from "../../../components/common/button/Button";
import Heading from "../../../components/common/heading/Heading";
import Table from "../../../components/common/table/Table";
import { IoIosAddCircle } from "react-icons/io";
const Series = () => {
  const column = [
    { name: "id" },
    { name: "name" },
    { name: "type" },
    { name: "over" },
    { name: "teams" },
  ];
  const data = [
    {
      id: 0,
      name: "Asia Cup",
      type: "One Day",
      over: "50",
      teams: 20,
    },
  ];
  return (
    <>
      <div className="flex gap-y-10 flex-col justify-end">
        <Heading title={"Series"} subtitle={"World Cricket Club"} />
        <div>
          <div className="flex justify-end">
            <div className="w-36 py-2">
              <Button
                label={"Create New"}
                small
                Icon={<IoIosAddCircle size={24} className="px-1" />}
              />
            </div>
          </div>
          <Table column={column} data={data} action={false} />
        </div>
      </div>
    </>
  );
};

export default Series;
