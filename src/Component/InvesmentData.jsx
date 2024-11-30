import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { VITE_BASE_URL } from "../baseUrl";

const InvesmentData = () => {
  const [rechargeData, SetRechargeData] = useState([]);
  const [isClaimed, setIsClaimed] = useState(false);

  const { user } = useContext(AuthContext);
  const userId = user?._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${VITE_BASE_URL}/api/users/claim-daily/${userId}`
        );

        const getData = res?.data?.data;
        console.log(getData);

        SetRechargeData(getData);
      } catch (error) {
        console.error("machine data fail to fetch", error);
      }
    };
    fetchData();
  }, [user]);

  // console.log(rechargeData, 31);

  const handleClaim = async (package_id) => {
    const data = {
      investor_id: user?._id,
      package_id: package_id,
    };
    console.log(data);
    try {
      const response = await axios.post(
        `${VITE_BASE_URL}/api/users/claim-daily`,
        data
      );
      console.log("Response:", response.data);
      if (response?.data?.data?.newBalance) {
        toast.success(
          `Claim successful! Your new balance is ${response?.data?.data?.newBalance} TK`
        );
      }
      // সফল হলে স্টেট আপডেট করুন বা অন্য কোনো অ্যাকশন নিন
      setIsClaimed(true);
    } catch (error) {
      console.error(
        "Error claiming daily reward:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        error.response ? error.response.data.message : error.message
      );
    }
  };

  return (
    <div className="mt-4 min-h-[300px] w-full max-w-2xl mx-auto px-4">
      <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-lg shadow-lg p-4 mb-6  mx-auto">
        <h1 className="text-xl font-bold text-white text-center">ধাপ-১ : Daily Claim বোতামে ক্লিক করুন</h1>
      </div>

      {rechargeData?.length > 0 ? (
        rechargeData.map((data) => (
          <>
            <div className="flex items-center justify-center p-4 -mt-16">
              <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 w-full max-w-2xl my-12">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-blue-400">
                    {data?.machine_details.machine_name}
                  </h2>

                  <div onClick={() => handleClaim(data?._id)} className="cursor-pointer relative inline-flex items-center px-6 py-2 overflow-hidden text-lg font-semibold text-blue-600  border-2 border-blue-600 rounded-full hover:text-white group hover:bg-gray-50">
                    <span className="absolute left-0 block w-full h-0 transition-all bg-blue-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                    <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease"></span>
                    <span className="relative">Daily Claim</span>
                  </div>

                  {/* <button
                    onClick={() => handleClaim(data?._id)}
                    disabled={isClaimed} // বাটন disable করার জন্য যদি আগেই claim করা হয়
                    className={`px-6 py-2 rounded-lg text-white ${
                      isClaimed
                        ? "bg-gray-500"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {isClaimed ? "Already Claimed" : "Claim Daily Reward"}
                  </button> */}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-800">পরিমাণ: </span>
                    <span className=" text-gray-800 font-semibold">
                      {data?.machine_details.invest_limit}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-800">বিনিয়োগ হার: </span>
                    <span className="text-gray-800">
                      {data?.machine_details.invest_rate}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-800">দৈনিক আয়:</span>
                    <span className="text-gray-800">
                      {data?.machine_details.daily_income}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-800">আয়:</span>
                    <span className="text-gray-800 w-400 font-semibold">
                      {data?.machine_details.investment_amount}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <img
                    src={
                      `${data?.machine_details.machine_image}` ||
                      "https://placehold.co/400x200/1a1a1a/blue?text=P-8"
                    }
                    alt="Investment visualization"
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </>
        ))
      ) : (
        <h2>No data found...</h2>
      )}
    </div>
  );
};

export default InvesmentData;
