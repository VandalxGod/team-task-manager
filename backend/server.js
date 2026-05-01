import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// ================= ENV =================
dotenv.config();

// ================= INIT =================
const app = express();

// ================= DATABASE =================
connectDB();

// ================= MIDDLEWARE =================

// JSON parser
app.use(express.json());

// ✅ CORS FIX (important)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://team-task-manager-gules-omega.vercel.app",
  "https://taskmanager.sumitweb.me",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman / mobile apps / no-origin requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);

// HEALTH CHECK 
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// 404 
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// ERROR HANDLER 
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err.message);

  res.status(500).json({
    message: err.message || "Something went wrong",
  });
});

// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});