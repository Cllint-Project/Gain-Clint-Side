import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { toast } from "react-toastify";
import { AuthContext } from "../Auth/AuthProvider";
const Login = () => {
  const {login, user, loading,setLoading} = useContext(AuthContext);
  const [disabled, setdisabled] = useState(true);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handlevalidatecaptcha = (e) => {
    const user_captcha_value = e.target.value;
    // console.log(user_captcha_value);
    if (validateCaptcha(user_captcha_value) == true) {
      setdisabled(false);
    } else {
      setdisabled(true);
    }
  };

  const onSubmit = async(data)=>{
    setLoading(true)
    try {
      const getUser = await login(data);
      if(getUser){
        toast.success("Login successful!");
      }
    } catch (error) {
      if(error){
        toast.success(error.message | error);
      }
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="h-screen w-screen flex items-center justify-center my-8">

      <div
        className="flex items-center justify-center h-[600px] w-[600px] bg-no-repeat bg-origin-content bg-right "
        style={{
          backgroundImage:
            "url('https://www.terawulf-pre.com/img/login_background.88bb70cf.png')",
        }}
      >
        <div className="bg-opacity-90 p-8  w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-left text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                {...register("password")}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <span className="text-left">Password is required</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <LoadCanvasTemplate />
              </label>
              <input
                onBlur={handlevalidatecaptcha}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                type="text"
                name="captcha"
              />
            </div>
            <button
              disabled={disabled}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-center text-gray-600 mt-1 ">
            Don’t have an account?{" "}
            <Link to={"/registation"} className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
