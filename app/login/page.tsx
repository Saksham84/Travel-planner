"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ToastProvider";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const handleLogin = async () => {
    if (!email || !password) {
    //   alert("Email and password are required");
    showToast("Email and password are required", "warning")
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // alert(data.error || "Login failed");
        showToast(data.error || "Login failed", "error")
        setLoading(false);
        return;
      }

      // 🔥 JWT is now stored in HttpOnly cookie
      window.dispatchEvent(new Event("auth-change"));
      showToast("Login Successful", "success")
      router.push("/");
    } catch (error) {
    //   alert("Something went wrong. Please try again.");
    showToast("Something went wrong. Please try again.", "error")
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 px-4">
      <div className="relative w-full max-w-md">

        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-teal-50 to-cyan-100 dark:from-blue-900/30 dark:via-teal-900/20 dark:to-cyan-900/30 rounded-3xl rotate-3"></div>

        {/* Login Card */}
        <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10 transform -rotate-2 hover:rotate-0 transition-transform duration-500">

          {/* Heading */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl mb-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Login to continue planning your trips
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 py-3 text-white font-medium hover:opacity-90 transition shadow-lg shadow-blue-500/30 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <span className="text-blue-600 dark:text-blue-400 hover:underline">
              <Link href="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
