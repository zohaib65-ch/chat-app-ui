"use client";

import { motion } from "framer-motion";
import { Users, MessageSquare, Clock, Hash, Smile } from "lucide-react";
import { useEffect } from "react";
import { useAppData } from "../context/AppContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const recentActivities = [
  { user: "Zohaib", action: "Sent a message", time: "5 mins ago", icon: <MessageSquare className="w-4 h-4 text-white" /> },
  { user: "Sultan", action: "Joined room #42", time: "10 mins ago", icon: <Users className="w-4 h-4 text-white" /> },
];

const topRooms = [
  { name: "Room #42", members: 124 },
  { name: "Room #17", members: 98 },
];

const stats = [
  { title: "Total Users", value: "1,204", icon: <Users className="w-6 h-6 text-white" />, gradient: "from-gray-800 to-gray-900 " },
  { title: "Messages Sent", value: "45,230", icon: <MessageSquare className="w-6 h-6 text-white" />, gradient: "from-gray-800 to-gray-900 " },
  { title: "Avg. Session", value: "15m", icon: <Clock className="w-6 h-6 text-white" />, gradient: "from-gray-800 to-gray-900 " },
];

export default function DashboardPage() {
  const { isAuth, loading } = useAppData();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuth) {
      router.push("/login");
    }
  }, [isAuth, loading, router]);

  return (
    <div className="h-[90vh]  text-white p-6 space-y-12">
      <motion.div className="rounded-3xl mb-10 p-8 bg-gradient-to-r from-gray-800 to-gray-900 backdrop-blur-lg " initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-medium tracking-tight flex items-center gap-2">
          Welcome Back, Zohaib
          <Smile className="w-8 h-8 " />
        </h1>

        <p className="text-gray-300 mt-3 text-lg">Here’s the latest update on your platform.</p>
      </motion.div>
      <div className="grid grid-cols-1 mb-10 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="p-3 from-gray-800 to-gray-900 border border-gray-600 rounded-full">{stat.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="bg-gradient-to-br  from-gray-800 to-gray-900 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
          <ul className="space-y-4">
            {recentActivities.map((item, idx) => (
              <motion.li
                key={idx}
                className="flex items-center gap-4 bg-gradient-to-br  from-gray-800 to-gray-900 border border-gray-600 p-4 rounded-xl hover:bg-white/10 transition"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 flex items-center justify-center text-white font-bold">
                  {item.user.charAt(0)}
                </div>
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

        <motion.div
          className="bg-gradient-to-br  from-gray-800 to-gray-900backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-semibold mb-6">Top Active Rooms</h2>
          <ul className="space-y-4">
            {topRooms.map((room, idx) => (
              <motion.li
                key={idx}
                className="flex items-center justify-between bg-gradient-to-br  from-gray-800 to-gray-900 border border-gray-600  p-4 rounded-xl hover:bg-white/10 transition"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 flex items-center justify-center text-white font-bold">
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
