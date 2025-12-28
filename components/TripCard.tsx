import { Trip } from "@/types/trip";
import { MapPin, Calendar, Pencil, Trash2 } from "lucide-react";

type TripCardProps = {
  trip: Trip;
  canEdit?: boolean;
  onDelete: (id: string) => void;
  onEdit: (trip: Trip) => void;
  onOpen: (id: string) => void;
};

const DEFAULT_IMAGE = "/default-trip.jpg";

export default function TripCard({
  trip,
  onDelete,
  onEdit,
  canEdit,
  onOpen,
}: TripCardProps) {
  return (
    <article
      onClick={() => onOpen(trip._id)}
      className="group cursor-pointer relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={trip.image || DEFAULT_IMAGE}
          alt={trip.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* 🔹 Action Icons (Top Right) */}
        {canEdit && (
          <div
            className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => e.stopPropagation()} // prevent card click
          >
            <button
              onClick={() => onEdit(trip)}
              className="p-2 rounded-full bg-white/90 hover:bg-yellow-500 text-gray-800 hover:text-white transition"
              title="Edit Trip"
            >
              <Pencil size={16} />
            </button>

            <button
              onClick={() => onDelete(trip._id)}
              className="p-2 rounded-full bg-white/90 hover:bg-red-500 text-gray-800 hover:text-white transition"
              title="Delete Trip"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            {trip.title}
          </h3>

          <div className="flex items-center gap-2 mb-3 text-white/90">
            <MapPin size={16} />
            <span className="text-sm">{trip.city}</span>
          </div>

          <div className="flex items-center gap-2 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Calendar size={16} />
            <span className="text-sm">{trip.date}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
