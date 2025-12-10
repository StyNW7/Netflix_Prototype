"use client"

import { useState } from "react"
import { Menu, X, Flame, TrendingUp, Play, Zap, Clock, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface FYPSidebarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function FYPSidebar({ selectedCategory, onCategoryChange }: FYPSidebarProps) {
  const [isOpen, setIsOpen] = useState(true)

  const categories = [
    { id: "all", label: "For You", icon: Play },
    { id: "trending", label: "Trending", icon: Flame },
    { id: "shows", label: "Shows", icon: TrendingUp },
    { id: "action", label: "Action", icon: Zap },
    { id: "drama", label: "Drama", icon: Heart },
    { id: "recently-added", label: "Recently Added", icon: Clock },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col w-64 bg-secondary/50 backdrop-blur-sm border-r border-white/10 transition-all duration-300 overflow-hidden",
          !isOpen && "w-20",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h1 className={cn("netflix-text text-xl transition-all", !isOpen && "hidden")}>FYP</h1>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Categories */}
        <nav className="flex-1 p-4 space-y-2">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                    : "hover:bg-white/10 text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span className={cn("transition-all", !isOpen && "hidden")}>{category.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Footer Info */}
        <div className={cn("p-6 border-t border-white/10 space-y-3", !isOpen && "hidden")}>
          <div className="text-xs text-muted-foreground space-y-2">
            <p>💡 Swipe or scroll to explore</p>
            <p>🔍 Use search to find shows</p>
          </div>
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-20 left-4 z-40 p-2 bg-primary hover:bg-red-700 text-white rounded-lg transition-colors"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-black/80 backdrop-blur-sm z-30">
          <aside className="w-64 h-full bg-secondary/95 backdrop-blur-sm border-r border-white/10 flex flex-col p-4">
            <h1 className="netflix-text text-xl mb-6">FYP Menu</h1>
            <nav className="flex-1 space-y-2">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      onCategoryChange(category.id)
                      setIsOpen(false)
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                      selectedCategory === category.id ? "bg-primary text-primary-foreground" : "hover:bg-white/10",
                    )}
                  >
                    <Icon size={20} />
                    <span>{category.label}</span>
                  </button>
                )
              })}
            </nav>
          </aside>
        </div>
      )}
    </>
  )
}
