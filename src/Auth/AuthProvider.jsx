import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  // const [UserId, setUserId] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const axiosPublic = UseAxiosPublic();
  // console.log("auth 13", user?.role);
  // // Logout function
  // const logout = () => {
  //   setUser(null);
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("token");
  // };

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   const storedToken = localStorage.getItem("token");

  //   if (storedUser && storedToken) {
  //     const getUserData = JSON.parse(storedUser); // লোকাল স্টোরেজ থেকে user
  //     setUser(getUserData); // user অবজেক্ট সেট করা
  //     setUserId(getUserData._id); // user থেকে _id সেট করা

  //     // axios এর হেডার এ টোকেন সেট করা
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
  //     setLoading(false); // টোকেন এবং ইউজার পেলে লোডিং false করা
  //   } else {
  //     setLoading(false); // টোকেন বা ইউজার না থাকলে লোডিং false করা
  //   }

  //   const handleStorageChange = () => {
  //     const updatedUser = localStorage.getItem("user");
  //     setUser(updatedUser ? JSON.parse(updatedUser) : null);
  //   };

  //   window.addEventListener("storage", handleStorageChange);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  // console.log(UserId, "userid");

  // const login = async (data) => {
  //   try {
  //     const res = await axiosPublic.post(`/api/auth/login`, data);
  //     const loggedInUser = res.data.data;
  //     setUser(loggedInUser);

  //     // Store token and user info
  //     localStorage.setItem("user", JSON.stringify(loggedInUser));
  //     localStorage.setItem("token", loggedInUser.token);
  //     axios.defaults.headers.common[
  //       "Authorization"
  //     ] = `Bearer ${loggedInUser.token}`;
  //     return loggedInUser;
  //   } catch (error) {
  //     console.error("Login failed", error);
  //     toast.error(error.response.data.message);
  //   }
  // };

  // const Register = async (data) => {
  //   try {
  //     const res = await axiosPublic.post(`/api/auth/register`, data);
  //     const registeredUser = res.data.data;
  //     setUser(registeredUser);

  //     // Store token and user info
  //     localStorage.setItem("user", JSON.stringify(registeredUser));
  //     localStorage.setItem("token", registeredUser.token);
  //     axios.defaults.headers.common[
  //       "Authorization"
  //     ] = `Bearer ${registeredUser.token}`;
  //     return registeredUser;
  //   } catch (error) {
  //     console.error("Registration failed", error);
  //     toast.error(error.response.data.message);
  //   }
  // };

  const [user, setUser] = useState(null); // Store decoded token info
  const [loading, setLoading] = useState(true);
  const axiosPublic = UseAxiosPublic();

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const fetchUserData = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/auth/getUserInfo/${userId}`
      );
      const currentUser = res?.data?.data;

      if (!currentUser) {
        throw new Error("No user data received");
      }

      setUser(currentUser);
      return currentUser; // Return user for optional use
    } catch (error) {
      console.log("Fetch user data error:", error);
      toast.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      const decodedUser = jwtDecode(storedToken);

      // axios এর হেডারে টোকেন সেট করা
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

      // ইউজারের সম্পূর্ণ ডেটা ফেচ করা
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
        const loginUser = await fetchUserData(decodedUser.id); // `_id` ব্যবহার করে ইউজারের ডেটা ফেচ করা
        return loginUser;
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  console.log("decoded user", user);

  const Register = async (data) => {
    try {
      // Call the registration API
      const res = await axiosPublic.post(`/api/auth/register`, data);
      console.log(res, "auth register");
  
      // Extract and store token
      const token = res?.data?.data?.token;
      if (!token) {
        throw new Error("Token not received from the server");
      }
  
      localStorage.setItem("token", token);
  
      // Decode token to get user ID
      const decodedUser = jwtDecode(token);
      if (!decodedUser?.id) {
        throw new Error("Invalid token structure");
      }
  
      // Set the token in axios headers
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
      // Fetch and return the full user data
      const loginUser = await fetchUserData(decodedUser.id); 
      return loginUser;
  
    } catch (error) {
      // Handle API or logic errors
      console.error("Registration failed:", error);
      toast.error(error.response?.data?.message || error.message || "Registration failed");
      return null; // Return null to indicate failure
    }
  };
  

  const Info = {
    user,
    loading,
    setLoading,
    setUser,
    login,
    Register,
    logout,
  };
  return <AuthContext.Provider value={Info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
