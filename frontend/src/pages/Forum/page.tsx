"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ForumSidebar from "@/components/forum/forum-sidebar"
import ForumHeader from "@/components/forum/forum-header"
import ForumFilters from "@/components/forum/forum-filters"
import ForumPostCard from "@/components/forum/forum-post-card"
import CreatePostButton from "@/components/forum/create-post-button"
import TrendingTopics from "@/components/forum/trending-topics"

export default function ForumPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("global")
  const [showSpoilers, setShowSpoilers] = useState(false)
  const [sortBy, setSortBy] = useState("trending")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Forum Header */}
      <ForumHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <ForumSidebar selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Filters */}
            <ForumFilters
              sortBy={sortBy}
              onSortChange={setSortBy}
              selectedRegion={selectedRegion}
              onRegionChange={setSelectedRegion}
              showSpoilers={showSpoilers}
              onSpoilerToggle={setShowSpoilers}
            />

            {/* Create Post Button */}
            <CreatePostButton />

            {/* Forum Posts */}
            <div className="space-y-4">
              {mockPosts
                .filter((post) => {
                  const categoryMatch = selectedCategory === "all" || post.category === selectedCategory
                  const searchMatch =
                    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.content.toLowerCase().includes(searchQuery.toLowerCase())
                  const spoilerMatch = showSpoilers || !post.hasSpoiler
                  const regionMatch = selectedRegion === "global" || post.region === selectedRegion
                  return categoryMatch && searchMatch && spoilerMatch && regionMatch
                })
                .map((post) => (
                  <ForumPostCard key={post.id} post={post} />
                ))}
            </div>
          </div>

          {/* Right Sidebar - Trending Topics */}
          <TrendingTopics />
        </div>
      </div>

      <Footer />
    </div>
  )
}

// Mock forum posts data
const mockPosts = [
  {
    id: 1,
    title: "Breaking Bad Series Finale - What a masterpiece!",
    content:
      "Just finished watching the series finale and I'm blown away. The character development throughout 5 seasons was absolutely perfect. What did you all think?",
    author: {
      name: "WalterWhiteFan",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
      reputation: 2850,
    },
    category: "shows",
    region: "us",
    likes: 342,
    comments: 89,
    views: 1520,
    rating: 5,
    hasSpoiler: false,
    createdAt: "2 hours ago",
    tags: ["Breaking Bad", "Drama", "Series Finale"],
  },
  {
    id: 2,
    title: "[SPOILER] Stranger Things S5 - Mind Blowing Theory",
    content:
      "I think Eleven might sacrifice herself in the final season to close the Upside Down permanently. Here's why this makes sense...",
    author: {
      name: "UpsideDownExplorer",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
      reputation: 450,
    },
    category: "shows",
    region: "global",
    likes: 156,
    comments: 42,
    views: 890,
    rating: 4.5,
    hasSpoiler: true,
    createdAt: "5 hours ago",
    tags: ["Stranger Things", "Theory", "Season 5"],
  },
  {
    id: 3,
    title: "Top 10 Most Underrated Netflix Films of 2024",
    content:
      "Let's talk about hidden gems! Here are my picks for the most underrated films that deserve more attention. What would you add to this list?",
    author: {
      name: "CinematicCritic",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
      reputation: 5200,
    },
    category: "movies",
    region: "global",
    likes: 528,
    comments: 124,
    views: 2340,
    rating: 4.8,
    hasSpoiler: false,
    createdAt: "1 day ago",
    tags: ["Recommendations", "2024", "Hidden Gems"],
  },
  {
    id: 4,
    title: "The Crown - Historical Accuracy Discussion",
    content:
      "How accurate is The Crown really? Let's discuss the historical events portrayed vs what actually happened. Historians welcome!",
    author: {
      name: "HistoryBuff2024",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
      reputation: 1850,
    },
    category: "shows",
    region: "uk",
    likes: 267,
    comments: 78,
    views: 1120,
    rating: 4.2,
    hasSpoiler: false,
    createdAt: "1 day ago",
    tags: ["The Crown", "History", "Discussion"],
  },
  {
    id: 5,
    title: "Squid Game Season 2 - Release Date Speculation",
    content:
      "With production wrapped, when do you think we'll finally get Season 2? My bet is on Q4 2024. What are your predictions?",
    author: {
      name: "GameMaster456",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
      reputation: 680,
    },
    category: "shows",
    region: "kr",
    likes: 412,
    comments: 156,
    views: 1890,
    rating: 4.6,
    hasSpoiler: false,
    createdAt: "2 days ago",
    tags: ["Squid Game", "Season 2", "Release Date"],
  },
  {
    id: 6,
    title: "Best Action Sequences in Netflix Originals",
    content: "Let's rank the best action scenes! My top pick is the corridor fight in Extraction. What are yours?",
    author: {
      name: "ActionJunkie",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
      reputation: 3200,
    },
    category: "movies",
    region: "global",
    likes: 389,
    comments: 92,
    views: 1560,
    rating: 4.7,
    hasSpoiler: false,
    createdAt: "3 days ago",
    tags: ["Action", "Rankings", "Fight Scenes"],
  },
]
