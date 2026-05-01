import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinkStyle = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
      location.pathname === path
        ? "bg-white text-gray-900"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* 🔷 Logo / Title */}
        <h1
          onClick={() => navigate("/dashboard")}
          className="text-xl font-bold cursor-pointer tracking-wide text-white"
        >
          Team Task Manager
        </h1>

        {/* 🔷 Navigation */}
        {user && (
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className={navLinkStyle("/dashboard")}>
              Dashboard
            </Link>

            <Link to="/projects" className={navLinkStyle("/projects")}>
              Projects
            </Link>

            <Link to="/tasks" className={navLinkStyle("/tasks")}>
              Tasks
            </Link>

            {/* 🔷 Logout Button */}
            <button
              onClick={handleLogout}
              className="ml-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;