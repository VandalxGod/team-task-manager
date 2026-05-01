import { useState, useEffect } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext"; 

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useAuth(); 

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this project?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/projects/${id}`);
      fetchProjects();
    } catch (error) {
      alert("Error deleting project");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Projects
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Create and manage your projects
        </p>
      </div>

      {/* CREATE PROJECT */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        <form onSubmit={handleCreate} className="space-y-4">

          <div className="grid md:grid-cols-3 gap-3">

            <input
              type="text"
              placeholder="Project title"
              className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Description"
              className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button className="bg-gray-800 hover:bg-gray-900 text-white text-sm px-4 py-2 rounded-md">
              Create Project
            </button>

          </div>

        </form>
      </div>

      {/* PROJECT LIST */}
      {projects.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          No projects yet
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white border border-gray-300 rounded-xl p-5 shadow-md hover:shadow-lg hover:-translate-y-[2px] transition-all duration-200"
            >
              <div className="flex justify-between items-start gap-4">

                <div className="flex-1">
                  <h2 className="font-semibold text-gray-800 text-lg">
                    {project.title}
                  </h2>

                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {project.description || "No description"}
                  </p>
                </div>

                {/* ADMIN ONLY DELETE BUTTON */}
                {user?.role === "admin" && (
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-xs px-3 py-1 rounded border border-gray-300 text-black bg-white transition-all duration-200 hover:bg-red-500 hover:text-white hover:border-red-500"
                  >
                    Delete
                  </button>
                )}

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;