"use client";
import { useState } from "react";
import { User } from "@/types/user";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users: User[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(foundUser)
    );

    alert("Login successful");
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <input className="border p-2 w-full text-black" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        className="border p-2 w-full text-black"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2" onClick={handleLogin}>Login</button>
    </div>
  );
}
