import { useState } from "react";

type Trip = {
    id: number;
    place: string;
    city: string;
    date: string;
};

type Props = {
    trip: Trip;
    onSave: (trip: Trip) => void;
    onCancel: () => void;
};

export default function EditTripForm({ trip, onSave, onCancel }: Props) {
    const [place, setPlace] = useState(trip.place);
    const [city, setCity] = useState(trip.city);
    const [date, setDate] = useState(trip.date);

    const handleSave = () => {
        onSave({
            ...trip,
            place,
            city,
            date,
        });
    };

    return (
        <div className="border p-8 rounded space-y-2 flex flex-col max-w-md mx-auto">
            <h2 className="text-lg font-bold mb-4">Edit Trip</h2>
            <label>Place:</label>
            <input className="border p-2 w-full text-black" value={place} onChange={(e) => setPlace(e.target.value)} />
            <label>City:</label>
            <input className="border p-2 w-full text-black" value={city} onChange={(e) => setCity(e.target.value)} />
            <label>Date:</label>
            <input className="border p-2 w-full text-black" type="date" value={date} onChange={(e) => setDate(e.target.value)} />

            <div className="flex gap-2 text-white">
                <button
                    onClick={handleSave}
                    className="bg-green-500 px-2 py-1 rounded"
                >Save</button>
                <button
                    onClick={onCancel}
                    className="bg-red-500 px-2 py-1 rounded"
                >Cancel</button>
            </div>
        </div>
    );
}
