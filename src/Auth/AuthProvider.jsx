import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import useAxiosSecure from "../Hooks/UseAxiosSecure";
export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
 
  const [user, setUser] = useState(null);
  const [adminData, setAdminData] = useState({}); 
  const [loading, setLoading] = useState(true);
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const fetchUserData = async (userId) => {
    try {
      const res = await axiosPublic.get(
        `/api/auth/getUserInfo/${userId}`
      );
      const currentUser = res?.data?.data;

      if (!currentUser) {
        throw new Error("No user data received");
      }

      setUser(currentUser);
      return currentUser;
    } catch (error) {
      console.log("Fetch user data error:", error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      const decodedUser = jwtDecode(storedToken);

      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

      if (decodedUser?.id) {
        fetchUserData(decodedUser.id).finally(() => setLoading(false));
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (data) => {
    try {
      const res = await axiosPublic.post(`/api/auth/login`, data);
      const token = res?.data?.data?.token;
      localStorage.setItem("token", token);
      const decodedUser = jwtDecode(token);

      if (decodedUser?.id) {
        const loginUser = await fetchUserData(decodedUser.id);
        return loginUser;
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  const Register = async (data) => {
    try {
      const res = await axiosPublic.post(`/api/auth/register`, data);

      const token = res?.data?.data?.token;
      if (!token) {
        throw new Error("Token not received from the server");
      }

      localStorage.setItem("token", token);

      const decodedUser = jwtDecode(token);
      if (!decodedUser?.id) {
        throw new Error("Invalid token structure");
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const loginUser = await fetchUserData(decodedUser.id);
      return loginUser;
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Registration failed"
      );
      return null;
    }
  };

  // get admin data
  const fetchAdminData = async () => {
    try {
      const response = await axiosSecure.get(`/api/users/getAdmin`);
      if (response.data.success) {
        setAdminData(response.data.data);
      }
    } catch (error) {
      // toast.error("Error fetching admin details");
      console.error("Error fetching admin:", error);
    }
  };

  // get recharge record
  // const fetchRechargeData = async () => {
  //   try {
  //     if (user?._id) {
  //       const res = await axiosSecure.get(
  //         `/api/users/get-recharge-data/${user?._id}`
  //       );
  //       if (res?.data?.data) {
  //         setRechargeData(res?.data?.data);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch recharge data:", error);
  //   }
  // };

  // const fetchBalanceHistory = async () => {
  //   if (!user?._id) {
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const response = await axiosSecure.get(
  //       `/api/users/getUserBalanceDetails/${user._id}`
  //     );
  //     const userData = response?.data?.data?.balanceHistory;
  //     console.log(userData, 3845);
  //     setBalanceHistory(userData);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const Info = {
    user,
    loading,
    setLoading,
    setUser,
    login,
    Register,
    logout,
    fetchAdminData,
    adminData
  };
  return <AuthContext.Provider value={Info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
