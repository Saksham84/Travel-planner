"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Signup failed");
        setLoading(false);
        return;
      }

      alert("Signup successful. Please login.");
      router.push("/login");
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 px-4">
      <div className="relative w-full max-w-md">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-teal-50 to-cyan-100 dark:from-blue-900/30 dark:via-teal-900/20 dark:to-cyan-900/30 rounded-3xl rotate-3"></div>

        {/* Signup Card */}
        <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
          {/* Heading */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl mb-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Start planning your next adventure
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

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
              onClick={handleSignup}
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 py-3 text-white font-medium hover:opacity-90 transition shadow-lg shadow-blue-500/30 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <span className="text-blue-600 dark:text-blue-400 hover:underline">
              <Link href="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
