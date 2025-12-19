"use client";

import React from 'react'
import { Plus, Compass } from 'lucide-react'
import { useRouter } from 'next/navigation';

export default function Hero() {
    const router = useRouter();

    return (
        <section id='home' className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1732383968793-5ae0bca0d79b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBsYW5kc2NhcGUlMjB0cmF2ZWx8ZW58MXx8fHwxNzY2MDQxNzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Beautiful travel destination"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-teal-900/50 to-cyan-900/60"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center pt-20 pb-32">
                <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    <span className="text-white/90 text-sm">✨ Your Journey Starts Here</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 max-w-5xl mx-auto text-white leading-tight">
                    Plan Your Trips.<br />
                    <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
                        Capture Your Memories.
                    </span>
                </h1>

                <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white/90">
                    Create, organize, and manage all your travel adventures in one beautiful place. Start planning your next destination today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => router.push('/add-trip')}
                        className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8 py-4 text-lg shadow-2xl shadow-blue-900/50 gap-2 flex items-center"
                    >
                        <Plus size={20} />
                        Add a Trip
                    </button>
                    <button
                        onClick={() => router.push('/trips')}
                        className="bg-transparent hover:bg-white/10 text-white border-2 border-white/30 rounded-full px-8 py-4 text-lg backdrop-blur-sm gap-2 flex items-center"
                    >
                        <Compass size={20} />
                        Explore Trips
                    </button>
                </div>

                {/* Stats */}
                <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl text-white mb-2">10K+</div>
                        <div className="text-white/70">Travelers</div>
                    </div>
                    <div className="text-center border-x border-white/20">
                        <div className="text-4xl md:text-5xl text-white mb-2">50K+</div>
                        <div className="text-white/70">Trips Planned</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl text-white mb-2">180+</div>
                        <div className="text-white/70">Countries</div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce"></div>
                </div>
            </div>
        </section>
    )
}
