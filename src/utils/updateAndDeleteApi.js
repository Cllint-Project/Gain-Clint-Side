import Swal from "sweetalert2";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";


export const handleDelete = async (userId) => {
    const axiosSecure = UseAxiosSecure();
    console.log(userId);
    try {
      const res = await axiosSecure.delete(`/api/users/delete-user/${userId}`);

      if (res.data.message) {
        Swal.fire("Success!", res.data.message, "success");
      } // Refresh the user list
      return res.data.data;
    } catch (error) {
      if (error.response && error.response.data) {
        Swal.fire("Error!", error.response.data.message, "error");
      } else {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };