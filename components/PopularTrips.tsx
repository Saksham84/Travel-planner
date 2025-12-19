import { MapPin, Calendar } from 'lucide-react';
// import { Card } from './ui/card';

const trips = [
  {
    id: 1,
    destination: 'Bali, Indonesia',
    city: 'Ubud & Seminyak',
    date: 'March 15 - 25, 2025',
    image: 'https://images.unsplash.com/photo-1581665334521-ac9a6f6b4be1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdGVtcGxlJTIwdHJhdmVsfGVufDF8fHx8MTc2NjA0MTc0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 2,
    destination: 'Santorini, Greece',
    city: 'Oia & Fira',
    date: 'June 10 - 18, 2025',
    image: 'https://images.unsplash.com/photo-1618478650011-49268f7bdf2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjB3aGl0ZXxlbnwxfHx8fDE3NjYwNDE3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    destination: 'Tokyo, Japan',
    city: 'Shibuya & Shinjuku',
    date: 'April 5 - 15, 2025',
    image: 'https://images.unsplash.com/photo-1640871426525-a19540c45a39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFuJTIwY2l0eXxlbnwxfHx8fDE3NjU5NjM0NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 4,
    destination: 'Paris, France',
    city: 'Eiffel Tower & Louvre',
    date: 'May 20 - 28, 2025',
    image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2NTk0NjgwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 5,
    destination: 'Maldives',
    city: 'Malé & Resort Islands',
    date: 'July 12 - 22, 2025',
    image: 'https://images.unsplash.com/photo-1607849973250-9da34ea0e59a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMGJlYWNoJTIwcGFyYWRpc2V8ZW58MXx8fHwxNzY2MDQxNzUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 6,
    destination: 'Iceland',
    city: 'Reykjavik & Northern Lights',
    date: 'September 8 - 16, 2025',
    image: 'https://images.unsplash.com/photo-1488415032361-b7e238421f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VsYW5kJTIwbm9ydGhlcm4lMjBsaWdodHN8ZW58MXx8fHwxNzY1OTY2NTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'from-violet-500 to-purple-500',
  },
];

export function PopularTrips() {
  return (
    <section id="trips" className="py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-teal-100 dark:bg-teal-900/30 rounded-full">
            <span className="text-teal-600 dark:text-teal-400 text-sm">Popular Destinations</span>
          </div>
          <h2 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
            Trending Travel Plans
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover where fellow travelers are heading next and get inspired for your own adventures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer rounded-3xl bg-white dark:bg-gray-800"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={trip.image}
                  alt={trip.destination}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Gradient Badge */}
                <div className={`absolute top-4 right-4 px-4 py-2 bg-gradient-to-r ${trip.color} rounded-full shadow-lg`}>
                  <span className="text-white text-sm">Featured</span>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl mb-2 group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                    {trip.destination}
                  </h3>
                  <div className="flex items-center gap-2 mb-3 text-white/90">
                    <MapPin size={16} />
                    <span className="text-sm">{trip.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Calendar size={16} />
                    <span className="text-sm">{trip.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}