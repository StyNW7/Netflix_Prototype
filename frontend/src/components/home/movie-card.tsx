"use client"

import { useState } from "react"
import { Play, Plus, ThumbsUp } from "lucide-react"

interface MovieCardProps {
  movie: {
    id: string
    title: string
    image: string
    rating: string
    year: number
    duration: string
    genres: string[]
  }
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="shrink-0 group/card"
    >
      {/* Card Container */}
      <div
        className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 ${isHovered ? "scale-150 z-20 shadow-2xl" : "w-40 sm:w-44 md:w-48"}`}
      >
        {/* Image */}
        <img
          src={movie.image || "/placeholder.svg"}
          alt={movie.title}
          className="w-full h-56 object-cover group-hover/card:brightness-110 transition-all duration-300"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

        {/* Hover Content - Only show on hover */}
        {isHovered && (
          <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between bg-gradient-to-t from-black via-black/50 to-transparent animate-fadeInUp">
            {/* Header */}
            <div className="space-y-1">
              <h3 className="font-bold text-sm sm:text-base line-clamp-2">{movie.title}</h3>
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 bg-white/20 rounded">{movie.rating}</span>
                <span>{movie.year}</span>
              </div>
            </div>

            {/* Genres and Duration */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-1">
                {movie.genres.map((genre) => (
                  <span key={genre} className="text-xs bg-white/10 px-2 py-1 rounded">
                    {genre}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-4 gap-2 pt-2">
                <button className="col-span-2 flex items-center justify-center gap-1 bg-white text-black px-3 py-2 rounded font-semibold hover:bg-white/80 transition-colors text-xs sm:text-sm">
                  <Play size={16} fill="currentColor" />
                  <span>Play</span>
                </button>
                <button className="flex items-center justify-center bg-white/20 hover:bg-white/30 p-2 rounded transition-colors">
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center justify-center p-2 rounded transition-colors ${isLiked ? "bg-primary" : "bg-white/20 hover:bg-white/30"}`}
                >
                  <ThumbsUp size={16} fill={isLiked ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Duration */}
              <p className="text-xs text-gray-300">{movie.duration}</p>
            </div>
          </div>
        )}
      </div>

      {/* Title Below Card (when not hovered) */}
      {!isHovered && (
        <p className="text-xs sm:text-sm font-medium mt-2 line-clamp-2 w-40 sm:w-44 md:w-48">{movie.title}</p>
      )}
    </div>
  )
}
