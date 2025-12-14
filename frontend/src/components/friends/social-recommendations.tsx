/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight, Users, BadgeCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function SocialRecommendations() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="space-y-4 animate-fadeInUp">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Recommended by Friends</h2>
          <p className="text-sm text-muted-foreground mt-1">Based on what your friends are watching</p>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative group">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Movies Scroll */}
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {mockRecommendations.map((movie) => (
            <RecommendationCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  )
}

function RecommendationCard({ movie }: { movie: any }) {
  return (
    <div className="shrink-0 w-48 group/card cursor-pointer">
      <div className="relative overflow-hidden rounded-lg transition-all duration-300 group-hover/card:scale-105">
        <img src={movie.image || "/placeholder.svg"} alt={movie.title} className="w-full h-72 object-cover" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 space-y-2">
          <Badge variant="default" className="flex items-center gap-1 w-fit">
            <Users size={12} />
            {movie.friendsWatched} friends
          </Badge>
          {movie.verifiedReviewers > 0 && (
            <Badge variant="outline" className="flex items-center gap-1 w-fit border-primary text-primary bg-black/60">
              <BadgeCheck size={12} />
              {movie.verifiedReviewers} verified
            </Badge>
          )}
        </div>

        {/* Info on Hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
          <h4 className="font-bold text-sm line-clamp-2">{movie.title}</h4>
          <p className="text-xs text-muted-foreground mt-1">{movie.year}</p>
        </div>
      </div>
    </div>
  )
}

const mockRecommendations = [
  {
    id: 1,
    title: "Breaking Bad",
    year: 2024,
    image: "/breaking-bad.jpg",
    friendsWatched: 12,
    verifiedReviewers: 5,
  },
  {
    id: 2,
    title: "The Witcher",
    year: 2024,
    image: "/the-witcher.jpg",
    friendsWatched: 8,
    verifiedReviewers: 3,
  },
  {
    id: 3,
    title: "Squid Game",
    year: 2024,
    image: "/squid-game.jpg",
    friendsWatched: 15,
    verifiedReviewers: 7,
  },
  {
    id: 4,
    title: "Wednesday",
    year: 2024,
    image: "/wednesday.jpg",
    friendsWatched: 6,
    verifiedReviewers: 2,
  },
  {
    id: 5,
    title: "Peaky Blinders",
    year: 2024,
    image: "/peaky-blinders.jpg",
    friendsWatched: 9,
    verifiedReviewers: 4,
  },
  {
    id: 6,
    title: "Narcos",
    year: 2024,
    image: "/placeholder.svg?height=288&width=192",
    friendsWatched: 11,
    verifiedReviewers: 6,
  },
]
