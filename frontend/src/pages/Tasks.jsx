import { useState, useEffect } from "react";
import API from "../services/api";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    project: "",
    dueDate: "",
    assignedTo: [],
  });

  // 🔹 Fetch all data
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

  // 🔹 Create Task
  const handleCreate = async (e) => {
    e.preventDefault();

    console.log("FORM DATA:", form); // 🔥 DEBUG

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
      console.log(error);
      alert(error.response?.data?.message || "Error creating task");
    }
  };

  // 🔹 Update Status
  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      {/* ================= CREATE TASK ================= */}
      <form onSubmit={handleCreate} className="mb-6 space-y-3">

        <div className="flex gap-2 flex-wrap">

          <input
            type="text"
            placeholder="Task Title"
            className="border p-2"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Description"
            className="border p-2"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* Project */}
          <select
            className="border p-2"
            value={form.project}
            onChange={(e) =>
              setForm({ ...form, project: e.target.value })
            }
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="border p-2"
            value={form.dueDate}
            onChange={(e) =>
              setForm({ ...form, dueDate: e.target.value })
            }
          />
        </div>

        {/* ================= USERS CHECKBOX UI ================= */}
        <div className="border p-3 rounded w-72 max-h-40 overflow-y-auto">
          <p className="text-sm font-semibold mb-2">Assign Users</p>

          {users.map((u) => (
            <label
              key={u._id}
              className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                form.assignedTo.includes(u._id)
                  ? "bg-blue-100"
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

              <span>
                {u.name}{" "}
                <span className="text-gray-500 text-xs">
                  ({u.role})
                </span>
              </span>
            </label>
          ))}
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Task
        </button>
      </form>

      {/* ================= TASK LIST ================= */}
      {tasks.length === 0 && <p>No tasks found</p>}

      {tasks.map((task) => (
        <div key={task._id} className="border p-3 mb-3 rounded shadow-sm">
          <h2 className="font-bold">{task.title}</h2>
          <p>{task.description}</p>

          <p className="text-sm">
            Project: {task.project?.title}
          </p>

          <p className="text-sm">
            Assigned To:{" "}
            {task.assignedTo?.map((u) => u.name).join(", ")}
          </p>

          <p>Status: {task.status}</p>

          <div className="mt-2 flex gap-2">
            <button
              onClick={() => updateStatus(task._id, "pending")}
              className="bg-gray-500 text-white px-2 py-1"
            >
              Pending
            </button>

            <button
              onClick={() => updateStatus(task._id, "in-progress")}
              className="bg-yellow-500 text-white px-2 py-1"
            >
              In Progress
            </button>

            <button
              onClick={() => updateStatus(task._id, "completed")}
              className="bg-green-500 text-white px-2 py-1"
            >
              Completed
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;