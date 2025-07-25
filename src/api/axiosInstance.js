import axios from "axios";

// Base API URL (Use your backend URL here)
const axiosInstance = axios.create({
  baseURL: "https://library-app-project-ejr4.onrender.com/api/v1", // Append /api/v1 to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;