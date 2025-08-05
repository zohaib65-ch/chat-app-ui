"use client";

import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { name, email, memberSince } = useSelector((state: any) => state.user);
  console.log(useSelector((state: any) => state.user));
  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-3xl mx-auto bg-[#1e293b] p-8 rounded-2xl shadow-lg border border-white/10">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xl font-bold shadow-lg">
            {email ? email.substring(0, 1).toUpperCase() : "USER"}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{name || "Unknown User"}</h2>
            <p className="text-gray-400">{email || "No Email"}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400">Username</p>
            <p className="font-medium">{name || "Unknown"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="font-medium">{email || "No Email"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Member Since</p>
            <p className="font-medium">{memberSince || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
