"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, MessageCircle, Settings, LogOut, User } from "lucide-react";
import LogoutModal from "../components/LogoutModal";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Messages", href: "/messages", icon: MessageCircle },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Profile", href: "/profile", icon: User }, // ✅ Profile added here
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setShowLogoutModal(false);
    router.push("/login");
  };

  return (
    <aside
      className="w-64 hidden lg:flex flex-col justify-between h-screen px-4 py-8
      bg-gradient-to-b from-[#0a0f1a] to-[#1e293b] border-r border-none
      shadow-[0_0_15px_rgba(0,0,0,0.6)]"
    >
      <div>
        <h2
          className="text-2xl font-extrabold mb-10 tracking-wide text-center
          bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          CHAT APP
        </h2>
        <nav className="space-y-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                    transition-all duration-300 group relative
                    ${isActive ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 shadow-[0_0_10px_rgba(34,211,238,0.4)]" : "hover:bg-white/5"}`}
                >
                  <item.icon
                    className={`w-5 h-5 transition-all duration-300 group-hover:scale-110
                      ${isActive ? "text-cyan-300 drop-shadow-[0_0_4px_rgba(34,211,238,0.8)]" : "text-gray-400 group-hover:text-cyan-300"}`}
                  />
                  <span
                    className={`font-medium transition-colors duration-300
                      ${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}`}
                  >
                    {item.name}
                  </span>
                  {isActive && (
                    <span className="absolute left-0 top-0 w-1 h-full bg-cyan-400 rounded-r-lg shadow-[0_0_6px_rgba(34,211,238,0.9)]" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-6">
        <div
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
            transition-all duration-300 text-red-400 hover:text-white
            hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20
            border border-transparent hover:border-red-400/30
            shadow-[inset_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_10px_rgba(239,68,68,0.4)]"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </div>

        <LogoutModal
          open={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
