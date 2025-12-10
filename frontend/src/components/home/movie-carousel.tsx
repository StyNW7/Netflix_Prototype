/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import MovieCard from "./movie-card"
import MovieCardSkeleton from "./movie-card-skeleton"

interface MovieCarouselProps {
  title: string
  genreId: string
}

export default function MovieCarousel({ title, genreId }: MovieCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [movies, setMovies] = useState<any[]>([])

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setMovies(generateMovies(genreId))
      setIsLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [genreId])

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
    <section className="relative group mb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        {/* Section Title */}
        <h2 className="text-xl sm:text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{title}</h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-8 top-1/2 transform -translate-y-1/2 z-10 hidden group-hover:flex p-2 rounded-full bg-black/60 hover:bg-black/80 transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Movies Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollBehavior: "smooth" }}
          >
            {isLoading
              ? // Show skeletons while loading
                Array.from({ length: 8 }).map((_, i) => <MovieCardSkeleton key={i} />)
              : // Show movie cards when loaded
                movies.map((movie, index) => <MovieCard key={`${genreId}-${index}`} movie={movie} />)}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-8 top-1/2 transform -translate-y-1/2 z-10 hidden group-hover:flex p-2 rounded-full bg-black/60 hover:bg-black/80 transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}

// Generate mock movies
function generateMovies(genreId: string) {
  const movieTitles = [
    "Breaking Bad",
    "Stranger Things",
    "The Crown",
    "Squid Game",
    "Wednesday",
    "The Witcher",
    "Peaky Blinders",
    "Narcos",
  ]

  return Array.from({ length: 10 }).map((_, i) => ({
    id: `${genreId}-${i}`,
    title: movieTitles[i % movieTitles.length],
    image: `/placeholder.svg?height=300&width=200&query=${movieTitles[i % movieTitles.length]}-poster`,
    rating: ["PG", "PG-13", "R", "TV-14", "TV-MA"][Math.floor(Math.random() * 5)],
    year: 2023 + Math.floor(Math.random() * 2),
    duration: `${45 + Math.floor(Math.random() * 90)}m`,
    genres: ["Drama", "Action", "Thriller", "Comedy"].slice(0, 2),
  }))
}
