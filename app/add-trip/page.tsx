import TripForm from "@/components/TripForm";

export default function AddTrip() {
  return (
    <main className="p-6 bg-white dark:bg-gray-900 text-black dark:text-white">
      <h2 className="text-xl font-bold mb-4">Add New Trip</h2>
      <TripForm />
    </main>
  );
}
