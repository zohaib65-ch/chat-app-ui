"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import axiosWrapper from "@/lib/axiosWrapper";
import { useAppData } from "../context/AppContext";

// Validation schema
const schema = z.object({
  otp: z.string().min(6, "Enter the 6-digit OTP").max(6),
});
type FormData = z.infer<typeof schema>;

const VerifyOtpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const { setUser, setIsAuth, fetchChat, fetchAllUsers } = useAppData();

  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  // Timer countdown logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const onSubmit = async (data: FormData) => {
    if (!email) return toast.error("Email is missing.");

    setLoading(true);
    try {
      const res = await axiosWrapper.post("/verify", { email, otp: data.otp });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      const userData = {
        name: res.data.user?.name || email.split("@")[0],
        email: res.data.user?.email || email,
        memberSince: res.data.user?.createdAt
          ? new Date(res.data.user.createdAt).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })
          : "",
      };

      setUser(userData);
      setIsAuth(true);
      localStorage.setItem("user", JSON.stringify(userData));

      const token = res.data.token;
      if (token) {
        await fetchChat(token);
        await fetchAllUsers(token);
      }

      toast.success(res.data.message || "OTP Verified");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) return toast.error("Email is missing.");

    setResendLoading(true);
    try {
      const res = await axiosWrapper.post("/login", { email });
      toast.success(res.data.message || "OTP resent successfully");
      setTimer(60);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-600 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-medium text-white">Verify OTP</h1>
          <p className="text-sm text-gray-400 mt-2">Enter the 6-digit code sent to your email</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              {...register("otp")}
              maxLength={6}
              inputMode="numeric"
              className="w-full px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white placeholder-gray-500 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-center tracking-widest text-lg"
            />

            {errors.otp && <p className="text-red-400 text-sm mt-1">{errors.otp.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-600 hover:bg-gray-700 text-white font-medium py-2 rounded-md transition disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </button>
          <div className="text-end mt-6 text-md text-gray-400">
            Didn’t receive a code?{" "}
            <button type="button" disabled={resendLoading || timer > 0} onClick={handleResendOtp} className="text-white hover:underline disabled:opacity-50">
              {resendLoading ? "Sending..." : timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
