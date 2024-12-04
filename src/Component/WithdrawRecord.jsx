import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../Hooks/UseAxiosSecure";
import { AuthContext } from "../Auth/AuthProvider";
import LoadingSpinner from "../common/LoadingSpinner";

const WithdrawRecord = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const statusOptions = ["all", "pending", "approved", "rejected"];

  const fetchWithdrawals = async () => {
    try {
      let url = `/api/users/getWithdraw?userId=${user?._id}`;

      if (selectedStatus !== "all") {
        url += `&status=${selectedStatus}`;
      }

      const response = await axiosSecure.get(url);
      setWithdrawals(response?.data?.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch withdrawals");
    }
  };

  useEffect(() => {
    if (user) {
      fetchWithdrawals(); // Fetch withdrawals only when user is available
    }
  }, [selectedStatus, user]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
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
  console.log(withdrawals, 47);

  if (loading) return <LoadingSpinner />;
  return (
    <div>
      <div className="min-h-screen my-10 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )} */}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status?.charAt(0)?.toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-400 to-blue-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                      Pending Balance
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                      Account Number
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                    createdAt
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {withdrawals?.map((withdrawal) => (
                    <tr
                      key={withdrawal?._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ৳{withdrawal?.pending_balance?.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {withdrawal?.payment_method}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {withdrawal?.account_number}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            withdrawal?.status
                          )}`}
                        >
                          {withdrawal?.status}
                        </span>
                      </td>
                      <th className="px-6 py-4 text-left text-sm font-medium  uppercase tracking-wider">
                        {new Date(withdrawal?.createdAt).toLocaleString()}
                      </th>
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

export default WithdrawRecord;
