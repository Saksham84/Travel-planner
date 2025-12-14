type Trip = {
    id: number;
    place: string;
    city: string;
    date: string;
};

type TripCardProps = {
    trip: Trip;
    onDelete: (id: number) => void;
    onEdit: (trip: Trip) => void;
};

export default function TripCard({ trip, onDelete, onEdit }: TripCardProps) {
    return (
        <div className="border p-4 rounded shadow">
            <div className="mb-4 space-y-1">
                <h3 className="font-bold">Place: {trip.place}</h3>
                <p>City: {trip.city}</p>
                <p className="text-sm text-gray-500">Date: {trip.date}</p>
            </div>

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
        </div>
    );
}
