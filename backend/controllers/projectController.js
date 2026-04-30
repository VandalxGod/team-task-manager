import Project from "../models/Project.js";


// ✅ Create Project (Admin only)
export const createProject = async (req, res) => {
  try {
    const { title, description, members } = req.body;

    const project = await Project.create({
      title,
      description,
      createdBy: req.user._id,
      members,
    });

    res.status(201).json(project);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Get All Projects (User related)
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { createdBy: req.user._id },
        { members: req.user._id },
      ],
    }).populate("createdBy members", "name email");

    res.json(projects);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};