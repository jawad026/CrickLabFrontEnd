import { useState } from "react";
import Input from "../../components/commen/input/input";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import Heading from "../../components/commen/heading/Heading";
import Button from "../../components/commen/button/Button";
import { useLoginMutation } from "../../Redux/Feature/authSlice";

export const Login = () => {
  const [isDisable, setIsDisable] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    setIsDisable(true);

    login(data)
      .unwrap()
      .then((response) => {
        toast.success("Logged in");
        console.log(response);
        // Handle successful login response, e.g., store user token or redirect
      })
      .catch((error) => {
        // Handle login error
        console.log("error", error);
        toast.error(error.data.status);
      })
      .finally(() => {
        setIsDisable(false);
      });
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto
  fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
        >
          <div className="relative w-full md:w-4/6 lg:2-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
            <div
              className={`translate duration-300 h-full
            `}
            >
              <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                  <Heading
                    title="Welcome back!"
                    subtitle="Login to your account!"
                  />
                </div>
                <div className="relative p-6 flex-auto"> {bodyContent}</div>
                <div className="flex flex-col gap-2 p-6">
                  <div className="flex flex-row items-center gap-4 w-full">
                    <Button
                      disabled={isDisable}
                      label={"Login"}
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};
