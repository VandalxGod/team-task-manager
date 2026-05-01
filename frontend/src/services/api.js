import axios from "axios";

// ✅ Create Axios Instance
const API = axios.create({
  baseURL: "https://team-task-manager-sdo8.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ================= REQUEST INTERCEPTOR =================
// 🔥 Attach token automatically
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

// ================= RESPONSE INTERCEPTOR =================
// 🔥 Handle global errors (important for production)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // ❌ Unauthorized (token expired or invalid)
    if (error.response?.status === 401) {
      console.warn("Session expired. Logging out...");

      localStorage.removeItem("user");

      // Redirect to login
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default API;