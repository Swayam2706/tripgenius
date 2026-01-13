import React from 'react';
import Button from '../ui/button'
import {Link} from "react-router-dom"
import { Globe, Compass, Sparkles, ArrowRight } from 'lucide-react'

function Hero() {
    return (
        <div className='relative h-screen flex flex-col items-center justify-center overflow-hidden'>
            {/* Animated Background Gradient */}
            <div className='absolute inset-0 bg-gradient-to-br from-[#f8f9fa] via-white to-[#e8f4f8] animate-gradient'></div>
            
            {/* Decorative Elements - Smaller and positioned better */}
            <div className='absolute top-10 left-5 sm:left-10 w-48 sm:w-56 h-48 sm:h-56 bg-[#f39c12]/10 rounded-full blur-3xl animate-float'></div>
            <div className='absolute bottom-10 right-5 sm:right-10 w-56 sm:w-64 h-56 sm:h-64 bg-[#3498db]/10 rounded-full blur-3xl animate-float animation-delay-300'></div>
            <div className='absolute top-1/2 left-1/4 w-40 sm:w-48 h-40 sm:h-48 bg-[#27ae60]/10 rounded-full blur-3xl animate-float animation-delay-200'></div>

            {/* Content Container - Compact and Centered */}
            <div className='relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col items-center justify-center text-center space-y-4 sm:space-y-5 md:space-y-6'>
                    {/* Logo Icons Animation - Smaller */}
                    <div className='flex items-center justify-center gap-3 animate-fade-in-up'>
                        <div className='p-2.5 sm:p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#f39c12]/20 animate-pulse-glow'>
                            <Globe className='w-6 h-6 sm:w-7 sm:h-7 text-[#f39c12]' />
                        </div>
                        <div className='w-1.5 h-1.5 bg-[#f39c12] rounded-full animate-pulse'></div>
                        <div className='p-2.5 sm:p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#3498db]/20'>
                            <Compass className='w-6 h-6 sm:w-7 sm:h-7 text-[#3498db]' />
                        </div>
                    </div>

                    {/* Main Heading - More Compact */}
                    <h1 className='font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center leading-tight animate-fade-in-up animation-delay-150 px-4'>
                        <span className='block text-[#2c3e50] mb-1'>Discover Your Next Adventure with</span>
                        <span className='block bg-gradient-to-r from-[#2c3e50] via-[#f39c12] to-[#2c3e50] bg-clip-text text-transparent animate-gradient my-1'>
                            AI : Personalized Trips
                        </span>
                        <span className='block text-[#2c3e50] mt-1'>at Your Fingertips</span>
                    </h1>

                    {/* Subtitle - More Compact */}
                    <p className='text-base sm:text-lg md:text-xl text-gray-600 text-center max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-300 px-4'>
                        Plan stress-free trips with AI that understands your preferences.
                        Get personalized itineraries, smart recommendations, and seamless travel planning—all in one place.
                    </p>

                    {/* Features - Compact */}
                    <div className='flex flex-wrap items-center justify-center gap-3 sm:gap-4 animate-fade-in-up animation-delay-400 px-4'>
                        <div className='flex items-center gap-2 px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full border border-[#f39c12]/20 hover:bg-white/80 transition-all duration-300 hover:scale-105'>
                            <Sparkles className='w-4 h-4 text-[#f39c12]' />
                            <span className='text-xs sm:text-sm font-medium text-[#2c3e50]'>AI-Powered</span>
                        </div>
                        <div className='flex items-center gap-2 px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full border border-[#3498db]/20 hover:bg-white/80 transition-all duration-300 hover:scale-105'>
                            <Globe className='w-4 h-4 text-[#3498db]' />
                            <span className='text-xs sm:text-sm font-medium text-[#2c3e50]'>Global Destinations</span>
                        </div>
                        <div className='flex items-center gap-2 px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full border border-[#27ae60]/20 hover:bg-white/80 transition-all duration-300 hover:scale-105'>
                            <Compass className='w-4 h-4 text-[#27ae60]' />
                            <span className='text-xs sm:text-sm font-medium text-[#2c3e50]'>Personalized</span>
                        </div>
                    </div>

                    {/* CTA Button - Compact */}
                    <div className='mt-4 sm:mt-5 animate-fade-in-up animation-delay-500'>
                        <Link to={"/create-trip"}>
                            <Button className='group relative px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r from-[#f39c12] to-[#e67e22] text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden'>
                                <span className='relative z-10 flex items-center gap-2'>
                                    Get Started, it's Free
                                    <ArrowRight className='w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform' />
                                </span>
                                <div className='absolute inset-0 bg-gradient-to-r from-[#e67e22] to-[#f39c12] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero