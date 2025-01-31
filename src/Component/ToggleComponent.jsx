
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import useAxiosSecure from "../Hooks/UseAxiosSecure";

const ToggleComponent = () => {
  const [activeTab, setActiveTab] = useState("P");
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get(`/api/users/get-invest-data`);
        const getData = res?.data.data;
        setData(getData);
      } catch (error) {
        console.error("machine data fail to fetch", error);
      }
    };

    fetchData();
  }, [axiosSecure]);

  // Filtering data based on activeTab
  const filteredData =
    activeTab === "P"
      ? data?.filter((item) => item.machine_name === "M-8" || item.machine_name === "M-10" || item.machine_name === "M-20" || item.machine_name === "M-35" )
      : activeTab === "PRO"
      ? data?.filter((item) => item.machine_name === "PRO-40" ||  item.machine_name === "PRO-45" || item.machine_name === "PRO-50" || item.machine_name === "PRO-55"  )
      : data?.filter((item) => item.machine_name === "VIP-1" || item.machine_name === "VIP-2" || item.machine_name === "VIP-3" || item.machine_name === "VIP-4" || item.machine_name === "VIP-5") ; // VIP data

  return (
    <div className="min-h-[300px] w-full max-w-[750px] mx-auto px-4 py-5 md:py-10">
      {/* Tab Buttons */}
      <div className="flex justify-center mt-4 gap-4">
        <button
          className={`px-6 py-2 font-semibold w-1/3 rounded-lg transition-all duration-300 ${
            activeTab === "P" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("P")}
        >
          P
        </button>
        <button
          className={`px-6 py-2 font-semibold w-1/3 rounded-lg transition-all duration-300 ${
            activeTab === "PRO" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("PRO")}
        >
          PRO
        </button>
        <button
          className={`px-6 py-2 font-semibold w-1/3 rounded-lg transition-all duration-300 ${
            activeTab === "VIP" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("VIP")}
        >
          VIP
        </button>
      </div>

      {/* Tab Content */}
      <div className="w-full max-w-[700px] h-auto mx-auto space-y-2">
        {filteredData?.length > 0 ? (
          filteredData?.map((item, index) => (
            <Link key={index} to={`/cardDetails/${item._id}`}>
              <div className="w-full bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition-shadow my-11 duration-300">
                {/* Image Section */}
                <div>
                  <img
                    src={item?.machine_image}
                    alt={item?.machine_name}
                    className="w-full h-44 object-cover"
                  />
                </div>
                {/* Card Body */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {item.machine_name}
                  </h3>
                  <p className="text-gray-700">
                    <span className="font-medium">বিনিয়োগ পরিমাণ:</span>{" "}
                    <span className="font-bold text-green-600">
                      {item.investment_amount} TK
                    </span>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">বিনিয়োগ সময়কাল:</span>{" "}
                    <span className="font-bold text-green-600">
                      {item.investment_duration}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">মোট আয়:</span>{" "}
                    <span className="font-bold text-green-600">
                      {item.total_income} TK
                    </span>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">দৈনিক আয়:</span>{" "}
                    <span className="font-bold text-green-600">
                      {item.daily_income} TK
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center text-gray-600 mt-6">
            কোনো ডাটা পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
};

export default ToggleComponent;
