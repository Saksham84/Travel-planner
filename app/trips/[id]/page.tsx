"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Trip } from "@/types/trip";
import EditTripForm from "@/components/EditTripForm";
import { useToast } from "@/components/ToastProvider";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, Edit, Trash2, MapPin, Calendar } from "lucide-react";

const DEFAULT_IMAGE = "/default-trip.jpg";

export default function TripDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { showToast } = useToast();
  const { user, loading: authLoading } = useAuth(); // ✅ centralized auth

  const [trip, setTrip] = useState<Trip | null>(null);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  /* ============================
     LOAD TRIP
     ============================ */
  useEffect(() => {
    const loadTrip = async () => {
      try {
        const res = await fetch(`/api/trips/${id}`);

        if (!res.ok) {
          showToast("Trip not found", "error");
          router.push("/trips");
          return;
        }

        const data = await res.json();
        setTrip(data);
      } catch {
        showToast("Failed to load trip", "error");
        router.push("/trips");
      } finally {
        setLoading(false);
      }
    };

    loadTrip();
  }, [id, router, showToast]);

  /* ============================
     DELETE TRIP
     ============================ */
  const handleDelete = async () => {
    if (!trip) return;

    const confirmed = window.confirm("Delete this trip?");
    if (!confirmed) return;

    const res = await fetch(`/api/trips/${trip._id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      showToast("Not authorized to delete", "error");
      return;
    }

    showToast("Trip deleted", "success");
    router.push("/trips");
  };

  /* ============================
     SAVE EDIT
     ============================ */
  const handleSaveEdit = async (updatedTrip: Trip, imageFile?: File | null) => {
    try {
      const formData = new FormData();
      formData.append("title", updatedTrip.title);
      formData.append("location", updatedTrip.location);
      formData.append("city", updatedTrip.city);
      formData.append("date", updatedTrip.date);
      formData.append("description", updatedTrip.description);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(`/api/trips/${updatedTrip._id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        showToast("Failed to update trip", "error");
        return;
      }

      const savedTrip = await res.json();
      setTrip(savedTrip);
      setEditingTrip(null);
      showToast("Trip updated", "success");
    } catch {
      showToast("Something went wrong", "error");
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading trip...
      </div>
    );
  }

  if (!trip) return null;

  const isOwner =
    !!user &&
    typeof trip.userId === "object" &&
    user._id === trip.userId._id;

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 pt-28 pb-24">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition"
        >
          <ArrowLeft size={18} /> Back to trips
        </button>

        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl mb-10">
          <img
            src={
               trip.image?.url || DEFAULT_IMAGE
            }
            alt={trip.title}
            className="w-full h-[420px] object-cover"
          />

          {/* Owner Actions */}
          {isOwner && (
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setEditingTrip(trip)}
                className="p-2 rounded-full bg-white/90 hover:bg-white shadow transition"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 shadow transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 space-y-6">
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100">
            {trip.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>
                {trip.location}, {trip.city}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{trip.date}</span>
            </div>
          </div>

          <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
            {trip.description}
          </p>
        </div>
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
