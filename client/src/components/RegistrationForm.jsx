import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../service/authServeice";

const RegistrationForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      localStorage.setItem("token", res.token);
      setForm({ name: "", email: "", password: "" });

      console.log("Registered Successfully");
    } catch (err) {
      console.log("Not registered", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-blue-600">
        Create an Account
      </h2>

      {/* Name Input */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          placeholder="John Doe"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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
        Register
      </button>

      {/* Optional Link */}
      <p className="text-sm text-center text-gray-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600 hover:underline font-medium transition duration-200"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegistrationForm;
