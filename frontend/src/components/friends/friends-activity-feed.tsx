/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Star, Play, ThumbsUp, BadgeCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ActivityFeedProps {
  filter: string
}

export default function FriendsActivityFeed({ filter }: ActivityFeedProps) {
  const activities = mockActivities.filter((activity) => {
    if (filter === "all") return true
    return activity.type === filter
  })

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  )
}

function ActivityCard({ activity }: { activity: any }) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="glass-effect rounded-xl p-6 hover:bg-white/5 transition-all duration-300 group animate-fadeInUp">
      <div className="flex gap-4">
        {/* Left: Friend Avatar & Info */}
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              src={activity.user.avatar || "/placeholder.svg"}
              alt={activity.user.name}
              className="w-12 h-12 rounded-full"
            />
            {activity.user.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                <BadgeCheck size={12} className="text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Middle: Activity Content */}
        <div className="flex-1 space-y-3">
          {/* User Info & Badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold">{activity.user.name}</span>
            {activity.user.isVerified && (
              <Badge variant="default" className="text-xs">
                Verified Reviewer
              </Badge>
            )}
            {activity.user.tasteMatch && (
              <Badge variant="outline" className="text-xs border-primary text-primary">
                Similar Taste {activity.user.tasteMatch}%
              </Badge>
            )}
            <span className="text-xs text-muted-foreground">• {activity.timestamp}</span>
          </div>

          {/* Activity Message */}
          <p className="text-sm text-muted-foreground">
            {activity.type === "watching" && `is watching ${activity.content.title}`}
            {activity.type === "rated" && `rated ${activity.content.title}`}
            {activity.type === "reviewed" && `shared a theory about ${activity.content.title}`}
          </p>

          {/* Content Card */}
          <div className="flex gap-4 bg-black/30 rounded-lg p-4 group-hover:bg-black/40 transition-all">
            {/* Content Poster */}
            <img
              src={activity.content.image || "/placeholder.svg"}
              alt={activity.content.title}
              className="w-24 h-36 object-cover rounded"
            />

            {/* Content Info */}
            <div className="flex-1 space-y-2">
              <h4 className="font-bold text-lg">{activity.content.title}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{activity.content.year}</span>
                <span>•</span>
                <span>{activity.content.genre}</span>
              </div>

              {/* Rating Display */}
              {activity.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < activity.rating ? "text-primary fill-current" : "text-gray-600"}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold">{activity.rating}/5</span>
                </div>
              )}

              {/* Review Text */}
              {activity.review && (
                <p className="text-sm text-muted-foreground line-clamp-2 italic">"{activity.review}"</p>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-red-700 rounded font-semibold text-sm transition-colors">
                  <Play size={16} fill="currentColor" />
                  <span>Play</span>
                </button>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded font-semibold text-sm transition-all ${
                    isLiked
                      ? "bg-primary text-white"
                      : "bg-white/10 hover:bg-white/20 border border-white/30 text-white"
                  }`}
                >
                  <ThumbsUp size={16} className={isLiked ? "fill-current" : ""} />
                  <span>{activity.likes + (isLiked ? 1 : 0)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mock Data
const mockActivities = [
  {
    id: 1,
    type: "watching",
    user: {
      name: "Alex Rivera",
      avatar: "/alex-avatar.jpg",
      isVerified: false,
      tasteMatch: 82,
    },
    content: {
      title: "Dark (Season 2)",
      year: 2024,
      genre: "Sci-Fi Thriller",
      image: "/dark-poster.jpg",
    },
    timestamp: "15 minutes ago",
    likes: 12,
  },
  {
    id: 2,
    type: "rated",
    user: {
      name: "Maria Santos",
      avatar: "/maria-avatar.jpg",
      isVerified: true,
      tasteMatch: 91,
    },
    content: {
      title: "Dune: Part Two",
      year: 2024,
      genre: "Epic Sci-Fi",
      image: "/dune-poster.jpg",
    },
    rating: 5,
    timestamp: "1 hour ago",
    likes: 28,
  },
  {
    id: 3,
    type: "reviewed",
    user: {
      name: "James Chen",
      avatar: "/james-avatar.jpg",
      isVerified: true,
      tasteMatch: 76,
    },
    content: {
      title: "Interstellar",
      year: 2014,
      genre: "Sci-Fi Drama",
      image: "/interstellar-poster.jpg",
    },
    review: "The time dilation theory is actually based on real physics. Here's why Cooper's journey works...",
    timestamp: "3 hours ago",
    likes: 45,
  },
  {
    id: 4,
    type: "watching",
    user: {
      name: "Sarah Johnson",
      avatar: "/sarah-avatar.jpg",
      isVerified: false,
      tasteMatch: 88,
    },
    content: {
      title: "Stranger Things (Season 4)",
      year: 2024,
      genre: "Horror Mystery",
      image: "/stranger-things-poster.jpg",
    },
    timestamp: "5 hours ago",
    likes: 19,
  },
  {
    id: 5,
    type: "rated",
    user: {
      name: "David Kim",
      avatar: "/david-avatar.jpg",
      isVerified: true,
      tasteMatch: 95,
    },
    content: {
      title: "The Crown",
      year: 2024,
      genre: "Historical Drama",
      image: "/crown-poster.jpg",
    },
    rating: 4,
    timestamp: "1 day ago",
    likes: 34,
  },
]
