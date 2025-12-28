"use client";

import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  // 🔐 Load user from backend (cookie-based)
  const loadUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        setCurrentUser(null);
        return;
      }
      const data = await res.json();
      setCurrentUser(data.user);
    } catch {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
    window.addEventListener("auth-change", loadUser);

    return () => {
      window.removeEventListener("auth-change", loadUser);
    };
  }, []);

  // 🔓 Logout
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setCurrentUser(null);
    window.dispatchEvent(new Event("auth-change"));
    setIsMenuOpen(false);
    router.push("/login");
  };

  if (loading) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-gray-900/80 dark:border-gray-800">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-teal-500 to-cyan-500 rounded-xl shadow-lg" />
            <span className="font-semibold text-xl bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Trip Planner
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/trips" className="nav-link">Trips</Link>

            {!currentUser ? (
              <>
                <Link href="/login" className="nav-link">Login</Link>
                <Link href="/signup" className="nav-link">Signup</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="nav-link">
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
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-6 pb-4 flex flex-col gap-4 border-t border-gray-100 dark:border-gray-800 pt-4">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="nav-link py-2"
            >
              Home
            </Link>

            <Link
              href="/trips"
              onClick={() => setIsMenuOpen(false)}
              className="nav-link py-2"
            >
              Trips
            </Link>

            {!currentUser ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="nav-link py-2"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="nav-link py-2"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-left nav-link py-2"
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
