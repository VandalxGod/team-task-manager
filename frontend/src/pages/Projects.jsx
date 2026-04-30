import { useState, useEffect } from "react";
import API from "../services/api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Create project
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await API.post("/projects", {
        title,
        description,
        members: [],
      });

      setTitle("");
      setDescription("");
      fetchProjects();

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      {/* Create Project */}
      <form onSubmit={handleCreate} className="mb-6">
        <input
          type="text"
          placeholder="Project Title"
          className="border p-2 mr-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          className="border p-2 mr-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-3 py-2">
          Create
        </button>
      </form>

      {/* Project List */}
      <div>
        {projects.map((project) => (
          <div
            key={project._id}
            className="border p-3 mb-2 rounded"
          >
            <h2 className="font-bold">{project.title}</h2>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;