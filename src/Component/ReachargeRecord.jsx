import { useContext, useState } from "react";
import useAxiosSecure from "../Hooks/UseAxiosSecure";
import { AuthContext } from "../Auth/AuthProvider";
import usePagination from "../Hooks/UsePagination";
import Pagination from "../common/Pagination";

const ReachargeRecord = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const axiosSecure = useAxiosSecure();
  const statusOptions = ["all", "pending", "approved", "rejected"];
  const { user } = useContext(AuthContext);

  const fetchRecharges = async (page, limit) => {
    let url = `/api/users/get-recharge-data?userId=${user?._id}&page=${page}&limit=${limit}`;

    if (selectedStatus !== "all") {
      url += `&status=${selectedStatus}`;
    }
    return await axiosSecure.get(url);
  };

  const {
    data: recharges,
    currentPage,
    totalPages,
    handlePageChange,
    refresh,
  } = usePagination(fetchRecharges);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    refresh();
  };

  console.log(recharges, 'recharges')

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
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

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
                  {recharges?.map((item) => (
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

              {recharges?.length > 0 ? (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            ) : (
              <div className="text-center py-4">No recharges found</div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReachargeRecord;
