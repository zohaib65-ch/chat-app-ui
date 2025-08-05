"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar/page";
import Navbar from "./navbar/page";

const authRoutes = ["/login", "/verify", "/forgot-password"];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = authRoutes.includes(pathname);

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar  />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-y-auto  bg-gradient-to-br from-[#0f172a] via-[#0b1120] to-[#0a0f1a]">
          {children}
        </main>
      </div>
    </div>
  );
}
