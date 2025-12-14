"use client"

import { Filter, MapPin, Eye, EyeOff } from "lucide-react"

interface ForumFiltersProps {
  sortBy: string
  onSortChange: (sort: string) => void
  selectedRegion: string
  onRegionChange: (region: string) => void
  showSpoilers: boolean
  onSpoilerToggle: (show: boolean) => void
}

export default function ForumFilters({
  sortBy,
  onSortChange,
  selectedRegion,
  onRegionChange,
  showSpoilers,
  onSpoilerToggle,
}: ForumFiltersProps) {
  const sortOptions = [
    { value: "trending", label: "Trending" },
    { value: "recent", label: "Most Recent" },
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
  ]

  const regions = [
    { value: "global", label: "Global" },
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "kr", label: "South Korea" },
    { value: "jp", label: "Japan" },
  ]

  return (
    <div className="glass-effect rounded-lg p-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Sort By */}
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-muted-foreground" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-secondary text-foreground">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Region Filter */}
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-muted-foreground" />
          <select
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
          >
            {regions.map((region) => (
              <option key={region.value} value={region.value} className="bg-secondary text-foreground">
                {region.label}
              </option>
            ))}
          </select>
        </div>

        {/* Spoiler Toggle */}
        <button
          onClick={() => onSpoilerToggle(!showSpoilers)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            showSpoilers
              ? "bg-primary text-white"
              : "bg-white/10 hover:bg-white/20 text-muted-foreground hover:text-foreground"
          }`}
        >
          {showSpoilers ? <Eye size={18} /> : <EyeOff size={18} />}
          <span>{showSpoilers ? "Hide Spoilers" : "Show Spoilers"}</span>
        </button>
      </div>
    </div>
  )
}
