import axios from "axios";
import type { AxiosResponse } from "axios";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: "http://localhost:9000/api/auth",
  withCredentials: true, // ✅ for cookies/JWT
});

// ✅ Response interceptor for errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const msg =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";

    // Show toast automatically
    toast.error(msg);

    // Still reject so caller knows request failed
    return Promise.reject(error);
  }
);

// User type
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  token: string;
}

// Registration data
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
}

// Login data
export interface LoginData {
  email: string;
  password: string;
}

export const registerUser = (data: RegisterData): Promise<AxiosResponse<User>> =>
  API.post("/register", data);

export const loginUser = (data: LoginData): Promise<AxiosResponse<User>> =>
  API.post("/login", data);

export const getProfile = (): Promise<AxiosResponse<User>> =>
  API.get("/profile");
