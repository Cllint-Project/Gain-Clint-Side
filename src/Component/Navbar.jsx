import { FaHome, FaUsers } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { Link } from "react-router-dom";


const Navbar = () => {
     return (
          <div>
  <div className="fixed bottom-0 left-0 w-full bg-white shadow-md">
  <div className="flex justify-around items-center py-2 md:py-4">
    {/* Home */}
    <div className="flex flex-col items-center">
      <FaHome className="text-blue-500 text-2xl md:text-3xl" />
      <span className="text-xs md:text-sm text-gray-600">হোম</span>
    </div>

    {/* Investment */}
    <div className="flex flex-col items-center">
      <MdOutlineBusinessCenter className="text-gray-400 text-2xl md:text-3xl" />
      <Link to={'/invesment'} className="text-xs md:text-sm text-gray-600">বিনিয়োগ</Link>
    </div>

    {/* Team */}
    <div className="flex flex-col items-center">
      <FaUsers className="text-gray-400 text-2xl md:text-3xl" />
      <span className="text-xs md:text-sm text-gray-600">আমার টিম</span>
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