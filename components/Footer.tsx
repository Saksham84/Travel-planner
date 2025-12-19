import React from 'react'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className='bg-gray-50 dark:bg-gray-900 border-t border-gray-200 ddark:border-gray-800 py-12 lg:py-16'>
            <div className='container mx-auto px-4 lg:px-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
                    <div className='lg: col-span-2'>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-teal-500 to-cyan-500 rounded-xl shadow-lg shadow-blue-500/30"></div>
                            <span className="font-semibold text-2xl bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">TripPlanner</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
                            The simplest way to plan, organize, and manage all your travel adventures.
                            Start your journey with us today.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-teal-500 hover:text-white hover:border-transparent transition-all shadow-sm hover:shadow-lg"
                                aria-label="Facebook"
                            >
                                <Facebook size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-teal-500 hover:text-white hover:border-transparent transition-all shadow-sm hover:shadow-lg"
                                aria-label="Instagram"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-teal-500 hover:text-white hover:border-transparent transition-all shadow-sm hover:shadow-lg"
                                aria-label="Twitter"
                            >
                                <Twitter size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-teal-500 hover:text-white hover:border-transparent transition-all shadow-sm hover:shadow-lg"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-gray-900 dark:text-gray-100 mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#home" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#features" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#trips" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Trips
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    About
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gray-900 dark:text-gray-100 mb-4">Resources</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-600 dark:text-gray-400 text-center md:text-left">
                            © 2025 TripPlanner. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                Privacy
                            </a>
                            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                Terms
                            </a>
                            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                Cookies
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
