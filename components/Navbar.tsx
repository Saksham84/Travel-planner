"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const router = useRouter();
  const { user, loading, refreshUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (loading) return null;

  const handleNavigate = (path: string) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    await refreshUser();
    setIsMenuOpen(false);
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div
            onClick={() => handleNavigate("/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-teal-500 to-cyan-500 rounded-xl shadow-lg" />
            <span className="font-semibold text-xl bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Trip Planner
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/trips" className="nav-link">Trips</Link>

            {!user ? (
              <>
                <Link href="/login" className="nav-link">Login</Link>
                <Link href="/signup" className="nav-link">Signup</Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition"
              >
                Logout
              </button>
            )}
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            <DarkModeToggle />
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <DarkModeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-6 pb-4 flex flex-col gap-4 border-t border-gray-200 dark:border-gray-800 pt-4">
            <button onClick={() => handleNavigate("/")} className="nav-link py-2">
              Home
            </button>

            <button onClick={() => handleNavigate("/trips")} className="nav-link py-2">
              Trips
            </button>

            {!user ? (
              <>
                <button onClick={() => handleNavigate("/login")} className="nav-link py-2">
                  Login
                </button>
                <button onClick={() => handleNavigate("/signup")} className="nav-link py-2">
                  Signup
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-left text-red-600 hover:text-red-700 transition py-2"
              >
                Logout
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
