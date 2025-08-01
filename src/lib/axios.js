import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://backend-vi.onrender.com/api" // ✅ Updated to correct backend
    : "http://localhost:5001/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
