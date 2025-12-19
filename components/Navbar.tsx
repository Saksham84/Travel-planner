"use client";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  const loadUser = () => {
    const user = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );
    setCurrentUser(user);
  };

  useEffect(() => {
    loadUser();

    window.addEventListener("auth-change", loadUser);
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("auth-change", loadUser);
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-gray-900/80 dark:border-gray-800">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex justify-between items-center">

          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-teal-500 to-cyan-500 rounded-xl shadow-lg" />
            <span className="font-semibold text-xl bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Trip Planner
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </Link>

            <Link
              href="/trips"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Trips
            </Link>

            {!currentUser ? (
              <div className="flex items-center gap-8">
                <Link
                  href="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-8">
                <button
                  onClick={handleLogout}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
                  >
                  Logout
                </button>
              </div>
            )}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          </div>
            <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
