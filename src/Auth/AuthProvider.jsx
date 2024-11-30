import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { VITE_BASE_URL } from "../baseUrl";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Login function
  const login = async (data) => {
    try {
      const res = await axios.post(`${VITE_BASE_URL}/api/auth/login`, data);
      const loggedInUser = res.data.data;
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser)); // Store user data locally
      return loggedInUser;
    } catch (error) {
      console.error("Login failed", error);
      toast.error(error.response.data.message);
    }
  };

  // Registration function
  const Register = async (data) => {
    try {
      console.log("data ki ", data);
      const res = await axios.post(`${VITE_BASE_URL}/api/auth/register`, data);
      const registeredUser = res.data.data;
      setUser(registeredUser);
      // localStorage.setItem("user", JSON.stringify(registeredUser));
      return registeredUser;
    } catch (error) {
      console.error("Registration failed", error);

      toast.error(error.response.data.message);
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
