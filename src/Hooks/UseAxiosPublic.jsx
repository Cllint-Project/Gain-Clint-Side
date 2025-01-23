import axios from "axios";
const axiosPublic = axios.create({
    // baseURL: 'http://localhost:5000'
    baseURL: 'https://gain-server-side.vercel.app'
    // baseURL: "https://gain-server-side-production.up.railway.app",
})
const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;