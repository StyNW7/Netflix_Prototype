"use client"

import { Film, Tv, TrendingUp, Star, Calendar, MessageSquare, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface ForumSidebarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function ForumSidebar({ selectedCategory, onCategoryChange }: ForumSidebarProps) {
  const categories = [
    { id: "all", label: "All Discussions", icon: MessageSquare, count: 1245 },
    { id: "movies", label: "Movies", icon: Film, count: 432 },
    { id: "shows", label: "TV Shows", icon: Tv, count: 678 },
    { id: "trending", label: "Trending Now", icon: TrendingUp, count: 89 },
    { id: "reviews", label: "Reviews", icon: Star, count: 234 },
    { id: "upcoming", label: "Upcoming", icon: Calendar, count: 56 },
    { id: "community", label: "Community", icon: Users, count: 890 },
  ]

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-20 space-y-6">
        {/* Categories */}
        <div className="glass-effect rounded-lg p-4 space-y-2">
          <h2 className="text-lg font-bold mb-4">Categories</h2>
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all duration-300 group",
                  selectedCategory === category.id
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "hover:bg-white/10 text-muted-foreground hover:text-foreground",
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <span className="text-sm font-medium">{category.label}</span>
                </div>
                <span className="text-xs opacity-70">{category.count}</span>
              </button>
            )
          })}
        </div>

        {/* Forum Stats */}
        <div className="glass-effect rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground">Forum Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Posts</span>
              <span className="font-semibold">12.5K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active Users</span>
              <span className="font-semibold">3.2K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Today's Posts</span>
              <span className="font-semibold text-primary">234</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
