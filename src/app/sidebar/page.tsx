"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, MessageCircle, Settings, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import LogoutModal from "../components/LogoutModal";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Messages", href: "/messages", icon: MessageCircle },
  { name: "Settings", href: "/settings", icon: Settings },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // Your logout logic (clear token, reset state, etc.)
    localStorage.clear(); // optional
    console.log("Logged out");

    setShowLogoutModal(false);
    router.push("/login"); // ✅ Redirect to /login
  };

  return (
    <aside className="w-64 bg-[#1e293b] text-white hidden lg:flex flex-col justify-between h-screen px-6 py-8">
      <div>
        <h2 className="text-3xl font-bold mb-12 tracking-wide">Chat App</h2>

        <nav className="space-y-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={`w-full justify-start gap-3 px-4 py-4 mb-3 text-base font-medium rounded-xl transition ${
                        isActive
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-sm">
                  {item.name}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </div>

      <div className="mt-12">
        <Separator className="mb-4 bg-gray-700" />
        <Button
          variant="ghost"
          onClick={() => setShowLogoutModal(true)}
          className="w-full justify-start text-red-400 hover:text-red-300 gap-3 px-4 py-3 rounded-xl text-base"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>

        <LogoutModal
          open={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout} // 👈 handles logout + redirect
        />
      </div>
    </aside>
  );
};

export default Sidebar;
