"use client";
import { useState } from "react";
import { User } from "@/types/user";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    const newUser: User = {
      id: Date.now(),
      name,
      email,
      password,
    };

    const users: User[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    localStorage.setItem(
      "users",
      JSON.stringify([...users, newUser])
    );

    alert("Signup successful. Please login.");
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <input className="border p-2 w-full text-black" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input className="border p-2 w-full text-black" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        className="border p-2 w-full text-black"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2" onClick={handleSignup}>Signup</button>
    </div>
  );
}
