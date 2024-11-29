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
        <video
  src="https://www.terawulf-pre.com/media/xuanchuan.97ec90f0.mp4"
  className="lg:w-full sm:w-[1000px] md:w-[1200px] h-[300px] sm:h-[400px] md:h-[500px] lg:object-cover md:object-bottom"
  autoPlay
  muted
  loop
  controls
  alt="Banner Video"
>
  আপনার ব্রাউজার ভিডিও প্লে সাপোর্ট করে না।
</video>




        </div>
      </div>
    </div>
  );
};

export default Banner;
