import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// Protected route (any logged-in user)
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "User profile accessed",
    user: req.user,
  });
});

// Admin only route
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});

export default router;