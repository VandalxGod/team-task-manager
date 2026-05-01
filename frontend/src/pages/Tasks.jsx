import { useState, useEffect } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext"; 

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const { user } = useAuth(); 

  const [form, setForm] = useState({
    title: "",
    description: "",
    project: "",
    dueDate: "",
    assignedTo: [],
  });

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");
    setTasks(data);
  };

  const fetchProjects = async () => {
    const { data } = await API.get("/projects");
    setProjects(data);
  };

  const fetchUsers = async () => {
    const { data } = await API.get("/users");
    setUsers(data);
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!form.title || !form.project) {
      alert("Please fill required fields");
      return;
    }

    if (form.assignedTo.length === 0) {
      alert("Select at least one user");
      return;
    }

    try {
      await API.post("/tasks", form);

      setForm({
        title: "",
        description: "",
        project: "",
        dueDate: "",
        assignedTo: [],
      });

      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating task");
    }
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this task?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      alert("Error deleting task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">

      <div className="max-w-6xl mx-auto space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Tasks</h1>
          <p className="text-sm text-gray-500">
            Create and manage your tasks efficiently
          </p>
        </div>

        {/* CREATE TASK */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">

          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Create New Task
          </h2>

          <form onSubmit={handleCreate} className="space-y-4">

            <div className="grid md:grid-cols-4 gap-4">

              <input
                type="text"
                placeholder="Task title"
                className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-400 outline-none"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Description"
                className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-400 outline-none"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <select
                className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-400 outline-none"
                value={form.project}
                onChange={(e) =>
                  setForm({ ...form, project: e.target.value })
                }
              >
                <option value="">Select project</option>
                {projects.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.title}
                  </option>
                ))}
              </select>

              <input
                type="date"
                className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-400 outline-none"
                value={form.dueDate}
                onChange={(e) =>
                  setForm({ ...form, dueDate: e.target.value })
                }
              />
            </div>

            {/* USERS */}
            <div className="border rounded-md p-4 bg-gray-50">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Assign Users
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {users.map((u) => (
                  <label
                    key={u._id}
                    className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer text-sm transition ${
                      form.assignedTo.includes(u._id)
                        ? "bg-gray-200"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={form.assignedTo.includes(u._id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setForm((prev) => ({
                            ...prev,
                            assignedTo: [...prev.assignedTo, u._id],
                          }));
                        } else {
                          setForm((prev) => ({
                            ...prev,
                            assignedTo: prev.assignedTo.filter(
                              (id) => id !== u._id
                            ),
                          }));
                        }
                      }}
                    />
                    {u.name}
                  </label>
                ))}
              </div>
            </div>

            <button className="bg-gray-800 hover:bg-gray-900 text-white text-sm px-6 py-2 rounded-md shadow-sm transition">
              Create Task
            </button>

          </form>
        </div>

        {/* TASK LIST */}
        {tasks.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            No tasks available
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-lg hover:-translate-y-[2px] transition-all"
              >
                <div className="flex justify-between items-start">

                  <div className="space-y-1">
                    <h2 className="font-medium text-gray-800">
                      {task.title}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {task.description}
                    </p>

                    <p className="text-xs text-gray-400">
                      Project: {task.project?.title}
                    </p>

                    <p className="text-xs text-gray-400">
                      Assigned: {task.assignedTo?.map((u) => u.name).join(", ")}
                    </p>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-md font-medium ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : task.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">

                  <button
                    onClick={() => updateStatus(task._id, "pending")}
                    className="text-xs px-3 py-1 border rounded hover:bg-gray-100 transition"
                  >
                    Pending
                  </button>

                  <button
                    onClick={() => updateStatus(task._id, "in-progress")}
                    className="text-xs px-3 py-1 border rounded hover:bg-yellow-50 transition"
                  >
                    In Progress
                  </button>

                  <button
                    onClick={() => updateStatus(task._id, "completed")}
                    className="text-xs px-3 py-1 border rounded hover:bg-green-50 transition"
                  >
                    Completed
                  </button>

                  {/* ADMIN ONLY DELETE */}
                  {user?.role === "admin" && (
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="text-xs px-3 py-1 rounded border border-gray-300 text-black bg-white ml-auto transition-all duration-200 hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-sm"
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
    </div>
  );
};

export default Tasks;