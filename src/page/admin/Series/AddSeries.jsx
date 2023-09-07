import { useForm } from "react-hook-form";
import Heading from "../../../components/common/heading/Heading";
import Input from "../../../components/common/input/input";
import { Toaster, toast } from "react-hot-toast";
import Select from "../../../components/common/input/select";
import Button from "../../../components/common/button/Button";
import { useAddSeriesMutation } from "../../../Redux/Feature/seriesApi";

const AddSeries = () => {
  const [series, { isLoading }] = useAddSeriesMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      type: "",
      over: "",
      teams: 0,
    },
  });
  const onSubmit = (data) => {
    series(data)
      .unwrap()
      .then((response) => {
        toast.success("Series Registor");
        console.log(response);
        // Handle successful login response, e.g., store user token or redirect
      })
      .catch((err) => {
        // Handle login error
        console.log(err);
        // toast.error(error);
      });
  };
  return (
    <div>
      <Heading
        title={"Add Series"}
        subtitle={"Please Add All Information"}
        center
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center my-20"
      >
        <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 w-1/2">
          <Input
            id="name"
            label="Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Select
            id="type"
            disabled={isLoading}
            register={register}
            required={true}
            errors={errors}
            label="Select the type"
            options={[
              { value: "t10", label: "T10" },
              { value: "t20", label: "T20" },
              { value: "oneday", label: "One Day" },
              { value: "test", label: "Test" },
            ]}
          />
          <Select
            id="over"
            disabled={isLoading}
            register={register}
            required={true}
            errors={errors}
            label="Select the overs"
            options={[
              { value: "10", label: "10" },
              { value: "20", label: "20" },
              { value: "50", label: "50" },
              { value: "90", label: "90" },
            ]}
          />
          <Input
            id="teams"
            type="number"
            label="Teams"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Button
            optional={"col-span-2"}
            disabled={isLoading}
            label={"Login"}
            onClick={handleSubmit}
          />
        </div>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default AddSeries;
