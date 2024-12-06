import { useState } from "react";
import { PlusCircle, MinusCircle, Search } from "lucide-react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import usePagination from "../../Hooks/UsePagination";
import Pagination from "../../common/Pagination";


const UserPackages = () => {
  const [expandedUser, setExpandedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const axiosSecure = useAxiosSecure();

  const fetchUserPackages = async (page, itemsPerPage) => {
    const response = await axiosSecure.get(
      `/api/users/user-purchases?page=${page}&limit=${itemsPerPage}&search=${searchTerm}`
    );
    return response;
  };

  const {
    data: users,
    currentPage,
    totalPages,
    loading,
    handlePageChange,
    refresh,
  } = usePagination(fetchUserPackages, 10);

  const handleSearch = (value) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTerm(value);
    
    setSearchTimeout(
      setTimeout(() => {
        refresh();
      }, 500)
    );
  };

  const toggleUserExpand = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  if (loading && currentPage === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            User Package Purchases
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {users.map((user) => (
            <div
              key={user._id}
              className="border-b border-gray-200 last:border-b-0"
            >
              <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => toggleUserExpand(user._id)}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500">{user.phone}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {user.packageCount} Packages
                  </span>
                  {expandedUser === user._id ? (
                    <MinusCircle className="w-6 h-6 text-gray-400" />
                  ) : (
                    <PlusCircle className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </div>

              {expandedUser === user._id && (
                <div className="bg-gray-50 p-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Machine Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Investment
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Duration
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Daily Income
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {user.packages.map((pkg) => (
                        <tr key={pkg._id} className="hover:bg-gray-100">
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {pkg.machine_details.machine_name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {pkg.machine_details.investment_amount}TK
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {pkg.machine_details.investment_duration} Days
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {pkg.machine_details.daily_income}TK
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                pkg.machine_details.vipStatus === "vip"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {pkg.machine_details.vipStatus.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default UserPackages;