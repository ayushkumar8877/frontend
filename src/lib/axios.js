import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://backend-0kia.onrender.com/api"
    : "http://localhost:5001/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
