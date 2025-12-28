"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trip } from "@/types/trip";
import { User } from "@/types/user";

export default function TripForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 🔐 Check auth via cookie
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        alert("Login required");
        router.push("/login");
        return;
      }

      const data = await res.json();
      setCurrentUser(data.user);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) return null;

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          location,
          city,
          date,
          description,
          image: image || undefined,
        }),
      });

      if (!res.ok) {
        alert("Failed to publish trip");
        setSubmitting(false);
        return;
      }

      alert("Trip published successfully!");
      router.push("/trips");
    } catch {
      alert("Something went wrong");
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
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative w-full max-w-xl animate-fadeIn">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Write Your Travel Story ✍️
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Capture memories from your journey
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              className="input"
              placeholder="Trip title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-3">
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
            </div>

            <input
              type="date"
              className="input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <textarea
              className="input resize-none h-28"
              placeholder="Describe your trip experience..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <input
              className="input"
              placeholder="Cover image URL (optional)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            {image && (
              <img
                src={image}
                alt="Preview"
                className="w-full h-40 object-cover rounded-md border mt-2"
              />
            )}

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
