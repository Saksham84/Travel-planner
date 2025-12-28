import TripForm from "@/components/TripForm";

export default function AddTrip() {
  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 px-4 md:px-12 py-24">
      
      {/* Page Header */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
          Add New Trip
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Write and publish your travel story
        </p>
      </div>

      {/* Full-width Form Container */}
      <div className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 md:p-10">
        <TripForm />
      </div>

    </section>
  );
}
