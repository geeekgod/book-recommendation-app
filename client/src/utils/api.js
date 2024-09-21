import axios from "axios";

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

// TODO: ship baseUrl to ENV
axios.defaults.baseURL = "http://localhost:8080";
