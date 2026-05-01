import Project from "../models/Project.js";


// CREATE PROJECT
// Admin only
export const createProject = async (req, res) => {
  try {
    const { title, description, members } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({ message: "Project title is required" });
    }

    const project = await Project.create({
      title,
      description,
      createdBy: req.user._id,
      members: members || [],
    });

    res.status(201).json(project);

  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};



// GET PROJECTS
// Admin → all projects
// Member → only assigned / created
export const getProjects = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "admin") {
      // Admin sees all
      query = {};
    } else {
      // Member sees only related
      query = {
        $or: [
          { createdBy: req.user._id },
          { members: req.user._id },
        ],
      };
    }

    const projects = await Project.find(query)
      .populate("createdBy", "name email")
      .populate("members", "name email");

    res.json(projects);

  } catch (error) {
    console.error("GET PROJECT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};



// DELETE PROJECT 
// Admin only
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Extra safety (optional but good)
    if (
      req.user.role !== "admin" &&
      project.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await project.deleteOne();

    res.json({ message: "Project deleted successfully" });

  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};