// src/components/Header.tsx
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logoutUser } = useAuth() as any;

  return (
    <header className="flex items-center justify-between bg-gray-700 p-5 shadow-md">
      <h1 className="text-2xl sm:text-3xl font-bold text-white">
        Welcome,{" "}
        <span className="text-purple-400">{user?.name || "User"}</span>!
      </h1>
      <button
        onClick={logoutUser}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
