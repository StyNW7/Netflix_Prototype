"use client"

import { Play, Info } from "lucide-react"

export default function HeroSection() {
  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 animate-fadeInUp">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
          <span className="netflix-text">UNLIMITED</span>
          <br />
          <span>Entertainment Awaits</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fadeInUp delay-100">
          Stream thousands of movies and TV shows in HD, 4K, and beyond. No ads, no commitments. Cancel anytime.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fadeInUp delay-200">
          <button className="group bg-primary hover:bg-red-700 text-white px-8 py-4 rounded font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105">
            <Play size={20} />
            Watch Now
          </button>
          <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105">
            <Info size={20} />
            Learn More
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="text-white/50 text-xs">Scroll to explore</div>
      </div>
    </section>
  )
}
