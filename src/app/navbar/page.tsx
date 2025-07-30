"use client";

import React from "react";
import { Bell } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full h-16 bg-[#1e293b] border-gray-700 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4 ml-auto">
        <button className="relative text-gray-300 hover:text-white">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-white text-sm font-medium hidden sm:block">Zohaib</span>
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">Z</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
