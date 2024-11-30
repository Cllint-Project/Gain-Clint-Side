import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const ReachargeDetail = () => {
  const [recharges, setRecharges] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const axiosSecure = UseAxiosSecure();

  const statusOptions = ["all", "pending", "approved", "rejected"];

  useEffect(() => {
    fetchRecharges();
  }, [selectedStatus]);

  const fetchRecharges = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axiosSecure.get(
        `/api/users/get-AllRecharge-data${
          selectedStatus !== "all" ? `?status=${selectedStatus}` : ""
        }`
      );
      setRecharges(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch recharges");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (investor_id, recharge_id , status) => {
    try {
      const result = await Swal.fire({
        title: `Confirm ${status}?`,
        text: `Are you sure you want to ${status} this recharge request?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: status === "approved" ? "#10B981" : "#EF4444",
        cancelButtonColor: "#6B7280",
        confirmButtonText:
          status === "approved" ? "Yes, approve it!" : "Yes, reject it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        setLoading(true);
        setError("");

        await axiosSecure.post(
          `/api/users/approve-recharge`,
          {
            investor_id,
            recharge_id,
            status
          }
        );

        await Swal.fire({
          title: "Success!",
          text: `recharge request has been ${status}`,
          icon: "success",
          confirmButtonColor: "#10B981",
        });

        // Refresh the list after update
        await fetchRecharges();
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text:
          err.response?.data?.message || "Failed to update recharges status",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
      setError(
        err.response?.data?.message || "Failed to update recharges status"
      );
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
console.log(recharges)
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

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
                    Transaction Id
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                  Recharge Amount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                    Account Number
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                     Recharge Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recharges?.map((recharge) => (
                  <tr
                    key={recharge?._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {recharge?.transaction_id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ৳{recharge?.recharge_amount?.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {recharge?.recharge_option}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {recharge?.phone_number}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          recharge?.recharge_status
                        )}`}
                      >
                        {recharge?.recharge_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {recharge?.recharge_status === "pending" && (
                        <div className="space-x-2">
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                recharge?.investor_id,
                                recharge?._id,
                                "approved"
                              )
                            }
                            className="bg-green-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                recharge?.investor_id,
                                recharge?._id,
                                "rejected"
                              )
                            }
                            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReachargeDetail;
