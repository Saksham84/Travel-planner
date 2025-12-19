"use client";
import { useEffect, useState } from "react";
import { Trip } from "@/types/trip";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

export default function TripForm() {
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );

    if (!user) {
      alert("Login required");
      router.push("/login");
    } else {
      setCurrentUser(user);
    }
  }, [router]);

  if (!currentUser) {
    return null;
  }

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    const newTrip: Trip = {
      id: Date.now(),
      title,
      location,
      city,
      date,
      userId: currentUser.id,
    };

    const existingTrips: Trip[] =
      JSON.parse(localStorage.getItem("trips") || "[]");

    localStorage.setItem(
      "trips",
      JSON.stringify([...existingTrips, newTrip])
    );

    setTitle("");
    setLocation("");
    setCity("");
    setDate("");
    alert("Trip Added!");
  };

  return (
    <form className="max-w-md mx-auto space-y-4" onSubmit={handleSubmit}>
      <input
        className="border p-2 w-full text-black"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full text-black"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full text-black"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full text-black"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button
        className="bg-blue-600 text-white px-4 py-2"
        // onClick={handleSubmit}
        type="submit"
      >
        Add Trip
      </button>
    </form>
  );
}
