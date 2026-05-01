import axios from "axios";

// Create Axios Instance
const API = axios.create({
  // baseURL: "https://team-task-manager-sdo8.onrender.com/api",
  baseURL: "https://team-task-manager-production-b165.up.railway.app/api",
  // baseURL: "http://localhost:5000/api", 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


API.interceptors.request.use(
  (req) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user?.token) {
        req.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (error) {
      console.error("Token parse error:", error);
    }

    return req;
  },
  (error) => Promise.reject(error)
);


API.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {
      console.warn("Session expired. Logging out...");

      localStorage.removeItem("user");

      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default API;