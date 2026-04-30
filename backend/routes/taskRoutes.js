import express from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus,
} from "../controllers/taskController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin creates task
router.post("/", protect, authorizeRoles("admin"), createTask);

// Get user tasks
router.get("/", protect, getTasks);

// Update task status
router.put("/:id", protect, updateTaskStatus);

export default router;