import { Link } from "react-router-dom";

const Login = () => {
     return (
          <div className="h-screen w-screen flex items-center justify-center">
          <div
            className="flex items-center justify-center h-[550px] w-[550px] bg-no-repeat bg-origin-content bg-right "
            style={{
              backgroundImage: "url('https://www.terawulf-pre.com/img/login_background.88bb70cf.png')",
            }}
          >
            <div className="bg-opacity-90 p-8  w-full max-w-md">
              <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-left text-gray-700 font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
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
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Login
                </button>
              </form>
              <p className="text-center text-gray-600 mt-4">
                Don’t have an account?{" "}
                <Link to={'/registation'} className="text-blue-500 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
        
     );
};

export default Login;