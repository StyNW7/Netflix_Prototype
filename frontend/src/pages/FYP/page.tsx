/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useRef, useEffect } from "react"
import FYPSidebar from "@/components/fyp/fyp-sidebar"
import FYPSearchBar from "@/components/fyp/fyp-search-bar"
import VideoCard from "@/components/fyp/video-card"

export default function FYPPage() {
  const [videos, setVideos] = useState<any[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock video data - replace with real API
  const mockVideos = [
    {
      id: 1,
      title: "Breaking Bad - Epic Scene",
      category: "shows",
      thumbnail: "/breaking-bad-scene.jpg",
      likes: 2500,
      comments: 450,
      shares: 320,
      views: 12500,
      author: "Netflix Official",
      duration: "3:45",
    },
    {
      id: 2,
      title: "Stranger Things Trailer",
      category: "shows",
      thumbnail: "/stranger-things.jpg",
      likes: 3200,
      comments: 680,
      shares: 520,
      views: 18900,
      author: "Netflix Official",
      duration: "2:15",
    },
    {
      id: 3,
      title: "The Crown Premiere",
      category: "shows",
      thumbnail: "/the-crown.jpg",
      likes: 1800,
      comments: 340,
      shares: 210,
      views: 9500,
      author: "Netflix Official",
      duration: "4:30",
    },
    {
      id: 4,
      title: "Squid Game Highlights",
      category: "trending",
      thumbnail: "/squid-game.jpg",
      likes: 4200,
      comments: 920,
      shares: 680,
      views: 25600,
      author: "Netflix Official",
      duration: "5:00",
    },
    {
      id: 5,
      title: "Wednesday Dance Scene",
      category: "trending",
      thumbnail: "/wednesday-dance.jpg",
      likes: 5600,
      comments: 1240,
      shares: 890,
      views: 32100,
      author: "Netflix Official",
      duration: "2:50",
    },
    {
      id: 6,
      title: "The Witcher Battles",
      category: "action",
      thumbnail: "/the-witcher.jpg",
      likes: 3800,
      comments: 720,
      shares: 560,
      views: 21300,
      author: "Netflix Official",
      duration: "3:20",
    },
    {
      id: 7,
      title: "Emily in Paris - Fashion",
      category: "drama",
      thumbnail: "/emily-in-paris.jpg",
      likes: 2100,
      comments: 380,
      shares: 240,
      views: 11200,
      author: "Netflix Official",
      duration: "3:00",
    },
    {
      id: 8,
      title: "Bridgerton Ballroom Scene",
      category: "drama",
      thumbnail: "/bridgerton.jpg",
      likes: 2900,
      comments: 540,
      shares: 380,
      views: 14800,
      author: "Netflix Official",
      duration: "4:15",
    },
  ]

  // Initialize videos
  useEffect(() => {
    setVideos(mockVideos)
  }, [])

  // Handle scroll snap
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return

    e.preventDefault()

    if (e.deltaY > 0) {
      // Scroll down
      setActiveIndex((prev) => Math.min(prev + 1, videos.length - 1))
    } else if (e.deltaY < 0) {
      // Scroll up
      setActiveIndex((prev) => Math.max(prev - 1, 0))
    }

    // Snap to video
    if (scrollContainerRef.current) {
      const videoHeight = scrollContainerRef.current.clientHeight
      scrollContainerRef.current.scrollTop = activeIndex * videoHeight
    }
  }

  // Load more videos on reaching end
  const handleLoadMore = () => {
    if (isLoading) return
    setIsLoading(true)
    setTimeout(() => {
      setVideos([...videos, ...mockVideos])
      setIsLoading(false)
    }, 800)
  }

  useEffect(() => {
    if (activeIndex >= videos.length - 2) {
      handleLoadMore()
    }
  }, [activeIndex])

  // Filter videos
  const filteredVideos = videos.filter((video) => {
    const categoryMatch = selectedCategory === "all" || video.category === selectedCategory
    const searchMatch = video.title.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && searchMatch
  })

  return (
    <div className="flex w-full h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <FYPSidebar selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Search Bar */}
        <FYPSearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {/* Video Scroll Container with Snap */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-scroll snap-y snap-mandatory scrollbar-hide relative"
          onWheel={handleWheel}
          style={{
            scrollBehavior: "smooth",
          }}
        >
          {filteredVideos.map((video, index) => (
            <div
              key={`${video.id}-${index}`}
              className="w-full h-full snap-center flex-shrink-0 flex items-center justify-center"
            >
              <VideoCard video={video} isActive={index === activeIndex} onClick={() => setActiveIndex(index)} />
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="w-full h-full snap-center flex-shrink-0 flex items-center justify-center">
              <div className="animate-spin">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
