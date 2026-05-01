import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await API.get("/dashboard");
      setStats(data);
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">

      <div className="max-w-6xl mx-auto space-y-8">

        {/* Welcome Section */}
        <div className="backdrop-blur-lg bg-white/60 border border-gray-200/60 p-6 rounded-xl shadow-sm">

          {/* TOP ROW */}
          <div className="flex justify-between items-center">

            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome, {user?.name}
            </h1>

            {/* ✅ ROLE BADGE */}
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                user?.role === "admin"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {user?.role === "admin" ? "Admin" : "Member"}
            </span>

          </div>

          <p className="text-sm text-gray-600 mt-2">
            Here's an overview of your tasks and progress.
          </p>
        </div>

        {/* 🔷 Stats Section */}
        {!stats ? (
          <div className="text-center text-gray-400 py-12">
            Loading dashboard...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

            {/* Total Tasks */}
            <div
              onClick={() => navigate("/tasks/all")}
              className="cursor-pointer backdrop-blur-md bg-gradient-to-r from-blue-500/90 to-blue-600/90 text-white p-5 rounded-xl shadow-sm border border-white/20 hover:scale-[1.05] hover:shadow-lg transition-all duration-200"
            >
              <p className="text-sm opacity-90">Total Tasks</p>
              <h2 className="text-2xl font-semibold mt-2">
                {stats.totalTasks}
              </h2>
            </div>

            {/* Completed */}
            <div
              onClick={() => navigate("/tasks/completed")}
              className="cursor-pointer backdrop-blur-md bg-gradient-to-r from-green-500/90 to-green-600/90 text-white p-5 rounded-xl shadow-sm border border-white/20 hover:scale-[1.05] hover:shadow-lg transition-all duration-200"
            >
              <p className="text-sm opacity-90">Completed</p>
              <h2 className="text-2xl font-semibold mt-2">
                {stats.completedTasks}
              </h2>
            </div>

            {/* Pending */}
            <div
              onClick={() => navigate("/tasks/pending")}
              className="cursor-pointer backdrop-blur-md bg-gradient-to-r from-yellow-400/90 to-yellow-500/90 text-white p-5 rounded-xl shadow-sm border border-white/20 hover:scale-[1.05] hover:shadow-lg transition-all duration-200"
            >
              <p className="text-sm opacity-90">Pending</p>
              <h2 className="text-2xl font-semibold mt-2">
                {stats.pendingTasks}
              </h2>
            </div>

            {/* Overdue */}
            <div
              onClick={() => navigate("/tasks/overdue")}
              className="cursor-pointer backdrop-blur-md bg-gradient-to-r from-red-500/90 to-red-600/90 text-white p-5 rounded-xl shadow-sm border border-white/20 hover:scale-[1.05] hover:shadow-lg transition-all duration-200"
            >
              <p className="text-sm opacity-90">Overdue</p>
              <h2 className="text-2xl font-semibold mt-2">
                {stats.overdueTasks}
              </h2>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;