import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../service/authServeice";


const LoginForm = () => {

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);;
      localStorage.setItem("token", res.token);
      setForm({ email: "", password: "" })
      
      console.log("Login Successful");

      navigate("/dashboard")
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>

      {/* Email Input */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          placeholder="you@example.com"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Password Input */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          placeholder="••••••••"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
      >
        Login
      </button>

      {/* Optional Link */}
      <p className="text-sm text-center text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:underline font-medium transition duration-200"
        >
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
