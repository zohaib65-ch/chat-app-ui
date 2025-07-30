"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const onSubmit = (data: FormData) => {
    console.log("OTP submitted:", data);
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

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition">
            Verify Code
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-400">
          Didn’t receive a code?{" "}
          <button className="text-blue-400 hover:underline" onClick={() => alert("Resend logic here")}>
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
