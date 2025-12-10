"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Heart, MessageCircle, Share2, Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoCardProps {
  video: {
    id: number
    title: string
    author: string
    thumbnail: string
    likes: number
    comments: number
    shares: number
    views: number
    duration: string
  }
  isActive: boolean
  onClick: () => void
}

export default function VideoCard({ video, isActive, onClick }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Auto play when active
  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false)
      })
      setIsPlaying(true)
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [isActive])

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  return (
    <div
      className="w-full h-full relative flex items-center justify-center overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {/* Video Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 z-10" />

      {/* Video Container */}
      <div className="relative w-full h-full max-w-md flex items-center justify-center">
        {/* Thumbnail/Video */}
        <div className="relative w-full h-full overflow-hidden rounded-2xl">
          <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="w-full h-full object-cover" />

          {/* Play Overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-primary hover:bg-red-700 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-lg shadow-primary/50"
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
            </button>
          </div>

          {/* Duration Badge */}
          <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
            {video.duration}
          </div>

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm transition-colors"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </div>

      {/* Info Panel - Right Side */}
      <div className="absolute right-4 bottom-20 flex flex-col gap-6 z-20">
        {/* Like Button */}
        <button
          onClick={toggleLike}
          className={cn(
            "p-3 rounded-full transition-all duration-300 transform hover:scale-110",
            isLiked
              ? "bg-primary text-white shadow-lg shadow-primary/50"
              : "bg-black/60 hover:bg-black/80 backdrop-blur-sm",
          )}
        >
          <Heart size={24} className={isLiked ? "fill-current" : ""} />
          <div className="text-xs mt-1 text-center">{formatNumber(video.likes + (isLiked ? 1 : 0))}</div>
        </button>

        {/* Comment Button */}
        <button className="p-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm transition-all duration-300 transform hover:scale-110">
          <MessageCircle size={24} />
          <div className="text-xs mt-1 text-center">{formatNumber(video.comments)}</div>
        </button>

        {/* Share Button */}
        <button className="p-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm transition-all duration-300 transform hover:scale-110">
          <Share2 size={24} />
          <div className="text-xs mt-1 text-center">{formatNumber(video.shares)}</div>
        </button>
      </div>

      {/* Info Panel - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
        <div className="space-y-3 animate-fadeInUp">
          <h2 className="text-xl font-bold leading-tight text-pretty">{video.title}</h2>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="font-semibold text-foreground">@{video.author}</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">{formatNumber(video.views)} views</span>
          </p>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-primary hover:text-red-600 transition-colors font-semibold"
          >
            {showDetails ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>

      {/* Detailed Info Panel */}
      {showDetails && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-30 flex items-center justify-center p-4 animate-fadeInUp rounded-2xl">
          <div className="text-center space-y-4 max-w-sm">
            <h3 className="text-2xl font-bold">{video.title}</h3>
            <p className="text-muted-foreground">@{video.author}</p>
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/10">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">{formatNumber(video.views)}</p>
                <p className="text-xs text-muted-foreground">Views</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">{formatNumber(video.likes)}</p>
                <p className="text-xs text-muted-foreground">Likes</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">{formatNumber(video.comments)}</p>
                <p className="text-xs text-muted-foreground">Comments</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowDetails(false)
              }}
              className="w-full py-2 rounded-lg bg-primary hover:bg-red-700 transition-colors font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
