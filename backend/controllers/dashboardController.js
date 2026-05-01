import Task from "../models/Task.js";

// DASHBOARD STATS 
export const getDashboardStats = async (req, res) => {
  try {
    let query = {};

    //  ROLE-BASED LOGIC
    if (req.user.role === "admin") {
      // Admin → all tasks
      query = {};
    } else {
      // Member → only assigned tasks
      query = {
        assignedTo: { $in: [req.user._id] },
      };
    }

    //  COUNT USING DATABASE (FAST)
    const totalTasks = await Task.countDocuments(query);

    const completedTasks = await Task.countDocuments({
      ...query,
      status: "completed",
    });

    const pendingTasks = await Task.countDocuments({
      ...query,
      status: "pending",
    });

    const inProgressTasks = await Task.countDocuments({
      ...query,
      status: "in-progress",
    });

    const overdueTasks = await Task.countDocuments({
      ...query,
      dueDate: { $lt: new Date() },
      status: { $ne: "completed" },
    });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      overdueTasks,
    });

  } catch (error) {
    console.error("DASHBOARD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};