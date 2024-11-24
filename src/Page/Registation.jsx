// import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { PiEyeClosedLight } from "react-icons/pi";
import { VscEyeClosed } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../Auth/AuthProvider";

const Registation = () => {
  const {Register, user, loading,setLoading} = useContext(AuthContext);
  const [showpassword, setShowpassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const getUser = await Register(data);
      if(getUser){
        toast.success("Register successful!");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="h-screen w-screen flex items-center justify-center">
        <div
          className="flex items-center justify-center h-[550px] w-[550px] bg-no-repeat bg-origin-content bg-right "
          style={{
            backgroundImage:
              "url('https://www.terawulf-pre.com/img/login_background.88bb70cf.png')",
          }}
        >
          <div className="bg-opacity-90 p-8  w-full max-w-md">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 ">
                <label
                  htmlFor="username"
                  className="block text-left text-gray-700 font-medium mb-2"
                >
                  User Name
                </label>
                <input
                  type="username"
                  name="username"
                  {...register("username", { required: true })}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.username && (
                  <span className="text-left">Name is required</span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-left text-gray-700 font-medium mb-2"
                >
                  Phone
                </label>
                <input
                  type="phoneNumber"
                  name="phoneNumber"
                  {...register("phoneNumber", { required: true })}
                  placeholder="Enter your phone numbar"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phoneNumber && (
                  <span className="text-left">phone is required</span>
                )}
              </div>
              <div className="mb-6 space-y-2 relative">
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="block text-left text-gray-700 font-medium mb-2"
                  >
                    Password
                  </label>
                  <span
                    onClick={() => setShowpassword(!showpassword)}
                    className="absolute right-3 top-1/2 my-4 transform -translate-y-1/2 cursor-pointer"
                  >
                    {showpassword ? (
                      <VscEyeClosed className="text-2xl" />
                    ) : (
                      <PiEyeClosedLight className="text-2xl" />
                    )}
                  </span>
                </div>

                <input
                  type={showpassword ? "text" : "password"}
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,})/,
                  })}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password?.type === "minLength" && (
                  <span className="text-left">
                    Password must be 6 character
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-left text-sm">
                    one lowwerCase and upperCase and one Special character
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="referralCode"
                  className="block text-left text-gray-700 font-medium mb-2"
                >
                  Referral code
                </label>
                <input
                  type="referralCode"
                  name="referralCode"
                  {...register("referralCode", { required: true })}
                  placeholder="Enter your Referral code"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.referralCode && (
                  <span className="text-left">referralCode is required</span>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                {
                  loading? <span className="loading loading-dots loading-xs"></span> : "Registration"
                }
              </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
              Don You have account?{" "}
              <Link to={"/login"} className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registation;
