"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TripCard from "@/components/TripCard";
import EditTripForm from "@/components/EditTripForm";
import Link from "next/link";
import { Trip } from "@/types/trip";
import { User } from "@/types/user";
import { useToast } from "@/components/ToastProvider";

export default function Trips() {
    const router = useRouter();

    const [trips, setTrips] = useState<Trip[]>([]);
    const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const { showToast } = useToast();

    // 🔹 Open single trip
    const openTrip = (id: string) => {
        router.push(`/trips/${id}`);
    };

    // 🔹 Load trips + current user
    const loadData = async () => {
        try {
            const [tripRes, userRes] = await Promise.all([
                fetch("/api/trips"),
                fetch("/api/auth/me"),
            ]);

            if (tripRes.ok) {
                const tripData = await tripRes.json();
                setTrips(tripData);
            }

            if (userRes.ok) {
                const userData = await userRes.json();
                setCurrentUser(userData.user);
            } else {
                setCurrentUser(null);
            }
        } catch (err) {
            console.error("Failed to load data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // 🔹 Delete trip
    const handleDelete = async (id: string) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this trip?"
        );
        if (!isConfirmed) return;

        const res = await fetch(`/api/trips/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            // alert("Not authorized or failed to delete");
            showToast("Not authorized or failed to delete", "warning")
            return;
        }

        setTrips((prev) => prev.filter((trip) => trip._id !== id));
    };

    // 🔹 Save edited trip
    const handleSaveEdit = async (
        updatedTrip: Trip,
        imageFile?: File | null
    ) => {
        try {
            const formData = new FormData();

            // append text fields
            formData.append("title", updatedTrip.title);
            formData.append("location", updatedTrip.location);
            formData.append("city", updatedTrip.city);
            formData.append("date", updatedTrip.date);
            formData.append("description", updatedTrip.description);

            // append image only if user selected new one
            if (imageFile) {
                formData.append("image", imageFile);
            }

            const res = await fetch(`/api/trips/${updatedTrip._id}`, {
                method: "PUT",
                body: formData, // ❌ no headers
            });

            if (!res.ok) {
                showToast("Failed to update trip", "error");
                return;
            }

            const savedTrip = await res.json();

            setTrips((prev) =>
                prev.map((trip) =>
                    trip._id === savedTrip._id ? savedTrip : trip
                )
            );

            setEditingTrip(null);
            showToast("Trip updated successfully", "success");
        } catch (error) {
            showToast("Something went wrong", "error");
        }
    };

    //handle add trips
    const handleAddTrip = () => {
        if (!currentUser) {
            // alert("Please login to add a trip");
            showToast("Please login to add a trip", "warning")
            router.push("/login"); // optional, remove if you only want alert
            return;
        }

        router.push("/add-trip");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading trips...
            </div>
        );
    }

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

                    <button
                        onClick={handleAddTrip}
                        className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-3 text-white font-medium hover:opacity-90 transition shadow-lg shadow-blue-500/30"
                    >
                        + Add Trip
                    </button>

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
                                key={trip._id}
                                className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow p-1"
                            >
                                <TripCard
                                    trip={trip}
                                    canEdit={
                                        !!currentUser &&
                                        typeof trip.userId === "object" &&
                                        currentUser._id === trip.userId._id
                                    }
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
