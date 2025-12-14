/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { UserPlus, TrendingUp, BadgeCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function TasteMatchPanel() {
  return (
    <div className="glass-effect rounded-xl p-6 space-y-6 animate-fadeInUp">
      <div>
        <h3 className="text-xl font-bold mb-2">Suggested Friends</h3>
        <p className="text-sm text-muted-foreground">People with similar taste</p>
      </div>

      <div className="space-y-4">
        {mockSuggestions.map((user) => (
          <UserSuggestionCard key={user.id} user={user} />
        ))}
      </div>

      <button className="w-full py-2 text-sm text-primary hover:text-red-600 font-semibold transition-colors">
        View All Suggestions →
      </button>
    </div>
  )
}

function UserSuggestionCard({ user }: { user: any }) {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="flex gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-12 h-12 rounded-full" />
        {user.isVerified && (
          <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5">
            <BadgeCheck size={10} className="text-white" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-sm truncate">{user.name}</h4>
          {user.isVerified && <Badge className="text-xs px-1 py-0">Verified</Badge>}
        </div>

        {/* Taste Match */}
        <div className="flex items-center gap-1 text-xs text-primary mb-2">
          <TrendingUp size={12} />
          <span className="font-semibold">{user.tasteMatch}% taste match</span>
        </div>

        {/* Top Genres */}
        <div className="flex gap-1 flex-wrap">
          {user.topGenres.slice(0, 2).map((genre: string) => (
            <span key={genre} className="text-xs px-2 py-0.5 bg-white/10 rounded">
              {genre}
            </span>
          ))}
        </div>
      </div>

      {/* Follow Button */}
      <button
        onClick={() => setIsFollowing(!isFollowing)}
        className={`flex-shrink-0 px-3 py-1.5 rounded font-semibold text-xs transition-all ${
          isFollowing
            ? "bg-white/10 hover:bg-white/20 border border-white/30"
            : "bg-primary hover:bg-red-700 text-white"
        }`}
      >
        {isFollowing ? "Following" : <UserPlus size={14} />}
      </button>
    </div>
  )
}

const mockSuggestions = [
  {
    id: 1,
    name: "Emily Parker",
    avatar: "/placeholder.svg?height=48&width=48",
    isVerified: true,
    tasteMatch: 94,
    topGenres: ["Sci-Fi", "Thriller", "Drama"],
  },
  {
    id: 2,
    name: "Michael Chang",
    avatar: "/placeholder.svg?height=48&width=48",
    isVerified: false,
    tasteMatch: 89,
    topGenres: ["Action", "Adventure", "Fantasy"],
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    avatar: "/placeholder.svg?height=48&width=48",
    isVerified: true,
    tasteMatch: 87,
    topGenres: ["Drama", "Romance", "Comedy"],
  },
  {
    id: 4,
    name: "Ryan Lee",
    avatar: "/placeholder.svg?height=48&width=48",
    isVerified: false,
    tasteMatch: 85,
    topGenres: ["Horror", "Mystery", "Thriller"],
  },
]
