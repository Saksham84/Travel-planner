"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { useToast } from "@/components/ToastProvider";

export default function TripForm() {
  const router = useRouter();
  const { showToast } = useToast();

  // Form fields
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Auth & UI state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  /* ============================
     AUTH CHECK
     ============================ */
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        showToast("Login required", "warning");
        router.push("/login");
        return;
      }

      const data = await res.json();
      setCurrentUser(data.user);
      setLoading(false);
    };

    checkAuth();
  }, [router, showToast]);

  /* ============================
     IMAGE PREVIEW CLEANUP
     ============================ */
  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  if (loading) return null;

  /* ============================
     SUBMIT FORM
     ============================ */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("location", location);
      formData.append("city", city);
      formData.append("date", date);
      formData.append("description", description);
      if (imageFile) formData.append("image", imageFile);

      const res = await fetch("/api/trips", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        showToast("Failed to publish trip", "error");
        return;
      }

      showToast("Trip published successfully!", "success");
      router.push("/trips");
    } catch {
      showToast("Something went wrong", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 py-24 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee)",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative w-full max-w-xl">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Write Your Travel Story ✍️
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Capture memories from your journey
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input className="input" placeholder="Trip title" value={title} onChange={(e) => setTitle(e.target.value)} required />

            <div className="grid grid-cols-2 gap-3">
              <input className="input" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
              <input className="input" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>

            <input type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} required />

            <textarea
              className="input resize-none h-28"
              placeholder="Describe your trip experience..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            {/* Stylish Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cover Image
              </label>

              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />

              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
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

            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition disabled:opacity-60"
            >
              {submitting ? "Publishing..." : "Publish Trip"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
