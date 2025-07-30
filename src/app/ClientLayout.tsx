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
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
