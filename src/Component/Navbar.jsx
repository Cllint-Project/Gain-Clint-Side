import { FaHome, FaUsers } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { NavLink } from "react-router-dom";


const Navbar = () => {
     return (
          <div>
<div className="fixed bottom-0 left-0 w-full h-[70px] bg-white shadow-md z-30">
  <div className="flex justify-around items-center py-1 md:py-3">
    {/* Home */}
    <div className="flex flex-col items-center">
      <NavLink to={'/'}>
        <FaHome className="text-blue-500 text-2xl md:text-3xl" />
        <span className="text-xs md:text-sm text-gray-600">হোম</span>
      </NavLink>
    </div>

    {/* Investment */}
    <div className="flex flex-col items-center">
      <NavLink to={'/invesment'}>
        <MdOutlineBusinessCenter className="text-gray-400 text-2xl md:text-3xl" />
        <span className="text-xs md:text-sm text-gray-600">বিনিয়োগ</span>
      </NavLink>
    </div>

    {/* Team */}
    <div className="flex flex-col items-center">
      <NavLink to={'/ourteam'}>
        <FaUsers className="text-gray-400 text-2xl md:text-3xl" />
        <span className="text-xs md:text-sm text-gray-600">আমার টিম</span>
      </NavLink>
    </div>

    {/* Profile */}
    <div className="flex flex-col items-center">
      <HiOutlineUserCircle className="text-gray-400 text-2xl md:text-3xl" />
      <span className="text-xs md:text-sm text-gray-600">ব্যক্তিগত কেন্দ্র</span>
    </div>
  </div>
</div>

      </div>
     );
};

export default Navbar;