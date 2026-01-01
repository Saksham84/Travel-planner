"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ToastProvider";

export default function ForgotPassword() {
  const router = useRouter();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!email) {
      showToast("Email is required", "warning");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || "Failed to send OTP", "error");
        return;
      }

      showToast("OTP sent to your email", "success");
      router.push(`/verify-otp?email=${email}`);
    } catch {
      showToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 px-4">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-teal-50 to-cyan-100 dark:from-blue-900/30 dark:via-teal-900/20 dark:to-cyan-900/30 rounded-3xl rotate-3"></div>

        <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
          <div className="mb-8 text-center">
            <h2 className="text-3xl mb-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              Forgot Password
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your email to receive an OTP
            </p>
          </div>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSendOTP}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 py-3 text-white font-medium hover:opacity-90 transition shadow-lg shadow-blue-500/30 disabled:opacity-60"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </div>
      </div>
    </section>
  );
}
