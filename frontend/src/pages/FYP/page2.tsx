"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { 
  Home, 
  Flame, 
  TrendingUp, 
  Film, 
  Tv, 
  Heart, 
  Clock, 
  Search, 
  Bell, 
  User,
  Play,
  ThumbsUp,
  MessageCircle,
  Share2,
  MoreVertical,
  X,
  Settings,
  Download,
  Pause,
  Info,
  Volume2,
  VolumeX
} from "lucide-react"
import { useNavigate } from "react-router"

interface Video {
  id: number
  title: string
  description: string
  category: string
  thumbnail: string
  videoUrl: string
  likes: number
  comments: number
  shares: number
  views: string
  author: string
  duration: string
  year: number
  rating: number
  tags: string[]
  isLiked?: boolean
  isSaved?: boolean
}

export default function FYPPage() {

  const navigate = useNavigate()

  const [videos, setVideos] = useState<Video[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("for-you")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(180) // Default 3 minutes
  
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const categories = [
    { id: "for-you", label: "For You", icon: Heart },
    { id: "trending", label: "Trending", icon: Flame },
    { id: "shows", label: "TV Shows", icon: Tv },
    { id: "movies", label: "Movies", icon: Film },
    { id: "new", label: "New & Hot", icon: TrendingUp },
    { id: "watchlist", label: "Watchlist", icon: Clock },
  ]

  const mockVideos: Video[] = [
    {
      id: 1,
      title: "Breaking Bad - The Final Scene",
      description: "Walter White's transformation reaches its climax in this unforgettable scene from the series finale.",
      category: "shows",
      thumbnail: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=800&h=1200&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      likes: 12500,
      comments: 2450,
      shares: 1320,
      views: "2.5M",
      author: "Netflix",
      duration: "4:22",
      year: 2013,
      rating: 9.5,
      tags: ["Drama", "Crime", "Thriller", "Award Winning"]
    },
    {
      id: 2,
      title: "Stranger Things - Season 4 Finale",
      description: "The epic conclusion to season 4 with mind-bending revelations and spectacular visual effects.",
      category: "trending",
      thumbnail: "https://images.unsplash.com/photo-1602562086757-78809c34ceb4?q=80&w=1169&auto=format&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      likes: 23200,
      comments: 4680,
      shares: 2520,
      views: "4.1M",
      author: "Netflix",
      duration: "2:45",
      year: 2022,
      rating: 9.3,
      tags: ["Sci-Fi", "Horror", "80s Nostalgia", "Fantasy"]
    },
    {
      id: 3,
      title: "The Crown - Queen's Speech",
      description: "A powerful moment from season 3 showcasing Olivia Colman's brilliant portrayal of Queen Elizabeth II.",
      category: "shows",
      thumbnail: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=800&h=1200&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      likes: 9800,
      comments: 1340,
      shares: 1210,
      views: "1.8M",
      author: "Netflix",
      duration: "5:30",
      year: 2019,
      rating: 8.9,
      tags: ["Historical Drama", "Biography", "Royalty", "Award Winning"]
    },
    {
      id: 4,
      title: "Squid Game - Red Light, Green Light",
      description: "The iconic first game that took the world by storm. Tense, shocking, and unforgettable.",
      category: "trending",
      thumbnail: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=1200&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      likes: 34200,
      comments: 6920,
      shares: 4680,
      views: "6.7M",
      author: "Netflix",
      duration: "3:15",
      year: 2021,
      rating: 9.2,
      tags: ["Thriller", "Survival", "Drama", "Korean"]
    },
    {
      id: 5,
      title: "Wednesday - The Dance Scene",
      description: "Wednesday Addams' viral dance scene that became a cultural phenomenon overnight.",
      category: "for-you",
      thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=1200&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      likes: 25600,
      comments: 4240,
      shares: 3890,
      views: "5.2M",
      author: "Netflix",
      duration: "2:50",
      year: 2022,
      rating: 9.1,
      tags: ["Comedy", "Fantasy", "Supernatural", "Teen"]
    },
    {
      id: 6,
      title: "The Witcher - Epic Battle Scene",
      description: "Geralt of Rivia showcasing his unmatched swordsmanship in this breathtaking battle sequence.",
      category: "movies",
      thumbnail: "https://images.unsplash.com/photo-1699147561362-3945a202b29c?q=80&w=1332&auto=format&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      likes: 18800,
      comments: 2720,
      shares: 1560,
      views: "3.3M",
      author: "Netflix",
      duration: "3:40",
      year: 2019,
      rating: 8.7,
      tags: ["Fantasy", "Action", "Adventure", "Based on Game"]
    },
    {
      id: 7,
      title: "Emily in Paris - Fashion Montage",
      description: "A stylish montage of Emily's most iconic Parisian outfits from season 2.",
      category: "shows",
      thumbnail: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=1200&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      likes: 12100,
      comments: 2380,
      shares: 1240,
      views: "2.1M",
      author: "Netflix",
      duration: "3:00",
      year: 2021,
      rating: 7.8,
      tags: ["Comedy", "Romance", "Drama", "Fashion"]
    },
    {
      id: 8,
      title: "Bridgerton - The Ballroom Scene",
      description: "An elegant and romantic ballroom scene featuring stunning costumes and choreography.",
      category: "for-you",
      thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=1200&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      likes: 19900,
      comments: 3540,
      shares: 2380,
      views: "3.8M",
      author: "Netflix",
      duration: "4:15",
      year: 2020,
      rating: 8.7,
      tags: ["Romance", "Historical", "Drama", "Period Piece"]
    },
  ]

  // Initialize videos
  useEffect(() => {
    setVideos(mockVideos.map(video => ({ ...video, isLiked: false, isSaved: false })))
  }, [])

  // Handle video playback on scroll
  useEffect(() => {
    // Stop all videos first
    videoRefs.current.forEach(video => {
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    })

    // Play the active video
    const activeVideo = videoRefs.current[activeIndex]
    if (activeVideo) {
      activeVideo.play().then(() => {
        setIsPlaying(true)
      }).catch((error) => {
        console.log("Autoplay prevented:", error)
      })
    }
  }, [activeIndex])

  // Update current time and duration
  useEffect(() => {
    const activeVideo = videoRefs.current[activeIndex]
    if (!activeVideo) return

    const updateTime = () => {
      setCurrentTime(activeVideo.currentTime)
    }

    const updateDuration = () => {
      setDuration(activeVideo.duration || 180)
    }

    activeVideo.addEventListener('timeupdate', updateTime)
    activeVideo.addEventListener('loadedmetadata', updateDuration)

    return () => {
      activeVideo.removeEventListener('timeupdate', updateTime)
      activeVideo.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [activeIndex])

  // Handle play/pause
  const togglePlay = () => {
    const activeVideo = videoRefs.current[activeIndex]
    if (!activeVideo) return

    if (isPlaying) {
      activeVideo.pause()
    } else {
      activeVideo.play()
    }
    setIsPlaying(!isPlaying)
  }

  // Handle volume change
  useEffect(() => {
    const activeVideo = videoRefs.current[activeIndex]
    if (!activeVideo) return

    activeVideo.volume = volume / 100
    activeVideo.muted = isMuted
  }, [activeIndex, volume, isMuted])

  // Handle video ended
  const handleVideoEnd = useCallback(() => {
    setIsPlaying(false)
    setCurrentTime(0)
    
    // Move to next video if not the last
    if (activeIndex < videos.length - 1) {
      const videoHeight = scrollContainerRef.current?.clientHeight || 0
      scrollContainerRef.current?.scrollTo({
        top: (activeIndex + 1) * videoHeight,
        behavior: 'smooth'
      })
    }
  }, [activeIndex, videos.length])

  // Set up video event listeners
  useEffect(() => {
    const activeVideo = videoRefs.current[activeIndex]
    if (!activeVideo) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => handleVideoEnd()

    activeVideo.addEventListener('play', handlePlay)
    activeVideo.addEventListener('pause', handlePause)
    activeVideo.addEventListener('ended', handleEnded)

    return () => {
      activeVideo.removeEventListener('play', handlePlay)
      activeVideo.removeEventListener('pause', handlePause)
      activeVideo.removeEventListener('ended', handleEnded)
    }
  }, [activeIndex, handleVideoEnd])

  // Auto-hide controls
  useEffect(() => {
    if (showControls && isPlaying) {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [showControls, isPlaying])

  // Handle scroll snap
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return
    
    const scrollTop = scrollContainerRef.current.scrollTop
    const videoHeight = scrollContainerRef.current.clientHeight
    const newIndex = Math.round(scrollTop / videoHeight)
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex)
    }
  }, [activeIndex])

  // Load more videos
  const handleLoadMore = useCallback(() => {
    if (isLoading || videos.length >= 20) return
    
    setIsLoading(true)
    setTimeout(() => {
      const newVideos = mockVideos.map(video => ({
        ...video,
        id: video.id + videos.length,
        isLiked: false,
        isSaved: false
      }))
      setVideos(prev => [...prev, ...newVideos])
      setIsLoading(false)
    }, 1000)
  }, [isLoading, videos.length])

  // Handle infinite scroll
  useEffect(() => {
    if (activeIndex >= videos.length - 2 && videos.length < 20) {
      handleLoadMore()
    }
  }, [activeIndex, videos.length, handleLoadMore])

  // Filter videos
  const filteredVideos = videos.filter((video) => {
    if (selectedCategory === "for-you") return true
    if (selectedCategory === "watchlist") return video.isSaved
    const categoryMatch = selectedCategory === "all" || video.category === selectedCategory
    const searchMatch = searchQuery === "" || 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return categoryMatch && searchMatch
  })

  // Handle video interactions
  const handleLike = (videoId: number) => {
    setVideos(prev => prev.map(video => 
      video.id === videoId 
        ? { ...video, likes: video.isLiked ? video.likes - 1 : video.likes + 1, isLiked: !video.isLiked }
        : video
    ))
  }

  const handleSave = (videoId: number) => {
    setVideos(prev => prev.map(video => 
      video.id === videoId 
        ? { ...video, isSaved: !video.isSaved }
        : video
    ))
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = (currentTime / duration) * 100

  // Handle seeking
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    
    const activeVideo = videoRefs.current[activeIndex]
    if (activeVideo) {
      activeVideo.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  return (
    <div className="flex w-full h-screen bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex w-20 lg:w-64 flex-col items-center py-6 bg-gradient-to-b from-black via-black to-gray-900 border-r border-gray-800">
        <div className="mb-8 px-4 cursor-pointer" onClick={() => navigate("/")}>
          <div className="text-red-600 font-bold text-2xl lg:text-3xl">N</div>
        </div>
        
        <nav className="flex-1 w-full space-y-2 px-2">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = selectedCategory === category.id
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden lg:inline font-medium">{category.label}</span>
              </button>
            )
          })}
        </nav>
        
        <div className="mt-auto px-4">
          <button className="w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <Settings className="w-5 h-5" />
            <span className="hidden lg:inline">Settings</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Navigation */}
        <header className="sticky top-0 z-50 bg-gradient-to-b from-black via-black/95 to-transparent px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="md:hidden">
                <Home className="w-6 h-6 text-red-600" />
              </button>
              <div className="text-2xl font-bold">
                <span className="text-red-600">FYP</span>
                <span className="text-white">.Netflix</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {showSearch ? (
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search videos, shows, movies..."
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-red-600"
                      autoFocus
                    />
                    <button 
                      onClick={() => setShowSearch(false)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setShowSearch(true)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Bell className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <User className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Category Tabs - Mobile */}
        <div className="md:hidden px-4 py-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex gap-2">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = selectedCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-900 text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Video Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto snap-y snap-mandatory scrollbar-hide relative"
          onScroll={handleScroll}
        >
          {filteredVideos.map((video, index) => {
            return (
              <div
                key={`${video.id}-${index}`}
                className="w-full h-full snap-center flex-shrink-0 relative"
                onMouseMove={() => setShowControls(true)}
                onMouseLeave={() => isPlaying && setShowControls(false)}
              >
                {/* Video Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black">
                  {/* Video Element */}
                  <video
                    ref={el => videoRefs.current[index] = el}
                    className="absolute inset-0 w-full h-full object-cover opacity-100"
                    src={video.videoUrl}
                    poster={video.thumbnail}
                    loop={false}
                    muted={index !== activeIndex}
                    playsInline
                    preload="metadata"
                  />
                  
                  {/* Video Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Video Content */}
                <div className="relative h-full flex flex-col justify-end p-4 md:p-8">
                  {/* Video Info */}
                  <div className="max-w-2xl space-y-4">
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Film className="w-4 h-4" />
                        <span>{video.category.toUpperCase()}</span>
                      </div>
                      <span>•</span>
                      <span>{video.year}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span>{video.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{video.duration}</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                      {video.title}
                    </h2>
                    
                    <p className="text-lg text-gray-300 max-w-xl">
                      {video.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {video.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{video.views} views</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleLike(video.id)}
                          className={`flex items-center gap-1 transition-colors ${
                            video.isLiked ? 'text-red-500' : 'hover:text-red-500'
                          }`}
                        >
                          <ThumbsUp className="w-5 h-5" />
                          <span>{video.likes.toLocaleString()}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span>{video.comments.toLocaleString()}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-green-400 transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span>{video.shares.toLocaleString()}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Video Controls */}
                  <div className={`mt-8 transition-opacity duration-300 ${showControls || !isPlaying || index === activeIndex ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={togglePlay}
                        className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6 ml-1" />
                        )}
                      </button>
                      
                      {/* Volume Control */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          {isMuted ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                        </button>
                        {!isMuted && (
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="w-24 accent-red-600"
                          />
                        )}
                      </div>
                      
                      <button className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                        <Info className="w-4 h-4" />
                        <span className="text-sm">More Info</span>
                      </button>
                      
                      <button 
                        onClick={() => handleSave(video.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          video.isSaved 
                            ? 'bg-white/20 text-white' 
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-sm">{video.isSaved ? 'Saved' : 'Save'}</span>
                      </button>
                      
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                      <div 
                        className="w-full h-1 bg-gray-700 rounded-full overflow-hidden cursor-pointer"
                        onClick={handleSeek}
                      >
                        <div 
                          className="h-full bg-red-600 transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Right Side */}
                <div className="absolute right-4 md:right-8 bottom-32 flex flex-col gap-4">
                  <button
                    onClick={() => handleLike(video.id)}
                    className={`flex flex-col items-center gap-1 transition-colors ${
                      video.isLiked ? 'text-red-500' : 'text-white'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      video.isLiked ? 'bg-red-600/20' : 'bg-white/10 hover:bg-white/20'
                    }`}>
                      <ThumbsUp className="w-6 h-6" />
                    </div>
                    <span className="text-sm">{video.likes.toLocaleString()}</span>
                  </button>
                  
                  <button className="flex flex-col items-center gap-1 text-white">
                    <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <span className="text-sm">{video.comments.toLocaleString()}</span>
                  </button>
                  
                  <button className="flex flex-col items-center gap-1 text-white">
                    <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                      <Share2 className="w-6 h-6" />
                    </div>
                    <span className="text-sm">{video.shares.toLocaleString()}</span>
                  </button>
                </div>
              </div>
            )
          })}
          
          {/* Loading Indicator */}
          {isLoading && (
            <div className="w-full h-full snap-center flex-shrink-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
                <p className="text-gray-400">Loading more content...</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

// Custom Eye icon component
const Eye = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)