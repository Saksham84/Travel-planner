"use client";
import { useEffect, useState } from "react";
import TripCard from "@/components/TripCard";
import EditTripForm from "@/components/EditTripForm";

type Trip = {
    id: number;
    place: string;
    city: string;
    date: string;
};

export default function Trips() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [editingTrip, setEditingTrip] = useState<Trip | null>(null);

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
        const storedTrips =
            JSON.parse(localStorage.getItem("trips") || "[]");
        setTrips(storedTrips);
    }, []);

    return (
        <main className="p-6 bg-white dark:bg-gray-900 text-black dark:text-white">
            <h2 className="text-xl font-bold mb-4">My Trips</h2>
            <div className="grid md:grid-cols-3 gap-4">
                {trips.map((trip: Trip) => (
                    <TripCard key={trip.id} trip={trip} onDelete={handleDelete} onEdit={setEditingTrip} />
                ))}
            </div>
            <br />
            {editingTrip && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setEditingTrip(null)}
                    />

                    <div
                        className="relative z-10 bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg w-full max-w-md shadow-lg"
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

            {/* {editingTrip && (
            <EditTripForm
                trip={editingTrip}
                onSave={handleSaveEdit}
                onCancel={() => setEditingTrip(null)}
            />
        )} */}
        </main>
    );
}
