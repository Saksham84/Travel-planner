import { Trip } from "@/types/trip";
import { MapPin, Calendar } from 'lucide-react';

type TripCardProps = {
    trip: Trip;
    canEdit?: boolean;
    onDelete: (id: number) => void;
    onEdit: (trip: Trip) => void;
    onOpen: (id: number) => void;
};

const DEFAULT_IMAGE = "/default-trip.jpg"
//   "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";

export default function TripCard({
    trip,
    onDelete,
    onEdit,
    canEdit,
    onOpen,
}: TripCardProps) {
    return (
        <article
            onClick={() => onOpen(trip.id)}
            className="group cursor-pointer relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow bg-white dark:bg-gray-900"
        >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={trip.image || DEFAULT_IMAGE}
                    alt={trip.title}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-black/40"></div>

                {/* Overlay Text */}
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-2xl mb-2 group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                    {trip.title}
                  </h3>
                    <div className="flex items-center gap-2 mb-3 text-white/90">
                        <MapPin size={16} />
                        <span className="text-sm">{trip.location}, {trip.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Calendar size={16} />
                        <span className="text-sm">{trip.date}</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            {canEdit && (
                <div
                    className="flex gap-3 p-4 bg-white dark:bg-gray-900"
                    onClick={(e) => e.stopPropagation()} // ❗ important
                >
                    <button
                        onClick={() => onEdit(trip)}
                        className="px-3 py-1.5 text-sm rounded-md bg-yellow-500 hover:bg-yellow-600 text-white"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(trip.id)}
                        className="px-3 py-1.5 text-sm rounded-md bg-red-500 hover:bg-red-600 text-white"
                    >
                        Delete
                    </button>
                </div>
            )}
        </article>
    );
}
