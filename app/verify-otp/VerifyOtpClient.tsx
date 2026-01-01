"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ToastProvider";

export default function VerifyOTP() {
  const params = useSearchParams();
  const email = params.get("email") || "";
  const router = useRouter();
  const { showToast } = useToast();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  /* ============================
     OTP VERIFY
     ============================ */
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

  /* ============================
     RESEND OTP
     ============================ */
  const handleResend = async () => {
    if (cooldown > 0) return;

    setResendLoading(true);

    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || "Failed to resend OTP", "error");
        return;
      }

      showToast("OTP resent successfully", "success");
      setCooldown(60); // ⏱ 60 seconds cooldown
    } catch {
      showToast("Something went wrong", "error");
    } finally {
      setResendLoading(false);
    }
  };

  /* ============================
     COOLDOWN TIMER
     ============================ */
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 px-4">
      <div className="relative w-full max-w-md">
        <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10">

          <h2 className="text-2xl text-center mb-4 text-gray-900 dark:text-gray-100">
            Verify OTP
          </h2>

          <p className="text-sm text-center text-gray-500 mb-6">
            OTP sent to <strong>{email}</strong>
          </p>

          {/* OTP Input + Resend */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 pr-28 focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleResend}
              disabled={resendLoading || cooldown > 0}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600 hover:underline disabled:text-gray-400 disabled:no-underline"
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend"}
            </button>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </div>
    </section>
  );
}
