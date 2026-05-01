import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", form);

      login(data);
      navigate("/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-sm">

        {/* CARD */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-xl shadow-md p-6 space-y-5"
        >
          {/* HEADER */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Login
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Access your account
            </p>
          </div>

          {/* INPUTS */}
          <div className="space-y-3">

            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

          </div>

          {/* BUTTON */}
          <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-md text-sm transition">
            Login
          </button>

          {/* SIGNUP */}
          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <span
              className="text-gray-800 font-medium cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </p>

        </form>

      </div>
    </div>
  );
};

export default Login;