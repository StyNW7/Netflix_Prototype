/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Settings,
  MessageSquare,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import ChatbotSidebar from "@/components/watch/chatbot-sidebar"

export default function WatchPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  const movie = {
    id: 1,
    title: "Breaking Bad: The Movie",
    description:
      "A high school chemistry teacher turned meth cook partners with a former student to secure his family's future.",
    genre: "Crime Drama",
    year: 2024,
    rating: "TV-MA",
    duration: "2h 15m",
    thumbnail: "/breaking-bad-poster.jpg",
  }

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Skip forward/backward
  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds
    }
  }

  // Handle progress bar change
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number.parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number.parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.volume = vol
      setVolume(vol)
      setIsMuted(vol === 0)
    }
  }

  // Format time
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Update time
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
    }
  }, [])

  // Auto-hide controls
  const resetControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    setShowControls(true)
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false)
    }, 3000)
  }

  useEffect(() => {
    resetControlsTimeout()
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isPlaying])

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Video Player Container */}
      <div
        ref={containerRef}
        className={cn(
          "relative flex-1 flex items-center justify-center transition-all duration-300",
          isChatOpen ? "mr-0" : "mr-0",
        )}
        onMouseMove={resetControlsTimeout}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-contain bg-black"
          poster={movie.thumbnail}
          onClick={togglePlay}
        >
          <source src="/videos/sample-movie.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none" />

        {/* Top Bar */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 p-6 flex items-center justify-between transition-all duration-300 z-30",
            showControls ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none",
          )}
        >
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">{movie.title}</h1>
            <p className="text-sm text-gray-300 flex items-center gap-3">
              <span>{movie.year}</span>
              <span>•</span>
              <span>{movie.rating}</span>
              <span>•</span>
              <span>{movie.genre}</span>
              <span>•</span>
              <span>{movie.duration}</span>
            </p>
          </div>

          {/* Chat Toggle Button */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={cn(
              "p-3 rounded-lg transition-all duration-300 hover:scale-110",
              isChatOpen ? "bg-primary text-white" : "bg-white/10 hover:bg-white/20 backdrop-blur-lg",
            )}
          >
            {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
          </button>
        </div>

        {/* Center Play Button */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110 z-20 shadow-2xl shadow-primary/50"
          >
            <Play size={32} fill="currentColor" className="ml-1" />
          </button>
        )}

        {/* Bottom Controls */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 p-6 space-y-3 transition-all duration-300 z-30",
            showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
          )}
        >
          {/* Progress Bar */}
          <div className="group">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer group-hover:h-1.5 transition-all [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer group-hover:[&::-webkit-slider-thumb]:w-4 group-hover:[&::-webkit-slider-thumb]:h-4"
            />
            <div className="flex justify-between text-xs text-gray-300 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Play/Pause */}
              <button onClick={togglePlay} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                {isPlaying ? <Pause size={28} /> : <Play size={28} fill="currentColor" />}
              </button>

              {/* Skip Back */}
              <button onClick={() => skip(-10)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <SkipBack size={24} />
              </button>

              {/* Skip Forward */}
              <button onClick={() => skip(10)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <SkipForward size={24} />
              </button>

              {/* Volume */}
              <div className="flex items-center gap-2 group/volume">
                <button onClick={toggleMute} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  {isMuted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-0 group-hover/volume:w-24 transition-all duration-300 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Settings */}
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Settings size={24} />
              </button>

              {/* Fullscreen */}
              <button onClick={toggleFullscreen} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Sidebar */}
      <ChatbotSidebar
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        movieTitle={movie.title}
        movieDescription={movie.description}
      />
    </div>
  )
}
