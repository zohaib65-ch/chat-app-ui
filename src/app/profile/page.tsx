"use client";

import React, { useEffect, useState } from "react";
import { useAppData } from "../context/AppContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axiosWrapper from "@/lib/axiosWrapper";

const ProfilePage = () => {
  const { user, setUser, isAuth, loading } = useAppData();
  const router = useRouter();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!loading && !isAuth) {
      toast.error("Please login first");
      router.push("/login");
    }
  }, [isAuth, loading, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuth) return;

      try {
        setFetching(true);
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Token not found, please login again");
          router.push("/login");
          return;
        }

        const { data } = await axiosWrapper.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formattedUser = {
          ...data,
          memberSince: data.createdAt
            ? new Date(data.createdAt).toLocaleString("default", { month: "long", year: "numeric" })
            : "N/A",
        };

        setUser(formattedUser);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, [isAuth, setUser, router]);

  if (loading || fetching) {
    return <p className="text-white p-6">Loading profile...</p>;
  }

  return (
    <div className=" text-white p-6">
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-lg border border-white/10">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border flex items-center justify-center text-xl font-bold shadow-lg">
            {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user?.name || "Unknown User"}</h2>
            <p className="text-gray-400">{user?.email || "No Email"}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400">Username</p>
            <p className="font-medium">{user?.name || "Unknown"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="font-medium">{user?.email || "No Email"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Member Since</p>
            <p className="font-medium">{user?.memberSince || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
