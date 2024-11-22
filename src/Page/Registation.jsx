import { useState } from "react";
import { useForm } from "react-hook-form";
import { PiEyeClosedLight } from "react-icons/pi";
import { VscEyeClosed } from "react-icons/vsc";
import { Link } from "react-router-dom";


const Registation = () => {
     const [showpassword, setShowpassword] = useState(false);
     const {
          register,
          handleSubmit,
          formState: { errors },
     } = useForm()
     const onSubmit = (data) => console.log(data)
     return (
          <div>
               <div className="h-screen w-screen flex items-center justify-center">
                    <div
                         className="flex items-center justify-center h-[550px] w-[550px] bg-no-repeat bg-origin-content bg-right "
                         style={{
                              backgroundImage: "url('https://www.terawulf-pre.com/img/login_background.88bb70cf.png')",
                         }}
                    >
                         <div className="bg-opacity-90 p-8  w-full max-w-md">
                              <h1 className="text-2xl font-bold text-center mb-6">Registration</h1>
                              <form onSubmit={handleSubmit(onSubmit)}>
                                   < div className="mb-4 ">
                                        <label
                                             htmlFor="name"
                                             className="block text-left text-gray-700 font-medium mb-2"
                                        >
                                             User Name
                                        </label>
                                        <input
                                             type="name"
                                             name="name"
                                             {...register("name", { required: true })}
                                             placeholder="Enter your name"
                                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {errors.name && <span className="text-left">Name is required</span>}
                                   </div>
                                   <div className="mb-4">
                                        <label
                                             htmlFor="email"
                                             className="block text-left text-gray-700 font-medium mb-2"
                                        >
                                             Email
                                        </label>
                                        <input
                                             type="email"
                                             name="email"
                                             {...register("email", { required: true })}
                                             placeholder="Enter your email"
                                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {errors.email && <span className="text-left">Email is required</span>}
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
                                                  pattern: /(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,})/
                                             })}
                                             placeholder="Enter your password"
                                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {errors.password?.type === "minLength" && <span className="text-left">Password must be 6 character</span>}
                                        {errors.password?.type === "pattern" && <span className="text-left text-sm">
                                              one lowwerCase and upperCase and one Special character
                                        </span>}
                                   </div>
                                   <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                                   >
                                        Registration
                                   </button>
                              </form>
                              <p className="text-center text-gray-600 mt-4">
                                   Don’t have an account?{" "}
                                   <Link to={'/registation'} className="text-blue-500 hover:underline">
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