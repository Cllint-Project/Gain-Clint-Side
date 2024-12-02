import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import LoadingSpinner from "../common/LoadingSpinner";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

const ReachargeRecord = () => {
  const [rechargeData, setRechargeData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user from AuthContext
  const { user, loading: authLoading } = useContext(AuthContext);

  const axiosSecure = UseAxiosSecure();
  const userId = user?._id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get(
          `/api/users/get-recharge-data/${userId}`
        );
        setRechargeData(res?.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch recharge data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch data only if AuthContext is not loading
    if (!authLoading) {
      fetchData();
    }
  }, [userId, authLoading, axiosSecure]);

  if (loading || authLoading) {
    return <LoadingSpinner />;
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Transaction Id
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Number
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      CreatedAt
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Recharge Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rechargeData?.map((item) => (
                    <tr
                      key={item?._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item?.transaction_id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {item?.phone_number}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {item?.recharge_amount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {new Date(item?.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            item?.recharge_status
                          )}`}
                        >
                          {item?.recharge_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReachargeRecord;
