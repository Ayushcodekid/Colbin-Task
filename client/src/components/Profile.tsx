import { useEffect, useState } from "react";
import { getProfile } from "../api/api";
import type { User } from "../api/api";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import Header from "./Header";

const Profile = () => {
  const { user } = useAuth();  
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const res = await getProfile();
        setProfile(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch profile");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (!profile) return <div className="text-center mt-10">No profile data</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto p-6">

        {/* Main Profile Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          User Details
        </h1>
          <div className="flex flex-col lg:flex-col gap-8">
            {/* Left side - Avatar and basic info */}
            <div className="flex flex-row items-start">
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-white text-2xl font-medium mb-4">
                {profile.name.charAt(0)}
              </div>
              <div className="flex flex-col ml-6 gap-3 mt-3">
                <h2 className="text-xl font-medium text-gray-800 mb-1">
                  {profile.name}
                </h2>
                <p className="text-gray-500 text-sm">{profile.email}</p>
              </div>
            </div>

            {/* Right side - User details in form layout */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  User ID
                </label>
                <div className="text-gray-800 bg-gray-50 px-4 py-3 rounded border">
                  {profile._id}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Name
                </label>
                <div className="text-gray-800 bg-gray-50 px-4 py-3 rounded border">
                  {profile.name}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Email ID
                </label>
                <div className="text-gray-800 bg-gray-50 px-4 py-3 rounded border">
                  {profile.email}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Address
                </label>
                <div className="text-gray-800 bg-gray-50 px-4 py-3 rounded border">
                  {profile?.address || "N/A"}
                </div>
              </div>

              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Phone
                </label>
                <div className="text-gray-800 bg-gray-50 px-4 py-3 rounded border">
                  {profile.phone || "N/A"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Profile;
