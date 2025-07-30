"use client";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

import { Users, MessageSquare, MonitorCheck } from "lucide-react";

const recentActivities = [
  { user: "Zohaib", action: "Sent a message", time: "5 mins ago" },
  { user: "Ayesha", action: "Joined room #42", time: "10 mins ago" },
  { user: "Ali", action: "Logged in", time: "20 mins ago" },
  { user: "Fatima", action: "Left room #3", time: "1 hour ago" },
];

const stats = [
  {
    title: "Total Users",
    value: "1,204",
    icon: <Users className="w-6 h-6 text-white" />,
    bg: "bg-blue-600",
  },
  {
    title: "Messages Sent",
    value: "45,230",
    icon: <MessageSquare className="w-6 h-6 text-white" />,
    bg: "bg-green-600",
  },
  {
    title: "Active Rooms",
    value: "87",
    icon: <MonitorCheck className="w-6 h-6 text-white" />,
    bg: "bg-purple-600",
  },
];

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 space-y-10">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-800 rounded-2xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold">Welcome Back, Zohaib 👋</h1>
        <p className="text-gray-300 mt-2">Here's a quick overview of your chat platform.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#1e293b] rounded-2xl p-5 shadow-lg flex items-center space-x-4">
            <div className={`p-3 rounded-full ${stat.bg}`}>{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-400">{stat.title}</p>
              <h2 className="text-2xl font-bold">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-[#1e293b] p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivities.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.user}</TableCell>
                <TableCell>{item.action}</TableCell>
                <TableCell>{item.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardPage;
