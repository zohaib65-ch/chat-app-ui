import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Chat App",
  description: "Created by Zohaib",
  icons: {
    icon: "../",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0f172a] text-white">
        <ClientLayout>{children}</ClientLayout>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
