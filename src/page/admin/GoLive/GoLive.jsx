import { useNavigate } from "react-router-dom";
import { useGetMatchAllQuery } from "../../../Redux/Feature/matchApi";
import Heading from "../../../components/common/heading/Heading";
import Table from "../../../components/common/table/Table";

const Golive = () => {
  const { data = [], isLoading } = useGetMatchAllQuery();
  const nevigate = useNavigate();

  const today = new Date(); // Get the current date and time
  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.datetime);
    return itemDate.getDate() === today.getDate();
  });

  const column = [
    { name: "teamA.name" },
    { name: "teamB.name" },
    { name: "datetime" },
  ];
  if (isLoading) {
    return <>Loading.....</>;
  }
  const handleRowSelect = (rowNumber) => {
    const localstorage=localStorage.getItem(rowNumber);
    if(localstorage){
      nevigate(`/admin/startmatch/${rowNumber}`);
    }else{

      nevigate(`/admin/toss/${rowNumber}`);
    }
  };

  return (
    <>
      <div className="flex gap-y-10 flex-col">
        <Heading
          title={"Go live"}
          subtitle={"Please select match to go live"}
        />

        <Table
          column={column}
          data={filteredData}
          action={true}
          status={true}
          onAction={(id) => handleRowSelect(id)}
        />
      </div>
    </>
  );
};

export default Golive;
