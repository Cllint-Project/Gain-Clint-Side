import Swal from "sweetalert2";
import { FaUser, FaSort } from "react-icons/fa";
import UsePagination from "../../Hooks/UsePagination";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import LoadingSpinner from "../../common/LoadingSpinner";
import { handleDelete } from "../../utils/updateAndDeleteApi";
import Pagination from "../../common/Pagination";


const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const fetchUsers = async (page, limit) => {
    return await axiosSecure.get(`/api/users/getUsers?page=${page}&limit=${limit}`);
  };

  const {
    data: rechargeData,
    currentPage,
    totalPages,
    loading,
    handlePageChange,
    refresh
  } = UsePagination(fetchUsers);

  const updateRole = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "normal-user" : "admin";

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change the role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.put(`/api/users/update-role`, {
          newRole,
          userId,
        });
        Swal.fire("Success!", res.data.message, "success");
        refresh();
      } catch (error) {
        console.error("Failed to update role:", error);
        Swal.fire("Error!", "Failed to update user role.", "error");
      }
    }
  };

  const isDeletedSuccess = async (userId) => {
    const isSuccess = await handleDelete(userId)
    isSuccess && refresh();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              {rechargeData.length > 0 ? (
                <>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                        <th className="px-6 py-4 text-left font-semibold tracking-wider whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            Name
                            <FaSort className="text-gray-300 hover:text-white cursor-pointer" />
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left font-semibold tracking-wider whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            Phone Number
                            <FaSort className="text-gray-300 hover:text-white cursor-pointer" />
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left font-semibold tracking-wider whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            User Role
                            <FaSort className="text-gray-300 hover:text-white cursor-pointer" />
                          </div>
                        </th>
                        <th className="px-6 py-4 text-center font-semibold tracking-wider whitespace-nowrap">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      {rechargeData?.map((item, index) => (
                        <tr
                          key={item?._id}
                          className={`${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          } hover:bg-gray-100 transition-colors duration-200`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {item?.username}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {item?.phoneNumber}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {item?.role}
                            </div>
                          </td>
                          <td className="px-6 py-4 flex flex-row gap-3 whitespace-nowrap text-center">
                            <div className="flex justify-center gap-3">
                              <div>
                                <button
                                  className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${
                                    item.role === "admin" && "hidden"
                                  }`}
                                  onClick={() => updateRole(item?._id, item?.role)}
                                >
                                  <FaUser className="mr-2" />
                                  Change Role
                                </button>
                              </div>
                            </div>
                            <div>
                              <button
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                onClick={() => isDeletedSuccess(item?._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <div className="text-center py-4">No users found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;