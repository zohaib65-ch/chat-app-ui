"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import LogoutModal from "../components/LogoutModal";
import { useAppData } from "../context/AppContext";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isAuth, user, loading } = useAppData();

  useEffect(() => {
    if (!loading && !isAuth) {
      router.push("/login");
    }
  }, [isAuth, loading, router]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setShowLogoutModal(false);
    router.push("/login");
  };

  return (
    <nav
      className="w-full h-16 px-4 md:px-6 flex items-center justify-between
  bg-gradient-to-r from-[#0a0f1a]/80 to-[#1e293b]/80
  backdrop-blur-lg border-b border-none shadow-md z-50"
    >
      <div className="text-lg font-semibold text-white hidden sm:block"></div>
      <div className="flex items-center gap-5 ml-auto">
        <button className="relative text-gray-300 hover:text-cyan-300 transition-colors duration-300 group">
          <Bell size={22} className="transition-transform duration-300 group-hover:scale-110" />
          <span
            className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500
            animate-pulse shadow-[0_0_6px_rgba(239,68,68,0.8)]"
          ></span>
        </button>
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 px-2 py-1 rounded-full
  hover:bg-white/5 transition-all duration-300 cursor-pointer select-none"
          >
            <span className="text-white text-sm font-medium hidden sm:block">{user?.name || "Unknown User"}</span>
            <div
              className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border
    flex items-center justify-center text-white font-bold shadow-lg
    hover:shadow-[0_0_10px_rgba(6,182,212,0.6)] transition-all duration-300"
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : "Z"}
            </div>
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#1e293b] border border-white/10 rounded-lg shadow-lg overflow-hidden z-1000">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  router.push("/profile");
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-white/10 transition-colors"
              >
                <User size={18} />
                Profile
              </button>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  setShowLogoutModal(true);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <LogoutModal open={showLogoutModal} onClose={() => setShowLogoutModal(false)} onConfirm={handleLogout} />
    </nav>
  );
};

export default Navbar;
