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
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome, {user?.name}
            </h1>

            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                user?.role === "admin"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {user?.role === "admin" ? "Admin" : "Member"}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            Overview of your tasks and activity
          </p>
        </div>

        {/* Stats Section */}
        {!stats ? (
          <div className="text-center text-gray-400 py-12">
            Loading dashboard...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">

            {/* Total Tasks */}
            <div
              onClick={() => navigate("/tasks/all")}
              className="cursor-pointer bg-white border border-gray-200 rounded-lg p-5 shadow-sm 
              hover:bg-blue-50 hover:border-blue-200 
              active:scale-[0.97]
              hover:shadow-md hover:-translate-y-[2px] transition-all duration-200"
            >
              <p className="text-sm text-gray-500">Total Tasks</p>
              <h2 className="text-2xl font-semibold text-gray-800 mt-2">
                {stats.totalTasks}
              </h2>
            </div>

            {/* Completed */}
            <div
              onClick={() => navigate("/tasks/completed")}
              className="cursor-pointer bg-white border border-gray-200 rounded-lg p-5 shadow-sm 
              hover:bg-green-50 hover:border-green-200 
              active:scale-[0.97]
              hover:shadow-md hover:-translate-y-[2px] transition-all duration-200"
            >
              <p className="text-sm text-gray-500">Completed</p>
              <h2 className="text-2xl font-semibold text-gray-800 mt-2">
                {stats.completedTasks}
              </h2>
            </div>

            {/* Pending */}
            <div
              onClick={() => navigate("/tasks/pending")}
              className="cursor-pointer bg-white border border-gray-200 rounded-lg p-5 shadow-sm 
              hover:bg-yellow-50 hover:border-yellow-200 
              active:scale-[0.97]
              hover:shadow-md hover:-translate-y-[2px] transition-all duration-200"
            >
              <p className="text-sm text-gray-500">Pending</p>
              <h2 className="text-2xl font-semibold text-gray-800 mt-2">
                {stats.pendingTasks}
              </h2>
            </div>

            {/* Overdue */}
            <div
              onClick={() => navigate("/tasks/overdue")}
              className="cursor-pointer bg-white border border-gray-200 rounded-lg p-5 shadow-sm 
              hover:bg-red-50 hover:border-red-200 
              active:scale-[0.97]
              hover:shadow-md hover:-translate-y-[2px] transition-all duration-200"
            >
              <p className="text-sm text-gray-500">Overdue</p>
              <h2 className="text-2xl font-semibold text-gray-800 mt-2">
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