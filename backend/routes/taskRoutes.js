import express from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} from "../controllers/taskController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

/*
========================================
📌 TASK ROUTES
========================================
*/

// 🔹 Create Task (Admin only)
router.post("/", protect, authorizeRoles("admin"), createTask);

// 🔹 Get Tasks (Logged-in user)
router.get("/", protect, getTasks);

// 🔹 Update Task Status (Assigned users only)
router.put("/:id", protect, updateTaskStatus);

// 🔥 Delete Task (Admin only)
router.delete("/:id", protect, authorizeRoles("admin"), deleteTask);

export default router;