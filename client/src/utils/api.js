import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl) throw new Error("VITE_API_BASE_URL is missing!");

// Set up axios to use the token for all requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers["Content-Type"] = "application/json";
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.defaults.baseURL = apiBaseUrl;
