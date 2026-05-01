import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import API from "../services/api";

const TaskStatus = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");

      let filtered = data;

      // STATUS FILTER
      if (type === "completed") {
        filtered = data.filter((t) => t.status === "completed");
      } else if (type === "pending") {
        filtered = data.filter((t) => t.status === "pending");
      } else if (type === "overdue") {
        const today = new Date();
        filtered = data.filter(
          (t) =>
            new Date(t.dueDate) < today &&
            t.status !== "completed"
        );
      }

      // ROLE-BASED FILTER (IMPORTANT)
      if (user?.role !== "admin") {
        filtered = filtered.filter((task) =>
          task.assignedTo?.some((u) => u._id === user._id)
        );
      }

      setTasks(filtered);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [type, user]);

  const getTitle = () => {
    if (type === "completed") return "Completed Tasks";
    if (type === "pending") return "Pending Tasks";
    if (type === "overdue") return "Overdue Tasks";
    return "All Tasks";
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

      {/* 🔷 Header + Back */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">
          {/* 🔙 Back Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="px-3 py-1.5 text-sm border rounded-md bg-white hover:bg-gray-100 transition"
          >
            ← Back
          </button>

          {/* Title */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {getTitle()}
            </h1>

            <p className="text-sm text-gray-500">
              {user?.role === "admin"
                ? "Viewing all tasks"
                : "Viewing your assigned tasks"}
            </p>
          </div>
        </div>
      </div>

      {/* 🔷 Task List */}
      {tasks.length === 0 ? (
        <div className="text-center text-gray-400 py-16">
          No tasks found
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-start shadow-sm hover:shadow-md transition"
            >
              {/* Left */}
              <div className="space-y-1">
                <h2 className="font-medium text-gray-800">
                  {task.title}
                </h2>

                <p className="text-sm text-gray-500">
                  {task.description}
                </p>

                <p className="text-xs text-gray-400">
                  {task.project?.title}
                </p>

                <p className="text-xs text-gray-400">
                  Assigned:{" "}
                  {task.assignedTo?.map((u) => u.name).join(", ")}
                </p>
              </div>

              {/* Right */}
              <span
                className={`text-xs px-3 py-1 rounded-md ${
                  task.status === "completed"
                    ? "bg-green-100 text-green-600"
                    : task.status === "pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {task.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskStatus;