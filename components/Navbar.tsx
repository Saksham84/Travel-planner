"use client";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-blue-600 text-white">
      <h1 className="font-bold">Travel Planner</h1>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/add-trip">Add Trip</Link>
        <Link href="/trips">Trips</Link>
        <DarkModeToggle />
      </div>
    </nav>
  );
}
