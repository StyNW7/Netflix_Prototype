"use client"

import { useState } from "react"
import { Play, Info, Volume2, VolumeX } from "lucide-react"

export default function FeaturedMovie() {
  const [isMuted, setIsMuted] = useState(true)

  const featured = {
    id: 1,
    title: "Breaking Bad",
    description: "A high school chemistry teacher turned meth cook risks everything to build a drug empire.",
    year: 2024,
    rating: "TV-MA",
    duration: "47m",
    genres: ["Drama", "Crime", "Thriller"],
    image: "/breaking-bad-poster.jpg",
  }

  return (
    <div className="relative w-full h-screen pt-16 overflow-hidden group">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${featured.image}')`,
          filter: "brightness(0.4)",
        }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-start px-6 sm:px-12 lg:px-20">
        <div className="max-w-2xl space-y-6 animate-fadeInUp">
          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight">{featured.title}</h1>
            <p className="text-sm sm:text-base flex gap-3 items-center">
              <span className="px-2 py-1 border border-white/30 rounded text-xs font-semibold">{featured.rating}</span>
              <span>{featured.year}</span>
              <span className="flex items-center gap-1">HD</span>
            </p>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed line-clamp-3">
            {featured.description}
          </p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {featured.genres.map((genre) => (
              <span
                key={genre}
                className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium hover:bg-white/20 transition-colors"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fadeInUp delay-200">
            <button className="group/btn flex items-center justify-center gap-3 bg-white text-black px-8 py-3 rounded font-bold hover:bg-white/80 transition-all duration-300 hover:scale-105">
              <Play size={24} fill="currentColor" />
              <span>Play</span>
            </button>
            <button className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-3 rounded font-bold transition-all duration-300 hover:scale-105">
              <Info size={24} />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mute Button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-8 right-8 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-lg border border-white/20 p-3 rounded-full transition-all duration-300 group-hover:scale-110"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  )
}
