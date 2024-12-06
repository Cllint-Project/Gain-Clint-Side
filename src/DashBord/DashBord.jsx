import { GiftIcon, UserCircle2, WalletMinimal } from "lucide-react";
import { useContext, useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { FcSettings } from "react-icons/fc";
import { GrLogout } from "react-icons/gr";
import { RiCoupon3Fill } from "react-icons/ri";
import { WiTime12 } from "react-icons/wi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import { TfiLayoutTabV } from "react-icons/tfi";
import { TbWashMachine } from "react-icons/tb";

const DashBord = () => {
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate()
  const {logout} = useContext(AuthContext)
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <div>
      {/* Small Screen Navbar */}
      <div className="bg-white text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
            <img
                  // className='hidden md:block'
                  src='/gain-logo.jpeg'
                  alt='logo'
                  width='60'
                  height='60'
                  className="rounded-box"
                />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-white w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-xl rounded-lg justify-center items-center  mx-auto">
              <Link to="/">
                <img
                  // className='hidden md:block'
                  src='/gain-logo.jpeg'
                  alt='logo'
                  width='60'
                  height='60'
                  className="rounded-box"
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {/* User */}
              <NavLink
                to="user"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <UserCircle2 className="w-5 h-5" />

                <span className="mx-4 font-medium">User</span>
              </NavLink>

              {/* Reacharge */}
              <NavLink
                to="recharge"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                {/* <BsFillHouseAddFill className='w-5 h-5' /> */}
                <WalletMinimal />

                <span className="mx-4 font-medium">Recharge Details</span>
              </NavLink>
              {/* Withdraw */}
              <NavLink
                to="withdraw"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <WiTime12 className="w-5 h-5" />

                <span className="mx-4 font-medium">WithDraw Details</span>
              </NavLink>
              {/* Cupon */}
              <NavLink
                to="coupon"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <RiCoupon3Fill className="w-5 h-5" />

                <span className="mx-4 font-medium">Coupon</span>
              </NavLink>
              {/* Lottary */}
              <NavLink
                to="lottary"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <GiftIcon className="w-5 h-5" />

                <span className="mx-4 font-medium">Lottery</span>
              </NavLink>
              {/* Machine */}
              <NavLink
                to="machinedetail"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <TbWashMachine className="w-5 h-5" />

                <span className="mx-4 font-medium">User Machine Details</span>
              </NavLink>
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
              }`
            }
          >
            <FcSettings className="w-5 h-5" />

            <span className="mx-4 font-medium">Profile</span>
          </NavLink>
          <button onClick={handleLogout} className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform">
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashBord;
