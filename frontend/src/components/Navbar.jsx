import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">Team Task Manager</h1>

      {user && (
        <div className="flex gap-4 items-center">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/tasks">Tasks</Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;