"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Trip } from "@/types/trip";

const DEFAULT_IMAGE = "/default-trip.jpg"
//   "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";

export default function TripDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    const trips: Trip[] = JSON.parse(
      localStorage.getItem("trips") || "[]"
    );

    const foundTrip = trips.find(
      (t) => t.id === Number(id)
    );

    if (!foundTrip) {
      alert("Trip not found");
      router.push("/trips");
      return;
    }

    setTrip(foundTrip);
  }, [id, router]);

  if (!trip) return null;

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-24">
      <div className="max-w-4xl mx-auto">

        {/* Cover Image */}
        <div className="rounded-xl overflow-hidden shadow-lg mb-8">
          <img
            src={trip.image || DEFAULT_IMAGE}
            alt={trip.title}
            className="w-full h-[420px] object-cover"
          />
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            {trip.title}
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-2">
            📍 {trip.location}, {trip.city}
          </p>

          <p className="text-sm text-gray-500 mb-6">
            🗓 {trip.date}
          </p>

          <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
            {trip.description}
          </p>

          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="mt-8 inline-block px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            ← Back to Trips
          </button>
        </div>
      </div>
    </section>
  );
}
