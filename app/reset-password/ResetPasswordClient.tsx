"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ToastProvider";

export default function ResetPasswordClient() {
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
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
        <h2 className="text-2xl text-center mb-2">Reset Password</h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Reset password for <strong>{email}</strong>
        </p>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 mb-4"
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 text-white"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </section>
  );
}
