import { FaChartLine } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";
import { MdSupportAgent } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import { useContext, useState } from "react";
import Modal from "./Modal";
import SecretCode from "./SecretCode";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Auth/AuthProvider";
import LoadingSpinner from "../common/LoadingSpinner";
import useAxiosSecure from "../Hooks/UseAxiosSecure";
import SuccessModal from "./SuccessModal";

const PersonalInformation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const { user, loading } = useContext(AuthContext);
  const userId = user?._id;
  const axiosSecure = useAxiosSecure();
  
  const data = {
    code: secretCode,
    userId: userId,
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosSecure.post(`/api/users/redeem-coupon`, data);
      
      if (response?.data?.success) {
        setAmount(response?.data?.data?.couponAmount);
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    }
    setIsOpen(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-100 min-h-screen mt-4 flex flex-col lg:px-8 pb-20">
      {/* Header Section */}
      <header className="bg-blue-500 text-white text-center p-4 rounded-t-lg">
        <h1 className="text-xl font-bold">ব্যক্তিগত কেন্দ্র</h1>
      </header>

      {/* Profile Section */}
      <div className="bg-blue-500 text-white p-6 rounded-b-lg">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <img
              src={`${user?.profileImage}`}
              alt="Profile"
              className="rounded-full"
            />
          </div>
          <h2 className="text-2xl text-white">{user?.username}</h2>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-14 ">
            <div className=" text-center ">
              <p className="text-lg font-bold">{user?.balance}TK</p>
              <p className="text-sm">মোট ব্যালেন্স</p>
            </div>
          </div>
          <div className="flex flex-col items-center mt-6 gap-4">
            <Link to={"/recharge"}>
              <button className="btn btn-sm bg-blue-500 px-4 py-2 rounded hover:to-blue-500 text-white w-full sm:w-auto">
                রিচার্জ
              </button>
            </Link>
            <Link to={"/withdraw"}>
              <button className=" btn bg-red-500 btn-sm px-4 py-2 hover:bg-red-500 rounded text-white w-full sm:w-auto">
                উত্তোলন
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="bg-white mt-6 shadow-sm rounded-lg mx-4 flex-grow">
        <div className="flex justify-around border-b">
          <div className="p-4 text-center">
            <span className="text-blue-500 text-4xl flex justify-center">
              <FaChartLine></FaChartLine>
            </span>
            <p className="">বিনিয়োগ রেকর্ড</p>
          </div>
          <div className="p-4 text-center">
            <span className="text-blue-500 text-4xl flex justify-center">
              <TbMoneybag />
            </span>
            <p className="">অর্থায়ন বিশদ</p>
          </div>
          <div className="p-4 text-center">
            <span className="text-blue-500 text-4xl flex justify-center">
              <MdSupportAgent />
            </span>
            <p className="">অনলাইন সেবা</p>
          </div>
        </div>

        <ul className="my-14">
          <li className="flex items-center justify-between p-4 border-b cursor-pointer">
            <span>আজকের আয় ও বোনাস</span>
            <Link to={"/ShowBalanceDetails"} className="text-2xl">
              <button className="px-6 btn-sm mr-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600  duration-200 text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                <HiArrowLongRight />
              </button>
            </Link>
          </li>

          <li className="flex items-center justify-between p-4 border-b cursor-pointer">
            <span>আমার পুরস্কার</span>

            <div
              onClick={() => setIsOpen(true)}
              className="flex items-center justify-center"
            >
              <button className="px-6 btn-sm mr-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600  duration-200  font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all text-2xl">
                <span className="text-2xl">
                  <HiArrowLongRight />
                </span>
              </button>

              <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      Enter Secret Code
                    </h2>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-500 hover:text-gray-700 text-xl transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  <SecretCode
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                  />

                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-md hover:shadow-lg"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          </li>

          <li className="flex items-center justify-between p-4 border-b cursor-pointer">
            <span>লটারি</span>
            <Link to={"/userlottary"} className="text-2xl">
              <button className="px-6 btn-sm mr-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600  duration-200 text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                <HiArrowLongRight />
              </button>
            </Link>
          </li>

          <li className="flex items-center justify-between p-4 border-b cursor-pointer">
            <span>রিচার্জ রেকর্ড</span>
            <Link to={"/reachargerecord"} className="text-2xl">
              <button className="px-6 btn-sm mr-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600  duration-200 text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                <HiArrowLongRight />
              </button>
            </Link>
          </li>
          <li className="flex items-center justify-between p-4 border-b cursor-pointer">
            <span>উইথড্র রেকর্ড</span>
            <Link to={"/withdrawrecord"} className="text-2xl">
              <button className="px-6 btn-sm mr-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600  duration-200 text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                <HiArrowLongRight />
              </button>
            </Link>
          </li>
        </ul>
      </div>

      {/* Success Modal */}
      <SuccessModal 
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        amount={amount}
      />
    </div>
  );
};

export default PersonalInformation;