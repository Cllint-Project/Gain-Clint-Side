import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatRechargeData } from "../utils/formatRechargeData";
import { submitRecharge } from "../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

function Transaction() {
  const location = useLocation();
  const navigate = useNavigate();
  const { rechargeData: initialRechargeData } = location.state || {};

  const [rechargeData, setRechargeData] = useState(initialRechargeData);
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axiosSecure.get(`/api/users/getAdmin`);
        if (response.data.success) {
          setAdminData(response.data.data);
          setRechargeData((prev) => ({
            ...prev,
            adminNumber: response?.data?.data?.phoneNumber,
          }));
        }
      } catch (error) {
        // toast.error("Error fetching admin details");
        console.error("Error fetching admin:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, [axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formattedData = formatRechargeData(
        rechargeData,
        adminData?.phoneNumber,
        transactionId
      );

      const response = await submitRecharge(formattedData);

      if (response.message) {
        toast.success("Transaction submitted successfully!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Error details:", error.response?.data?.message);
      toast.error(error.response?.data?.message || "Transaction failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="pb-20 bg-gray-50 py-8 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-lg shadow-lg p-4 mb-6">
          <h1 className="text-xl font-bold text-white text-center">
            ধাপ ১: সুবিধাভোগী একাউন্ট কপি করুন
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admin Number
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  readOnly
                  value={adminData?.phoneNumber || ""}
                  className="flex-1 p-3 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500 focus:outline-blue-500"
                  placeholder="Admin account number"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Number
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  readOnly
                  value={rechargeData?.phone_number || ""}
                  className="flex-1 p-3 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500 focus:outline-blue-500"
                  placeholder="Account number"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recharge Option
                </label>
                <input
                  type="text"
                  readOnly
                  value={rechargeData?.recharge_option || ""}
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500 focus:outline-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recharge Amount
                </label>
                <input
                  type="text"
                  readOnly
                  value={rechargeData?.recharge_amount || ""}
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500 focus:outline-blue-500"
                  placeholder="Enter amount"
                />
              </div>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://i.ibb.co.com/w45WF8r/Capture7.jpg"
              alt="Payment Instructions"
              className="w-full h-[500px] object-cover"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transaction Number
            </label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500 focus:outline-blue-500"
              placeholder="Enter your transaction number"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setTransactionId("")}
              className="flex-1 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Delete
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Transaction;
