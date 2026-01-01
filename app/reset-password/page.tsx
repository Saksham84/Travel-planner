"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ToastProvider";

export default function ResetPassword() {
  const params = useSearchParams();
  const email = params.get("email") || "";
  const router = useRouter();
  const { showToast } = useToast();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password) {
      showToast("Password is required", "warning");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || "Reset failed", "error");
        return;
      }

      showToast("Password reset successful", "success");
      router.push("/login");
    } catch {
      showToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 px-4">
      <div className="relative w-full max-w-md">
        <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10">
          <h2 className="text-2xl text-center mb-6 text-gray-900 dark:text-gray-100">
            Reset Password
          </h2>

          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleReset}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 py-3 text-white hover:opacity-90 transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </div>
    </section>
  );
}
