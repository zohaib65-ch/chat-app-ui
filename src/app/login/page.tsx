"use client";

import React from "react";
import { Loader2, Mail, MessageCircleMore } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axiosWrapper from "@/lib/axiosWrapper";
import { useAppData } from "../context/AppContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
});

const LoginPage = () => {
  const router = useRouter();
  const { setUser } = useAppData();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-600 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h2 className="flex items-center justify-center gap-2 text-3xl font-medium mb-10 tracking-wide">
            <MessageCircleMore className="w-6 h-6 text-gray-400" />
            <span className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-500 bg-clip-text text-transparent">LET&apos;S CHAT</span>
          </h2>
          <p className="text-sm text-gray-400 mt-2">Enter your email to receive a verification code</p>
        </div>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const { data } = await axiosWrapper.post(`/login`, { email: values.email });

              const userData = {
                name: data.user?.name || values.email.split("@")[0].substring(0, 7),
                email: data.user?.email || values.email,
                memberSince: data.user?.memberSince || new Date().toLocaleString("default", { month: "long", year: "numeric" }),
              };

              setUser(userData);
              localStorage.setItem("user", JSON.stringify(userData));

              toast.success(data.message);
              router.push(`/verify?email=${values.email}`);
            } catch (error) {
              toast.error("Something went wrong. Try again.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-600 hover:bg-gray-700 text-white font-medium py-2 rounded-md transition disabled:opacity-50 flex items-center justify-center gap-2"
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
};

export default LoginPage;
