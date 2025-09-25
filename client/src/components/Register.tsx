import { useState } from "react";
import type { FormEvent } from "react";
import type { ChangeEvent } from "react";
import { registerUser } from "../api/api";
import type { RegisterData } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const { loginUser } = useAuth();
  const [form, setForm] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Registering...");
    setIsLoading(true);

    try {
      const res = await registerUser(form);
      loginUser(res.data); // set user and token
      toast.success("Registration successful!");
      navigate("/");
    } catch (err: any) {
      console.error(err);
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
        <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-center text-gray-400 mb-6">
          Sign up to start your journey
        </p>

        {/* Name */}
        <label className="block mb-2 font-medium text-left">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full mb-4 p-2 text-sm rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

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

        {/* Phone */}
        <label className="block mb-2 font-medium text-left">
          Phone{" "}
          <span className="text-gray-400 text-sm opacity-30">(optional)</span>
        </label>
        <input
          type="number"
          name="phone"
          value={form.phone}
          onChange={(e) => {
            // Allow only digits and max 10 characters
            const value = e.target.value.replace(/\D/g, "").slice(0, 10);
            setForm({ ...form, phone: value });
          }}
          placeholder="Enter your phone number"
          maxLength={10}
          className="w-full mb-4 p-2 text-sm rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Address */}
        <label className="block mb-2 font-medium text-left">
          Address{" "}
          <span className="text-gray-400 text-sm opacity-30">(optional)</span>
        </label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Enter your address"
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

        {/* Submit */}
        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="px-10 py-3 mb-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg font-bold hover:opacity-90 transition"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </div>

        <p className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-purple-400 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
      <Toaster position="top-center" />
    </div>
  );
};

export default Register;
