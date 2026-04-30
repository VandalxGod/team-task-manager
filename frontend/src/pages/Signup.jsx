import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);

      alert("Signup successful ✅");
      navigate("/");

    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="p-6 shadow-lg rounded-lg w-80 bg-white"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4 text-center">Signup</h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* Role */}
        <select
          className="w-full mb-3 p-2 border rounded"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        {/* Button */}
        <button className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded">
          Signup
        </button>

        {/* 🔥 ADD THIS NAVIGATION */}
        <p className="mt-3 text-sm text-center">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;