import axios from "axios";

const API_BASE_URL = `${process.env.BASE_SERVER_URL}/api`;

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - adds token to every request
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - catches errors and returns formatted response
httpClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      let message = error.response.data?.message;

      // Handle specific status codes
      switch (status) {
        case 400:
          message = message || "Invalid request. Please check your data.";
          break;
        case 401:
          message = message || "Unauthorized. Please login again.";
          // Clear token on authentication error
          localStorage.removeItem("token");
          break;
        case 403:
          message = message || "Access denied. You don't have permission.";
          break;
        case 404:
          message = message || "Resource not found.";
          break;
        case 422:
          message = message || "Validation error. Please check your input.";
          break;
        case 500:
          message = "Server error. Please try again later.";
          break;
        default:
          message = message || "Request failed";
      }

      return Promise.reject({
        message,
        status,
        data: error.response.data,
      });
    } else if (error.request) {
      // Request was made but no response received
      return Promise.reject({
        message: "No response from server. Please check your connection.",
        status: 0,
        type: "NETWORK_ERROR",
      });
    } else {
      // Error in request setup
      return Promise.reject({
        message: error.message || "Request failed",
        status: 0,
        type: "REQUEST_ERROR",
      });
    }
  },
);

export default httpClient;
