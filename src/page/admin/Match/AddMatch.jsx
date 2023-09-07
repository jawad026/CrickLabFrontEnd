import { useForm } from "react-hook-form";
import Heading from "../../../components/common/heading/Heading";
import Input from "../../../components/common/input/input";
import { toast } from "react-hot-toast";
import Select from "../../../components/common/input/select";
import Button from "../../../components/common/button/Button";
import { useGetTeamAllQuery } from "../../../Redux/Feature/teamApi";
import { useGetSeriesAllQuery } from "../../../Redux/Feature/seriesApi";
const AddMatch = () => {
  const isLoading = false;
  const { data: teamData = [] } = useGetTeamAllQuery();

  // Fetch series data
  const { data: seriesData = [] } = useGetSeriesAllQuery();

  console.log(seriesData);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      teamA: "",
      teamB: "",
      datetime: "",
      seriesId: "",
    },
  });
  const teamA = watch("teamA");
  console.log(teamA);
  const onSubmit = (data) => {
    console.log(data);
    // series(data)
    //   .unwrap()
    //   .then((response) => {
    //     toast.success("Logged in");
    //     console.log(response);
    //     // Handle successful login response, e.g., store user token or redirect
    //   })
    //   .catch((error) => {
    //     // Handle login error
    //     console.log("error", error);
    //     toast.error(error);
    //   });
  };
  return (
    <div>
      <Heading
        title={"Add Match"}
        subtitle={"Please Add All Information"}
        center
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center my-20"
      >
        <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 w-1/2">
          <Select
            id="teamA"
            disabled={isLoading}
            register={register}
            required={true}
            errors={errors}
            label="Select team A"
            options={teamData}
          />
          <Select
            id="teamB"
            disabled={isLoading}
            register={register}
            required={true}
            errors={errors}
            label="Select team B"
            options={teamData.filter((item) => item._id !== teamA)}
          />
          <Input
            id="datetime"
            type="datetime-local"
            label="Date and Time"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Select
            id="seriesId"
            disabled={isLoading}
            register={register}
            required={true}
            errors={errors}
            label="Select the Series (optional)"
            options={seriesData}
          />
          <Button
            optional={"col-span-2"}
            disabled={isLoading}
            label={"Add Match"}
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default AddMatch;
