import express from "express";
import { createProject, getProjects } from "../controllers/projectController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin creates project
router.post("/", protect, authorizeRoles("admin"), createProject);

// Get projects (admin + member)
router.get("/", protect, getProjects);

export default router;