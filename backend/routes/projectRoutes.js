import express from "express";
import {
  createProject,
  getProjects,
  deleteProject,
} from "../controllers/projectController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// Create project (admin only)
router.post("/", protect, authorizeRoles("admin"), createProject);

// Get projects
router.get("/", protect, getProjects);

// Delete project (admin only)
router.delete("/:id", protect, authorizeRoles("admin"), deleteProject);

export default router;