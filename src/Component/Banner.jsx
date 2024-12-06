import { useCallback, useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import { FaRegCircleUser } from "react-icons/fa6";
import video from "/banner-video.mp4"

const Banner = () => {
  const { logout, user } = useContext(AuthContext);
  const [menu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = useCallback(() => {
    setShowMenu((prev) => !prev);
  }, []);

  const handleLogout = () => {
    logout();
    setShowMenu(false);
    navigate("/login");
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center bg-blue-500 px-4 py-2">
        {/* Logo */}
        <div>
          <img
            src="/gain-logo.jpeg"
            alt="logo"
            width="45"
            height="45"
            className="rounded-box"
          />
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <div ref={menuRef} className="relative">
            <div
              onClick={toggleMenu}
              className="cursor-pointer flex items-center"
            >
              {user?._id ? (
                <div className="flex justify-center items-center gap-6">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    {user?.profileImage ? (
                      <img
                        src={user?.profileImage || '/default.jpg'}
                        className="h-full w-full object-cover"
                        alt={user?.username}
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-blue-600 text-white">
                        <FaRegCircleUser className="text-2xl" />
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="hidden md:block btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button className="hidden md:block btn btn-sm bg-blue-500 hover:bg-blue-600 text-white">
                  <Link to={"/login"}>login</Link>
                </button>
              )}
            </div>

            {/* Dropdown Menu */}
            {menu && (
              <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                {user?._id ? (
                  <>
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user?.username}
                      </p>
                    </div>
                    {user?.role === "admin" && (
                      <Link
                        to="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowMenu(false)}
                      >
                        Admin panel
                      </Link>
                    )}
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowMenu(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Mobile Login/Logout Button */}
          <div className="sm:hidden">
            {user?._id ? (
              <button
                onClick={handleLogout}
                className=" btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className=" btn btn-sm bg-blue-500 hover:bg-blue-600 text-white">
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
          src={video}
          className=" lg:w-full sm:w-[1000px] md:w-[1200px] sm:h-[400px] md:h-[500px] lg:object-fill md:object-bottom"
          autoPlay
          muted
          loop
          controls
          alt="Banner Video"
        >
        </video>
      </div>
    </div>
  );
};

export default Banner;
