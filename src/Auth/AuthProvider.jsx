import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

  // Observer to check login state from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (data) => {
    try {
      const res = await axios.post("https://gain-server-side-production.up.railway.app/api/auth/login", data);
      const loggedInUser = res.data.data;
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser)); // Store user data locally
      return loggedInUser;
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // Registration function
  const Register = async (data) => {
    try {
        console.log(data,36)
      const res = await axios.post("https://gain-server-side-production.up.railway.app/api/auth/register", data);
      const registeredUser = res.data.data;
      setUser(registeredUser);
      console.log(registeredUser,40)
      localStorage.setItem("user", JSON.stringify(registeredUser));
      return registeredUser
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
