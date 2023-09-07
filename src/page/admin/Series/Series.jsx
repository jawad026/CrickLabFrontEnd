import { useNavigate } from "react-router-dom";
import { useGetSeriesAllQuery } from "../../../Redux/Feature/seriesApi";
import Button from "../../../components/common/button/Button";
import Heading from "../../../components/common/heading/Heading";
import Table from "../../../components/common/table/Table";
import { IoIosAddCircle } from "react-icons/io";
const Series = () => {
  const { data = [], isLoading, isFetching } = useGetSeriesAllQuery();
  const nevigate = useNavigate();
  console.log(isLoading, "isLoading");
  console.log(isFetching, "isFetching");
  const column = [
    { name: "name" },
    { name: "type" },
    { name: "over" },
    { name: "teams" },
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
                optional={"flex gap-1"}
                onClick={() => nevigate("/admin/addseries")}
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
