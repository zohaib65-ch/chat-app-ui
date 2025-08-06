"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, MessageCircle, Settings, LogOut, User, MessageCircleMore } from "lucide-react";
import LogoutModal from "../components/LogoutModal";
import { useAppData } from "../context/AppContext";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Chat", href: "/chat", icon: MessageCircle },
  { name: "Profile", href: "/profile", icon: User },
];

const Sidebar = () => {
  const { isAuth, loading } = useAppData();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuth) {
      router.push("/login");
      
    }
  }, [isAuth, loading, router]);
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setShowLogoutModal(false);
    router.push("/login");
  };

  return (
    <aside
      className="w-64 hidden lg:flex flex-col justify-between h-screen px-4 py-6
      bg-gradient-to-b from-[#0a0f1a] to-[#1e293b] border-r border-none
      shadow-[0_0_15px_rgba(0,0,0,0.6)]"
    >
      <div>
        <h2 className="flex items-center justify-center gap-2 text-2xl font-medium mb-10 tracking-wide">
          <MessageCircleMore className="w-6 h-6 text-gray-400" />
          <span className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-500 bg-clip-text text-transparent">LET'S CHAT</span>
        </h2>

        <nav className="space-y-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 mb-5 rounded-xl cursor-pointer
                    transition-all duration-300 group relative
                    ${isActive ? "bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-400/40 shadow-[0_0_10px_rgba(34,211,238,0.4)]" : "hover:bg-white/5"}`}
                >
                  <item.icon
                    className={`w-5 h-5 transition-all duration-300 group-hover:scale-110
                      ${isActive ? "text-gray-300 drop-shadow-[0_0_4px_rgba(34,211,238,0.8)]" : "text-gray-400 group-hover:text-gray-300"}`}
                  />
                  <span
                    className={`font-medium transition-colors duration-300
                      ${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}`}
                  >
                    {item.name}
                  </span>
                  {isActive && <span className="absolute left-0 top-0 w-1 h-full bg-gray-500 rounded-r-lg shadow-[0_0_6px_rgba(34,211,238,0.9)]" />}
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

        <LogoutModal open={showLogoutModal} onClose={() => setShowLogoutModal(false)} onConfirm={handleLogout} />
      </div>
    </aside>
  );
};

export default Sidebar;
