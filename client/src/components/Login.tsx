// src/components/Login.tsx
import React, { useState } from "react";
import { loginUser } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { loginUser: setUser } = useAuth();
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: string[] = [];

    if (!form.email.trim()) errors.push("Email is required");
    if (!form.password.trim()) errors.push("Password is required");

    // Optional: email format validation
    if (form.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email))
        errors.push("Enter a valid email address");
    }

    // If there are errors, show them and stop submission
    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    const loadingToast = toast.loading("Logging in...");
    setIsLoading(true);

    try {
      const res = await loginUser(form);
      setUser(res.data);
      navigate("/profile");
      toast.success("Login successful!");
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.status === 404) {
        toast.error("User not found");
      } else if (err.response && err.response.status === 401) {
        toast.error("Invalid password");
      } else {
        toast.error("Login failed");
      }
    } finally {
      setIsLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900 text-white p-8 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-[0_0_10px_#ffffff]"
      >
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-center text-gray-400 mb-6">
          Sign in to continue your productivity journey
        </p>

        {/* Email */}
        <label className="block mb-2 font-medium text-left">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full mb-4 p-2 text-sm rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Password */}
        <label className="block mb-2 font-medium text-left">Password</label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-2 text-sm rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        </div>

        {/* <div className="text-center mb-4">
          <a href="#" className="text-purple-400 hover:underline text-sm">
            Forgot password?
          </a>
        </div> */}

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 mb-4 mt-5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg font-bold hover:opacity-90 transition"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-purple-400 hover:underline">
            Sign up
          </a>
        </p>
      </form>
      <Toaster position="top-center" />
    </div>
  );
};

export default Login;
