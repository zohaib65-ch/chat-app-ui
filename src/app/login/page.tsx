"use client";

import React from "react";
import { Loader2, Mail, MessageCircleMore } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axiosWrapper from "@/lib/axiosWrapper";
import { useAppData } from "../context/AppContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// ✅ Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setIsAuth } = useAppData();

  // ✅ Form Submit Handler
  const handleLogin = async (values: { email: string }, { setSubmitting }: any) => {
    try {
      const { data } = await axiosWrapper.post("/login", { email: values.email });

      // Save token if available
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Prepare user data
      const userData = {
        name: data.user?.name || values.email.split("@")[0],
        email: data.user?.email || values.email,
        memberSince: new Date(data.user?.createdAt || new Date()).toLocaleString("default", {
          month: "long",
          year: "numeric",
        }),
      };

      // Save to context + localStorage
      setUser(userData);
      setIsAuth(true);
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success(data.message);
      router.push(`/verify?email=${values.email}`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-600 rounded-2xl shadow-xl p-8">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="flex items-center justify-center gap-2 text-3xl font-medium mb-10 tracking-wide">
            <MessageCircleMore className="w-6 h-6 text-gray-400" />
            <span className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-500 bg-clip-text text-transparent">
              LET&apos;S CHAT
            </span>
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Enter your email to receive a verification code
          </p>
        </div>

        {/* Form */}
        <Formik
          initialValues={{ email: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">
                    <Mail size={18} />
                  </span>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                </div>
                <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-600 hover:bg-gray-700 text-white font-medium py-2 rounded-md transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    Sending...
                  </>
                ) : (
                  "Send Verification Code"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
