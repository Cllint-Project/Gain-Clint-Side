
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000", // Adjust based on backend URL
  // baseURL: "https://gain-server-side-production.up.railway.app", // Adjust based on backend URL
});

const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login if unauthorized
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
