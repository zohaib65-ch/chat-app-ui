"use client";

import { motion } from "framer-motion";
import { Users, MessageSquare, MonitorCheck, LogIn, LogOut, Activity, Server, Clock, Hash } from "lucide-react";

const recentActivities = [
  { user: "Zohaib", action: "Sent a message", time: "5 mins ago", icon: <MessageSquare className="w-4 h-4 text-blue-400" /> },
  { user: "Sultan", action: "Joined room #42", time: "10 mins ago", icon: <Users className="w-4 h-4 text-green-400" /> },
  { user: "Ali", action: "Logged in", time: "20 mins ago", icon: <LogIn className="w-4 h-4 text-yellow-400" /> },
  { user: "Salman", action: "Left room #3", time: "1 hour ago", icon: <LogOut className="w-4 h-4 text-red-400" /> },
];

const topRooms = [
  { name: "Room #42", members: 124 },
  { name: "Room #17", members: 98 },
  { name: "Room #3", members: 75 },
  { name: "Room #99", members: 62 },
];

const stats = [
  { title: "Total Users", value: "1,204", icon: <Users className="w-6 h-6 text-blue-300" />, gradient: "from-blue-500/30 to-blue-900/30" },
  { title: "Messages Sent", value: "45,230", icon: <MessageSquare className="w-6 h-6 text-green-300" />, gradient: "from-green-500/30 to-emerald-900/30" },
  { title: "Active Rooms", value: "87", icon: <MonitorCheck className="w-6 h-6 text-purple-300" />, gradient: "from-purple-500/30 to-indigo-900/30" },
  { title: "New Signups", value: "320", icon: <Activity className="w-6 h-6 text-pink-300" />, gradient: "from-pink-500/30 to-rose-900/30" },
  { title: "Avg. Session", value: "15m", icon: <Clock className="w-6 h-6 text-yellow-300" />, gradient: "from-yellow-500/30 to-amber-900/30" },
  { title: "Server Status", value: "Online", icon: <Server className="w-6 h-6 text-teal-300" />, gradient: "from-teal-500/30 to-cyan-900/30" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen  text-white p-6 space-y-12">
      {/* Header */}
      <motion.div
        className="rounded-3xl p-8 bg-gradient-to-r from-indigo-800/70 via-purple-800/50 to-pink-700/50 backdrop-blur-lg "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-extrabold tracking-tight">Welcome Back, Zohaib 👋</h1>
        <p className="text-gray-300 mt-3 text-lg">Here’s the latest update on your platform.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            className={`rounded-2xl p-6 bg-gradient-to-br ${stat.gradient} border border-white/10 backdrop-blur-lg shadow-lg hover:shadow-2xl hover:border-white/20 transition-all`}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">{stat.title}</p>
                <h2 className="text-3xl font-bold mt-1">{stat.value}</h2>
              </div>
              <div className="p-3 bg-white/10 rounded-full">{stat.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
          <ul className="space-y-4">
            {recentActivities.map((item, idx) => (
              <motion.li
                key={idx}
                className="flex items-center gap-4 bg-white/5 p-4 rounded-xl hover:bg-white/10 transition"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">{item.user.charAt(0)}</div>
                <div className="flex-1">
                  <p className="font-medium">{item.user}</p>
                  <p className="text-sm text-gray-400">{item.action}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  {item.icon}
                  <span>{item.time}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Top Active Rooms */}
        <motion.div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-semibold mb-6">Top Active Rooms</h2>
          <ul className="space-y-4">
            {topRooms.map((room, idx) => (
              <motion.li
                key={idx}
                className="flex items-center justify-between bg-white/5 p-4 rounded-xl hover:bg-white/10 transition"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold">
                    <Hash className="w-5 h-5" />
                  </div>
                  <p className="font-medium">{room.name}</p>
                </div>
                <span className="text-sm text-gray-300">{room.members} members</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
