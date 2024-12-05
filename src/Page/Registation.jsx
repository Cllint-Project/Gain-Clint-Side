import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { PiEyeClosedLight } from "react-icons/pi";
import { VscEyeClosed } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Auth/AuthProvider";
import md5 from "blueimp-md5";

const Registation = () => {
  const { Register, loading, setLoading } = useContext(AuthContext);
  const [showpassword, setShowpassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    // Generate a profile image based on username
    // const profileImage = `https://avatars.dicebear.com/api/initials/${data.username}.svg`;

    try {
      // const profileImage = `https://avatars.dicebear.com/api/initials/${data.username}.svg`;
      // Generate profile image using md5 hash of the username
      const profileImage = `https://www.gravatar.com/avatar/${md5(
        data?.username
      )}?d=identicon`;

      // Add profile image URL to data
      const userData = { ...data, profileImage };

      const getUser = await Register(userData);

      if (getUser) {
        toast.success("Register successful!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error ? error.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="h-screen w-screen flex items-center justify-center my-8">
        <div
          className="flex items-center justify-center h-[600px] w-[600px] bg-no-repeat bg-origin-content bg-center"
          style={{
            backgroundImage:
              "url('https://www.terawulf-pre.com/img/login_background.88bb70cf.png')",
          }}
        >
          <div className="bg-opacity-90 p-10 w-full max-w-md">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 ">
                <label
                  htmlFor="username"
                  className="block text-left text-gray-700 font-medium mb-2"
                >
                  User Name
                </label>
                <input
                  type="text"
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
                  type="text"
                  {...register("phoneNumber", { required: true })}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phoneNumber && (
                  <span className="text-left">Phone number is required</span>
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
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^\d{6,12}$/,
                  })}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password?.type === "minLength" && (
                  <span className="text-left">Password must be 6 number</span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-left text-sm">
                    Password must include only numbers
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
                  type="text"
                  {...register("referralCode", { required: true })}
                  placeholder="Enter your Referral code"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.referralCode && (
                  <span className="text-left">Referral code is required</span>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                {loading ? (
                  <span className="loading loading-dots loading-xs"></span>
                ) : (
                  "Register"
                )}
              </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
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
