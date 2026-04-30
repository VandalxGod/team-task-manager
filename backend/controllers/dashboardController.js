import Task from "../models/Task.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await Task.find({ assignedTo: userId });

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
      (task) => task.status === "completed"
    ).length;

    const pendingTasks = tasks.filter(
      (task) => task.status === "pending"
    ).length;

    const inProgressTasks = tasks.filter(
      (task) => task.status === "in-progress"
    ).length;

    const overdueTasks = tasks.filter(
      (task) =>
        task.dueDate &&
        task.dueDate < new Date() &&
        task.status !== "completed"
    ).length;

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      overdueTasks,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};