"use client";
import { useEffect, useState } from "react";

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
      className="px-3 py-1 border rounded"
    >
      {dark ? "Light Mode ☀️" : "Dark Mode 🌙"}
    </button>
  );
}
