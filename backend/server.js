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

// Load env variables
dotenv.config();

// Initialize app
const app = express();

// ================= DATABASE =================
connectDB();

// ================= MIDDLEWARE =================

// JSON parser
app.use(express.json());

// 🔥 CORS (IMPORTANT FOR VERCEL)
app.use(
  cors({
    origin: "https://team-task-manager-gules-omega.vercel.app",
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

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// ================= 404 HANDLER =================
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.stack);

  res.status(500).json({
    message: "Something went wrong",
  });
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});