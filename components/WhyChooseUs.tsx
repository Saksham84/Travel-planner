import { Check, Zap, Shield, Users } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Create and manage trips in seconds with our intuitive interface',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your travel data is encrypted and protected at all times',
  },
  {
    icon: Users,
    title: 'Share with Friends',
    description: 'Collaborate on trips and share itineraries with travel companions',
  },
];

export function WhyChooseUs() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div>
            <div className="inline-block mb-4 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <span className="text-purple-600 dark:text-purple-400 text-sm">Why Choose Us</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent leading-tight">
              Travel Planning Made Simple
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
              We've built the most intuitive and beautiful travel planning experience. 
              Whether you're planning a weekend getaway or a month-long adventure, 
              we've got everything you need in one place.
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex gap-4 items-start group">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/30">
                      <Icon className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl mb-2 text-gray-900 dark:text-gray-100">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 flex flex-wrap gap-8">
              <div>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
                  <Check size={20} />
                  <span className="text-gray-900 dark:text-gray-100">No credit card required</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
                  <Check size={20} />
                  <span className="text-gray-900 dark:text-gray-100">Free forever plan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual/Illustration */}
          <div className="relative">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-teal-50 to-cyan-100 dark:from-blue-900/30 dark:via-teal-900/20 dark:to-cyan-900/30 rounded-3xl transform rotate-3"></div>
            
            {/* Main Image Container */}
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1747137657525-314555571794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2l0emVybGFuZCUyMG1vdW50YWlucyUyMGFscHN8ZW58MXx8fHwxNzY2MDQxNzU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Switzerland Alps"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-700 rounded-2xl shadow-2xl p-6 max-w-xs">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl"></div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Next Trip</div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">Swiss Alps</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Decorative Dots */}
            <div className="absolute -top-8 -right-8 w-32 h-32 opacity-30">
              <div className="grid grid-cols-4 gap-3">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}