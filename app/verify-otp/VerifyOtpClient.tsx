"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ToastProvider";

export default function VerifyOtpClient() {
  const params = useSearchParams();
  const email = params.get("email") || "";
  const router = useRouter();
  const { showToast } = useToast();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp) {
      showToast("OTP is required", "warning");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || "Invalid OTP", "error");
        return;
      }

      showToast("OTP verified", "success");
      router.push(`/reset-password?email=${email}`);
    } catch {
      showToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
        <h2 className="text-2xl text-center mb-2">Verify OTP</h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          OTP sent to <strong>{email}</strong>
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 mb-4"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 text-white"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </section>
  );
}
