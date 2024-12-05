import { FaHome, FaUsers } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
<div className="fixed bottom-0 left-0 w-full h-[60px] bg-white shadow-md z-30">
  <div className="flex justify-around items-center py-1 md:py-2">
    {/* Home */}
    <div className="flex flex-col justify-center items-center">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive ? "text-blue-500" : "text-gray-400"
        }
      >
        <FaHome className="text-2xl md:text-3xl" />
        <span
           className={({ isActive }) =>
            isActive ? "text-red-500" : "text-gray-400"
          }
        >
          হোম
        </span>
      </NavLink>
    </div>

    {/* Investment */}
    <div className="flex flex-col justify-center items-center">
      <NavLink
        to={"/invesment"}
        className={({ isActive }) =>
          isActive
            ? "text-blue-500"
            : "text-gray-400"
        }
      >
        <MdOutlineBusinessCenter className="text-2xl md:text-3xl mx-auto" />
        <span
           className={({ isActive }) =>
            isActive ? "text-blue-500" : "text-gray-400"
          }
        >
          বিনিয়োগ
        </span>
      </NavLink>
    </div>

    {/* Team */}
    <div className="flex flex-col justify-center items-center">
      <NavLink
        to={"/ourteam"}
        className={({ isActive }) =>
          isActive
            ? "text-blue-500"
            : "text-gray-400"
        }
      >
        <FaUsers className="text-2xl md:text-3xl mx-auto" />
        <span
                 className={({ isActive }) =>
                  isActive ? "text-blue-500" : "text-gray-400"
                }
        >
          আমার টিম
        </span>
      </NavLink>
    </div>

    {/* Profile */}
    <div className="flex flex-col justify-center items-center">
      <NavLink
        to={"/personal"}
        className={({ isActive }) =>
          isActive
            ? "text-blue-500"
            : "text-gray-400"
        }
      >
        <HiOutlineUserCircle className="text-2xl md:text-3xl mx-auto" />
        <span
                   className={({ isActive }) =>
                    isActive ? "text-blue-500" : "text-gray-400"
                  }
        >
          ব্যক্তিগত কেন্দ্র
        </span>
      </NavLink>
    </div>
  </div>
</div>

    </div>
  );
};

export default Navbar;
