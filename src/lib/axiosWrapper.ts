import axios from "axios";

const axiosWrapper = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosWrapper;
