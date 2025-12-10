"use client"

import { Search, X } from "lucide-react"

interface FYPSearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function FYPSearchBar({ searchQuery, onSearchChange }: FYPSearchBarProps) {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4 border-b border-white/10 bg-secondary/30 backdrop-blur-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto flex items-center gap-3 bg-secondary/50 border border-white/20 rounded-lg px-4 py-2 hover:border-white/40 transition-colors focus-within:border-primary/50">
        <Search size={20} className="text-muted-foreground" />
        <input
          type="text"
          placeholder="Search shows, movies, clips..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none text-sm"
        />
        {searchQuery && (
          <button onClick={() => onSearchChange("")} className="p-1 hover:bg-white/10 rounded transition-colors">
            <X size={18} className="text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  )
}
