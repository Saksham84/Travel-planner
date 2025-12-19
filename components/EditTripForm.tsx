"use client";
import { useState } from "react";
import { Trip } from "@/types/trip";

type Props = {
  trip: Trip;
  onSave: (trip: Trip) => void;
  onCancel: () => void;
};

export default function EditTripForm({ trip, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(trip.title);
  const [location, setLocation] = useState(trip.location);
  const [city, setCity] = useState(trip.city);
  const [date, setDate] = useState(trip.date);
  const [description, setDescription] = useState(trip.description);
  const [image, setImage] = useState(trip.image || "");

  const handleSave = () => {
    onSave({
      ...trip,
      title,
      location,
      city,
      date,
      description,
      image: image || undefined, // optional
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
      
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Edit Trip
      </h2>

      <input
        className="input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="input"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        className="input"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <input
        type="date"
        className="input"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <textarea
        className="input resize-none h-28"
        placeholder="Trip description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="input"
        placeholder="Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      {image && (
        <img
          src={image}
          alt="Preview"
          className="w-full h-40 object-cover rounded-md border"
        />
      )}

      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
