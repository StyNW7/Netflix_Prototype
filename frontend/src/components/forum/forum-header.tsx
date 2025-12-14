"use client"

import { Search, X } from "lucide-react"

interface ForumHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function ForumHeader({ searchQuery, onSearchChange }: ForumHeaderProps) {
  return (
    <div className="relative w-full h-64 pt-16 overflow-hidden">
      {/* Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-secondary to-black" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 space-y-6">
        <div className="text-center space-y-2 animate-fadeInUp">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            <span className="netflix-text">Netflix</span> Film Forum
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discuss, rate, and share your thoughts about your favorite movies and shows
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl animate-fadeInUp delay-100">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search discussions, movies, users..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 focus:border-primary rounded-lg px-12 py-3 text-white placeholder:text-white/40 transition-all duration-300 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
