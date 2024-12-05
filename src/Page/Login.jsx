// import { useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   loadCaptchaEnginge,
//   LoadCanvasTemplate,
//   validateCaptcha,
// } from "react-simple-captcha";
// import { toast } from "react-toastify";
// import { AuthContext } from "../Auth/AuthProvider";
// import { VscEyeClosed } from "react-icons/vsc";
// import { PiEyeClosedLight } from "react-icons/pi";
// const Login = () => {
//   const { login, loading, setLoading } = useContext(AuthContext);
//   const [disabled, setdisabled] = useState(true);
//   const navigate = useNavigate();
//   const [showpassword, setShowpassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     loadCaptchaEnginge(6,"white","red","0123456789");
//   }, []);

//   const handlevalidatecaptcha = (e) => {
//     const user_captcha_value = e.target.value;
//     // console.log(user_captcha_value);
//     if (validateCaptcha(user_captcha_value) == true) {
//       setdisabled(false);
//     } else {
//       setdisabled(true);
//     }
//   };

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       const getUser = await login(data);
//       console.log('login user', getUser)
//       if (getUser) {
//         toast.success("Login successful!");
//         navigate("/");
//       }
//     } catch (error) {
//       if (error) {
//         toast.success(error.message | error);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="h-screen w-screen flex items-center justify-center my-8">
//       <div
//         className="flex items-center justify-center h-[600px] w-[600px] bg-no-repeat bg-origin-content bg-center"
//         style={{
//           backgroundImage:
//             "url('https://www.terawulf-pre.com/img/login_background.88bb70cf.png')",
//         }}
//       >
//         <div className="bg-opacity-90 p-8  w-full max-w-md">
//           {/* <h1 className="text-2xl font-bold text-center mb-4">Login</h1> */}
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="mb-4">
//               <label
//                 htmlFor="phoneNumber"
//                 className="block text-left text-gray-700 font-medium mb-2"
//               >
//                 Phone
//               </label>
//               <input
//                 type="phoneNumber"
//                 name="phoneNumber"
//                 {...register("phoneNumber", { required: true })}
//                 placeholder="Enter your phone numbar"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               {errors.phoneNumber && (
//                 <span className="text-left">phone is required</span>
//               )}
//             </div>
//             <div className="mb-6 space-y-2 relative">
//               <div className="flex justify-between">
//                 <label
//                   htmlFor="password"
//                   className="block text-left text-gray-700 font-medium mb-2"
//                 >
//                   Password
//                 </label>
//                 <span
//                   onClick={() => setShowpassword(!showpassword)}
//                   className="absolute right-3 top-1/2 my-4 transform -translate-y-1/2 cursor-pointer"
//                 >
//                   {showpassword ? (
//                     <VscEyeClosed className="text-2xl" />
//                   ) : (
//                     <PiEyeClosedLight className="text-2xl" />
//                   )}
//                 </span>
//               </div>
//               <input
//                 type={showpassword ? "text" : "password"}
//                 {...register("password", {
//                   required: true,
//                   minLength: 6,
//                   pattern: /^\d{6,12}$/,
//                 })}
//                 placeholder="Enter your password"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               {errors.password?.type === "minLength" && (
//                 <span className="text-left">Password must be 6 number</span>
//               )}
//               {errors.password?.type === "pattern" && (
//                 <span className="text-left text-sm">
//                   Password must include only numbers
//                 </span>
//               )}
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm  font-bold mb-2">
//                 <LoadCanvasTemplate  />
//               </label>
//               <input
//                 onBlur={handlevalidatecaptcha}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//                 type="text"
//                 name="captcha"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
//             >
//               {loading ? (
//                 <span className="loading loading-dots loading-xs"></span>
//               ) : (
//                 "Login"
//               )}
//             </button>
//           </form>
//           <p className="text-center text-gray-600 mt-1 ">
//             Don’t have an account?{" "}
//             <Link to={"/registation"} className="text-blue-500 hover:underline">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Auth/AuthProvider";
import { VscEyeClosed } from "react-icons/vsc";
import { PiEyeClosedLight } from "react-icons/pi";

const Login = () => {
  const { login, loading, setLoading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const randomCaptcha = Math.floor(
      100000 + Math.random() * 900000
    ).toString(); // Generates a 6-digit number
    setCaptcha(randomCaptcha);
    setCaptchaInput("");
    setIsCaptchaValid(false);
  };

  const handleCaptchaValidation = (e) => {
    const input = e.target.value;
    setCaptchaInput(input);
    if (input === captcha) {
      setIsCaptchaValid(true);
    } else {
      setIsCaptchaValid(false);
    }
  };

  const onSubmit = async (data) => {
    if (!isCaptchaValid) {
      toast.error("Invalid captcha!");
      return;
    }

    setLoading(true);
    try {
      const getUser = await login(data);
      if (getUser) {
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center my-8">
      <div
        className="flex items-center justify-center h-[600px] w-[600px] bg-no-repeat bg-origin-content bg-center"
        style={{
          backgroundImage:
            "url('https://www.terawulf-pre.com/img/login_background.88bb70cf.png')",
        }}
      >
        <div className="bg-opacity-90 p-8  w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                <span className="text-left text-red-500">
                  Phone is required
                </span>
              )}
            </div>
            <div className="mb-4 space-y-2 relative">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block text-left text-gray-700 font-medium"
                >
                  Password
                </label>
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 my-4 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? (
                    <VscEyeClosed className="text-2xl" />
                  ) : (
                    <PiEyeClosedLight className="text-2xl" />
                  )}
                </span>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^\d{6,12}$/,
                })}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password?.type === "minLength" && (
                <span className="text-left text-red-500">
                  Password must be at least 6 digits
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-left text-red-500">
                  Password must include only numbers
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block mt-5 text-gray-700  italic text-sm font-bold">
                <span className=" bg-white p-2 pr-10 rounded-lg  text-red-500 leading-3 tracking-wide font-bold">
                  {captcha}
                </span>
              </label>
              <button
                type="button"
                onClick={generateCaptcha}
                className="mb-1 mt-4 text-blue-500 text-sm hover:underline"
              >
                Refresh Captcha
              </button>
              <input
                value={captchaInput}
                onChange={handleCaptchaValidation}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter captcha"
              />
              {!isCaptchaValid && captchaInput && (
                <span className="text-red-500 font-bold text-sm">
                  Captcha does not match
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              disabled={!isCaptchaValid}
            >
              {loading ? (
                <span className="loading loading-dots loading-xs"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p className="text-center text-gray-600 mt-1 ">
            Don’t have an account?{" "}
            <Link
              to={"/registration"}
              className="text-blue-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
