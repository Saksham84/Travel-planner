"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("darkMode", String(!dark));
    setDark(!dark);
  };

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle Dark Mode"
      className="
        w-10 h-10 rounded-full
        border border-gray-100
        dark:border-white
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
