"use client";
import { useEffect, useState } from "react";
import { Trip } from "@/types/trip";
import { useToast } from "@/components/ToastProvider";

type Props = {
  trip: Trip;
  onSave: (trip: Trip, imageFile?: File | null) => void;
  onCancel: () => void;
};

export default function EditTripForm({ trip, onSave, onCancel }: Props) {
  const { showToast } = useToast();

  const [title, setTitle] = useState(trip.title);
  const [location, setLocation] = useState(trip.location);
  const [city, setCity] = useState(trip.city);
  const [date, setDate] = useState(trip.date);
  const [description, setDescription] = useState(trip.description);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    trip.image?.url || null
  );

  const [saving, setSaving] = useState(false);

  /* ============================
     IMAGE PREVIEW HANDLING
     ============================ */
  useEffect(() => {
    if (!imageFile) return;

    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  /* ============================
     SUBMIT
     ============================ */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !location || !city || !date || !description) {
      showToast("All fields are required", "warning");
      return;
    }

    setSaving(true);

    onSave(
      {
        ...trip,
        title,
        location,
        city,
        date,
        description,
      },
      imageFile
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Edit Trip
      </h2>

      <input
        className="input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        className="input"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />

      <input
        className="input"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />

      <input
        type="date"
        className="input"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <textarea
        className="input resize-none h-28"
        placeholder="Trip description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Cover Image
        </label>

        <input
          id="edit-image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />

        <label
          htmlFor="edit-image-upload"
          className="flex items-center justify-center h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
        >
          {!previewUrl ? (
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Click to upload image
            </span>
          ) : (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
