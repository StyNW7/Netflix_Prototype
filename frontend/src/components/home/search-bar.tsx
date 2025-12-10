"use client"

import { Search, X } from "lucide-react"
import { useState, useEffect } from "react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`sticky top-16 z-40 transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-lg border-b border-white/10 py-3" : "bg-transparent py-6"}`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="relative group">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 group-focus-within:text-primary transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Search movies, shows, actors..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 focus:border-primary rounded-lg px-12 py-3 text-white placeholder:text-white/40 transition-all duration-300 focus:outline-none"
          />
          {value && (
            <button
              onClick={() => onChange("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
