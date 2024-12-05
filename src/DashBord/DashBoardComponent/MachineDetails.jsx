import { useState, useEffect } from "react";
import { PlusCircle, MinusCircle, Search } from "lucide-react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";

const UserPackages = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedUser, setExpandedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const axiosSecure = useAxiosSecure();

  const fetchUsers = async (pageNum, search = "") => {
    try {
      const response = await axiosSecure.get(
        `/api/users/user-purchases?page=${pageNum}&search=${search}`
      );
      const { users: newUsers, hasMore: moreData } = response.data;

      setUsers(pageNum === 1 ? newUsers : [...users, ...newUsers]);
      setHasMore(moreData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const handleSearch = (value) => {
    if (searchTimeout) clearTimeout(searchTimeout);

    setSearchTimeout(
      setTimeout(() => {
        setPage(1);
        fetchUsers(1, value);
      }, 500)
    );
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchUsers(nextPage, searchTerm);
    }
  };

  const toggleUserExpand = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  if (loading && page === 1) {
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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleSearch(e.target.value);
              }}
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

          {hasMore && (
            <div className="p-4 text-center">
              <button
                onClick={loadMore}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPackages;
