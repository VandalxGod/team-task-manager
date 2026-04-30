import Task from "../models/Task.js";


// ================= CREATE TASK =================
export const createTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, dueDate } = req.body;

    // 🔹 Validation
    if (!title || !project) {
      return res.status(400).json({ message: "Title and Project are required" });
    }

    if (!assignedTo || assignedTo.length === 0) {
      return res.status(400).json({ message: "Assign at least one user" });
    }

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



// ================= GET TASKS =================
export const getTasks = async (req, res) => {
  try {
    let query = {};

    // 🔥 ROLE-BASED LOGIC
    if (req.user.role === "admin") {
      // Admin sees all tasks
      query = {};
    } else {
      // Member sees only assigned tasks
      query = {
        assignedTo: { $in: [req.user._id] },
      };
    }

    const tasks = await Task.find(query)
      .populate("project", "title")
      .populate("assignedTo", "name email");

    res.json(tasks);

  } catch (error) {
    console.error("GET TASK ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};



// ================= UPDATE TASK STATUS =================
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // 🔹 Validation
    const validStatuses = ["pending", "in-progress", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔥 MULTI-USER CHECK
    const isAssigned = task.assignedTo.some(
      (userId) => userId.toString() === req.user._id.toString()
    );

    // 🔥 Admin OR Assigned user can update
    if (!isAssigned && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.status = status;

    const updatedTask = await task.save();

    res.json(updatedTask);

  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};