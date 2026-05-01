import Task from "../models/Task.js";

/* CREATE TASK (Admin only) */
export const createTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, dueDate } = req.body;

    // Validation
    if (!title || !project) {
      return res.status(400).json({
        message: "Title and Project are required",
      });
    }

    if (!assignedTo || assignedTo.length === 0) {
      return res.status(400).json({
        message: "Assign at least one user",
      });
    }

    // Create Task
    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      dueDate,
    });

    res.status(201).json(task);

  } catch (error) {
    console.error("CREATE TASK ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


/* GET TASKS (Role-Based) */
export const getTasks = async (req, res) => {
  try {
    let query = {};

    // ROLE-BASED ACCESS
    if (req.user.role === "admin") {
      query = {}; // admin → all tasks
    } else {
      query = {
        assignedTo: { $in: [req.user._id] }, // member → only assigned
      };
    }

    const tasks = await Task.find(query)
      .populate("project", "title")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 }); // latest first

    res.json(tasks);

  } catch (error) {
    console.error("GET TASK ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


/*  UPDATE TASK STATUS */
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;


    const validStatuses = ["pending", "in-progress", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Check if user is assigned
    const isAssigned = task.assignedTo.some(
      (userId) => userId.toString() === req.user._id.toString()
    );

    // Allow: Admin OR assigned user
    if (!isAssigned && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Not allowed",
      });
    }

    task.status = status;

    const updatedTask = await task.save();

    res.json(updatedTask);

  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


/* DELETE TASK (Admin only) */
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // 🔥 Only admin can delete
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can delete tasks",
      });
    }

    await task.deleteOne();

    res.json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    console.error("DELETE TASK ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};