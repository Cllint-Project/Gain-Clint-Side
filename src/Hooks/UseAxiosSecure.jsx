import axios from "axios";

const axiosSecure = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: 'https://gain-server-side-production.up.railway.app'
});

const useAxiosSecure = () => {
  // Request interceptor
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers["Content-Type"] = "application/json"; // Default content type
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosSecure.interceptors.response.use(
    (response) => {
      return response; // Return response if successful
    },
    (error) => {
      if (error.response?.status === 401) {
        // Unauthorized, remove user data
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Redirect to login page
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import useAuth from "./useAuth";
// import { useNavigate } from "react-router-dom";
// // import toast from 'react-hot-toast'
// const axiosSecure = axios.create({
//     baseURL: 'http://localhost:7000'
// })

// const useAxiosSecure = () => {
//     const navigate = useNavigate();
//     const { logOut } = useAuth();
//     const [error, setError] = useState(null);

//     axiosSecure.interceptors.request.use(function (config) {
//         const token = localStorage.getItem('access-token');
//         config.headers.authorization = `Bearer ${token}`;
//         return config;
//     }, function (error) {
//         return Promise.reject(error);
//     });

//     axiosSecure.interceptors.response.use(function (response) {
//         return response;
//     }, async (error) => {
//         const status = error.response.status;

//         if (status === 401 || status === 403) {
//             await logOut();
//             setError(error);
//             // toast.error("Unauthorized access detected. Redirecting to login.");
//         }
//         return Promise.reject(error);
//     });

//     useEffect(() => {
//         if (error) {
//             navigate('/login');
//         }
//     }, [error, navigate]);

//     return axiosSecure;
// };

// export default useAxiosSecure;
