import { useContext } from "react";
import { Link, } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";

const Banner = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <div className="w-full">
        {/* Header Section */}
        <div className="flex justify-between items-center bg-blue-500  px-4 py-2">
          {/* Logo */}
          <div>
            {/* Replace the commented code with your logo if needed */}
            <h2 className="text-2xl text-white">Gain</h2>
          </div>
          {/* Icon or Flag */}
          <div className=" flex items-center gap-10 p-1">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="Avatar"
              className="h-10 w-10 rounded-full"
            />

            <div className="flex gap-4">
              {user ? (
                <button
                  onClick={logout}
                  className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login">
                  <button className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Main Image Section */}
        <div className="relative">
          <img
            src="https://img.freepik.com/free-vector/gradient-real-estate-linkedin-banner_23-2149058715.jpg?t=st=1731998828~exp=1732002428~hmac=d7d2ff3ebb88f3b50e10a11c902a63a416f60269ccab7353cd1f21b6fa7113e8&w=1060"
            alt="Banner Image"
            className="lg:w-full sm:w-[400px] md:w-[900px] h-[200px] sm:h-[300px] md:h-[400px] lg:object-cover md:object-bottom"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
