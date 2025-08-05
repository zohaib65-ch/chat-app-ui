"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import axiosWrapper from "@/lib/axiosWrapper";

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

  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60); // start from 60 seconds

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
      setTimer(60); // reset timer on resend
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="w-full max-w-md bg-[#1e293b] rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-white">Verify OTP</h1>
          <p className="text-sm text-gray-400 mt-2">Enter the 6-digit code sent to your email</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">OTP</label>
            <input
              type="text"
              {...register("otp")}
              maxLength={6}
              inputMode="numeric"
              className="w-full px-4 py-2 bg-[#334155] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest text-lg"
            />
            {errors.otp && <p className="text-red-400 text-sm mt-1">{errors.otp.message}</p>}
          </div>
          <div className="text-end mt-6 text-sm text-gray-400">
            Didn’t receive a code?{" "}
            <button disabled={resendLoading || timer > 0} onClick={handleResendOtp} className="text-blue-400 hover:underline disabled:opacity-50">
              {resendLoading ? "Sending..." : timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition disabled:opacity-50 flex justify-center items-center gap-2"
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
        </form>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
