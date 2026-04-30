import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await API.get("/dashboard");
      setStats(data);
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user?.name}
      </h1>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-500 text-white p-4 rounded">
            Total: {stats.totalTasks}
          </div>

          <div className="bg-green-500 text-white p-4 rounded">
            Completed: {stats.completedTasks}
          </div>

          <div className="bg-yellow-500 text-white p-4 rounded">
            Pending: {stats.pendingTasks}
          </div>

          <div className="bg-red-500 text-white p-4 rounded">
            Overdue: {stats.overdueTasks}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;