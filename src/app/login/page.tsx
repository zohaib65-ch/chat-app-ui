"use client";

import React, { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axiosWrapper from "@/lib/axiosWrapper";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axiosWrapper.post(`/login`, { email });

      const userData = {
        name: data.user?.name || email.split("@")[0].substring(0, 7),
        email: data.user?.email || email,
        memberSince: data.user?.memberSince || new Date().toLocaleString("default", { month: "long", year: "numeric" }),
      };

      dispatch(setUser(userData));
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success(data.message);
      router.push(`/verify?email=${email}`);
    } catch (error: any) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="w-full max-w-md bg-[#1e293b] rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-white">Chat App</h1>
          <p className="text-sm text-gray-400 mt-2">Enter your email to receive a verification code</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#334155] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Sending...
              </>
            ) : (
              "Send Verification Code"
            )}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-400">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
