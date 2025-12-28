"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  // 🔹 Load theme from cookie or system
  useEffect(() => {
    const cookieTheme = document.cookie
      .split("; ")
      .find((row) => row.startsWith("theme="))
      ?.split("=")[1];

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const isDark = cookieTheme
      ? cookieTheme === "dark"
      : prefersDark;

    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !dark;
    document.documentElement.classList.toggle("dark", newTheme);
    document.cookie = `theme=${newTheme ? "dark" : "light"}; path=/; max-age=31536000`;
    setDark(newTheme);
  };

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle Dark Mode"
      className="
        w-10 h-10 rounded-full
        border border-gray-200 dark:border-gray-700
        flex items-center justify-center
        bg-transparent
        hover:bg-gray-100 dark:hover:bg-gray-800
        transition-colors
      "
    >
      {dark ? (
        <Sun size={18} className="text-yellow-400" />
      ) : (
        <Moon size={18} className="text-gray-700 dark:text-gray-200" />
      )}
    </button>
  );
}
