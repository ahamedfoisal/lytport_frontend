'use client'

import React from 'react'
import Image from 'next/image'

const HeroSection: React.FC = () => {
  return (
    <div className="relative flex items-center justify-between h-screen overflow-hidden bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
      {/* Text Content */}
      <div className="container mx-auto px-8 lg:px-16 z-10 flex flex-col lg:flex-row items-center justify-between">
        <div className="max-w-lg mt-10 text-center lg:text-left">
          <h1 className="text-5xl font-bold text-gray-800 leading-tight">
            Make actual informed decisions.
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            Lytport helps influencers, content creators, and marketers optimize
            their social media strategies with personalized, data-driven insights.
          </p>
          <div className="mt-8 flex flex-col lg:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="/sign-up"
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="bg-white text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 transition-all"
            >
              Learn More →
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="absolute right-0 bottom-0 lg:translate-x-16 translate-y-16 scale-[1.1] w-[200%] max-w-[900px]">
          <Image
            src="/landing.png"
            alt="Lytport Dashboard Screenshot"
            width={1900}
            height={1080}
            
            priority
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection