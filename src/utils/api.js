import { toast } from "react-toastify";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

const axiosSecure = UseAxiosSecure();
export const submitRecharge = async (data) => {
  try {
    const endpoint = data.machine_details 
      ? `/api/users/submit-invest`
      : `/api/users/submit-recharge`;
    const response = await axiosSecure.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error submitting recharge:", error);
    throw error;
  }
};

export const getTeamMembers = async (userId) => {
  try {
    const response = await axiosSecure.get(`/api/users/team/${userId}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching team members:", error);
    throw error;
  }
};

export const BuyMachine = async (data) => {
  try {
    const endpoint = data?.machine_details && `/api/users/submit-invest`;

    const response = await axiosSecure.post(endpoint, data);
    
    // Show success toast if successful
    if (response?.data?.success) {
      toast.success(response.data.message || "Transaction submitted successfully!");
    }
    
    return response?.data;
  } catch (error) {
    // Show error toast on failure
    const errorMessage = error?.response?.data?.message || "Error submitting Buy machine!";
    toast.error(errorMessage);
    console.error("Error submitting Buy machine:", error);
    
    // Throw error to handle it in the calling component
    throw error;
  }
};