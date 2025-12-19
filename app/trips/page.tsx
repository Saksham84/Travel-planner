"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TripCard from "@/components/TripCard";
import EditTripForm from "@/components/EditTripForm";
import Link from "next/link";
import { Trip } from "@/types/trip";
import { User } from "@/types/user";

export default function Trips() {
    const router = useRouter();

  const [trips, setTrips] = useState<Trip[]>([]);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const openTrip = (id: number)=> {
    router.push(`/trips/${id}`)
  }

  const handleDelete = (id: number): void => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this trip?"
    );
    if (!isConfirmed) return;

    const updatedTrips = trips.filter((trip) => trip.id !== id);
    setTrips(updatedTrips);
    localStorage.setItem("trips", JSON.stringify(updatedTrips));
  };

  const handleSaveEdit = (updatedTrip: Trip): void => {
    const updatedTrips = trips.map((trip) =>
      trip.id === updatedTrip.id ? updatedTrip : trip
    );
    setTrips(updatedTrips);
    localStorage.setItem("trips", JSON.stringify(updatedTrips));
    setEditingTrip(null);
  };

  useEffect(() => {
    const storedTrips: Trip[] = JSON.parse(
      localStorage.getItem("trips") || "[]"
    );
    setTrips(storedTrips);

    const user = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );
    setCurrentUser(user);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 px-4 py-24">
      <div className="container mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              Trips
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and explore all your planned adventures
            </p>
          </div>

          <Link
            href="/add-trip"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-3 text-white font-medium hover:opacity-90 transition shadow-lg shadow-blue-500/30"
          >
            + Add Trip
          </Link>
        </div>

        {/* Trips Grid */}
        {trips.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              No trips added yet. Start planning your first adventure!
            </p>
            <Link
              href="/add-trip"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-3 text-white font-medium hover:opacity-90 transition shadow-lg shadow-blue-500/30"
            >
              Add Your First Trip
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow p-1"
              >
                <TripCard
                  trip={trip}
                  canEdit={currentUser?.id === trip.userId}
                  onDelete={handleDelete}
                  onEdit={setEditingTrip}
                  onOpen={openTrip}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setEditingTrip(null)}
          />

          <div
            className="relative z-10 w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <EditTripForm
              trip={editingTrip}
              onSave={handleSaveEdit}
              onCancel={() => setEditingTrip(null)}
            />
          </div>
        </div>
      )}
    </section>
  );
}
