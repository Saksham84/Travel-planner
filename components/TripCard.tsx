import { Trip } from "@/types/trip";

type TripCardProps = {
    trip: Trip;
    canEdit?: boolean;
    onDelete: (id: number) => void;
    onEdit: (trip: Trip) => void;
};

export default function TripCard({ trip, onDelete, onEdit, canEdit }: TripCardProps) {
    return (
        <div className="border p-4 rounded shadow">
            <div className="mb-4 space-y-1">
                <h3 className="font-bold">Title: {trip.title}</h3>
                <p>Location: {trip.location}</p>
                <p>City: {trip.city}</p>
                <p className="text-sm text-gray-500">Date: {trip.date}</p>
            </div>

            {canEdit && (
                <div className="flex gap-2">
                    <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                        onClick={() => onEdit(trip)}
                    >
                        Edit
                    </button>

                    <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => onDelete(trip.id)}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}
