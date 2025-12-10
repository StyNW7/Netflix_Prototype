"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface GenreMenuProps {
  activeGenre: string
  genres: string[]
  onGenreChange: (genre: string) => void
}

export default function GenreMenu({ activeGenre, genres, onGenreChange }: GenreMenuProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-4">
      <div className="flex items-center gap-4">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll("left")}
          className="hidden sm:flex shrink-0 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Genre Scroll Container */}
        <div ref={scrollRef} className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreChange(genre.toLowerCase())}
              className={`shrink-0 px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                activeGenre === genre.toLowerCase()
                  ? "bg-primary text-white"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll("right")}
          className="hidden sm:flex shrink-0 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
