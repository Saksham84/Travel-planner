import Hero from '@/components/Hero';
import { PopularTrips } from '@/components/PopularTrips';
import { WhyChooseUs } from '@/components/WhyChooseUs';

export default function Home() {
  return (
    // <main className="p-6 bg-white dark:bg-gray-900 text-black dark:text-white">
    <main>
      {/* <h2 className="text-2xl font-bold mb-4">
        Welcome to Travel Planner 
      </h2>
      <p>
        Plan your trips, save destinations, and view them in one place.
      </p> */}
      <Hero />
      <PopularTrips />
      <WhyChooseUs />
    </main>
  );
}
