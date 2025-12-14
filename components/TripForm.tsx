"use client";
import { useState } from "react";

type Trip = {
  id: number;
  place: string;
  city: string;
  date: string;
};

export default function TripForm() {
  const [place, setPlace] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    const newTrip : Trip = {
      id: Date.now(),
      place,
      city,
      date,
    };

    const existingTrips: Trip[] =
      JSON.parse(localStorage.getItem("trips") || "[]");

    localStorage.setItem(
      "trips",
      JSON.stringify([...existingTrips, newTrip])
    );

    setPlace("");
    setCity("");
    setDate("");
    alert("Trip Added!");
  };

  return (
    <form className="max-w-md mx-auto space-y-4" onSubmit={handleSubmit}>
        <input
        className="border p-2 w-full text-black"
        placeholder="Place"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
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
