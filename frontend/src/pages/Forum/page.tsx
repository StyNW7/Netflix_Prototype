"use client"

import { useState } from "react"
import { 
  Search, 
  TrendingUp, 
  Flame, 
  Clock, 
  MessageCircle, 
  Eye, 
  ThumbsUp, 
  Share2, 
  Bookmark, 
  MoreVertical,
  Filter,
  Globe,
  Sparkles,
  Crown,
  CheckCircle,
  Users,
  Hash,
  Calendar,
  BarChart3,
  Award,
  ChevronRight,
  Plus,
  MessageSquare,
  Star,
  Bell,
  BookOpen,
  AlertCircle,
  Heart
} from "lucide-react"

interface Post {
  id: number
  title: string
  content: string
  author: {
    name: string
    avatar: string
    isVerified: boolean
    reputation: number
    level: number
  }
  category: string
  region: string
  likes: number
  comments: number
  views: number
  rating: number
  hasSpoiler: boolean
  createdAt: string
  tags: string[]
  isLiked?: boolean
  isSaved?: boolean
  isFollowing?: boolean
  trending?: boolean
  hot?: boolean
}

export default function ForumPage() {
  const [selectedCategory, setSelectedCategory] = useState("trending")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("global")
  const [showSpoilers, setShowSpoilers] = useState(false)
  const [sortBy, setSortBy] = useState("trending")
  const [showCreatePost, setShowCreatePost] = useState(false)

  const categories = [
    { id: "trending", label: "Trending", icon: TrendingUp, color: "from-red-600 to-pink-600" },
    { id: "shows", label: "TV Shows", icon: Flame, color: "from-red-600 to-orange-600" },
    { id: "movies", label: "Movies", icon: Sparkles, color: "from-red-600 to-purple-600" },
    { id: "discussion", label: "Discussion", icon: MessageCircle, color: "from-red-600 to-blue-600" },
    { id: "reviews", label: "Reviews", icon: Star, color: "from-red-600 to-yellow-600" },
    { id: "theories", label: "Theories", icon: BookOpen, color: "from-red-600 to-green-600" },
  ]

  const regions = [
    { id: "global", label: "🌍 Global", emoji: "🌍" },
    { id: "us", label: "🇺🇸 United States", emoji: "🇺🇸" },
    { id: "uk", label: "🇬🇧 United Kingdom", emoji: "🇬🇧" },
    { id: "kr", label: "🇰🇷 South Korea", emoji: "🇰🇷" },
    { id: "jp", label: "🇯🇵 Japan", emoji: "🇯🇵" },
    { id: "in", label: "🇮🇳 India", emoji: "🇮🇳" },
  ]

  const sortOptions = [
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "new", label: "Newest", icon: Clock },
    { id: "hot", label: "Hot", icon: Flame },
    { id: "top", label: "Top Rated", icon: BarChart3 },
  ]

  const mockPosts: Post[] = [
    {
      id: 1,
      title: "Breaking Bad Series Finale - What a masterpiece!",
      content: "Just finished watching the series finale and I'm blown away. The character development throughout 5 seasons was absolutely perfect. What did you all think?",
      author: {
        name: "WalterWhiteFan",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        isVerified: true,
        reputation: 2850,
        level: 42
      },
      category: "shows",
      region: "us",
      likes: 342,
      comments: 89,
      views: 1520,
      rating: 5,
      hasSpoiler: false,
      createdAt: "2 hours ago",
      tags: ["Breaking Bad", "Drama", "Series Finale", "Award Winning"],
      trending: true,
      isLiked: true
    },
    {
      id: 2,
      title: "[SPOILER] Stranger Things S5 - Mind Blowing Theory",
      content: "I think Eleven might sacrifice herself in the final season to close the Upside Down permanently. Here's why this makes sense based on all the clues we've seen so far in previous seasons...",
      author: {
        name: "UpsideDownExplorer",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        isVerified: false,
        reputation: 450,
        level: 12
      },
      category: "theories",
      region: "global",
      likes: 156,
      comments: 42,
      views: 890,
      rating: 4.5,
      hasSpoiler: true,
      createdAt: "5 hours ago",
      tags: ["Stranger Things", "Theory", "Season 5", "Upside Down"],
      hot: true
    },
    {
      id: 3,
      title: "Top 10 Most Underrated Netflix Films of 2024",
      content: "Let's talk about hidden gems! Here are my picks for the most underrated films that deserve more attention. What would you add to this list?",
      author: {
        name: "CinematicCritic",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        isVerified: true,
        reputation: 5200,
        level: 65
      },
      category: "reviews",
      region: "global",
      likes: 528,
      comments: 124,
      views: 2340,
      rating: 4.8,
      hasSpoiler: false,
      createdAt: "1 day ago",
      tags: ["Recommendations", "2024", "Hidden Gems", "Movies"],
      trending: true,
      isSaved: true
    },
    {
      id: 4,
      title: "The Crown - Historical Accuracy Discussion",
      content: "How accurate is The Crown really? Let's discuss the historical events portrayed vs what actually happened. Historians welcome!",
      author: {
        name: "HistoryBuff2024",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        isVerified: true,
        reputation: 1850,
        level: 28
      },
      category: "discussion",
      region: "uk",
      likes: 267,
      comments: 78,
      views: 1120,
      rating: 4.2,
      hasSpoiler: false,
      createdAt: "1 day ago",
      tags: ["The Crown", "History", "Discussion", "Royalty"]
    },
    {
      id: 5,
      title: "Squid Game Season 2 - Release Date Speculation",
      content: "With production wrapped, when do you think we'll finally get Season 2? My bet is on Q4 2024. What are your predictions?",
      author: {
        name: "GameMaster456",
        avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?w=100&h=100&fit=crop&crop=face",
        isVerified: false,
        reputation: 680,
        level: 15
      },
      category: "shows",
      region: "kr",
      likes: 412,
      comments: 156,
      views: 1890,
      rating: 4.6,
      hasSpoiler: false,
      createdAt: "2 days ago",
      tags: ["Squid Game", "Season 2", "Release Date", "Korean Drama"],
      hot: true
    },
    {
      id: 6,
      title: "Best Action Sequences in Netflix Originals",
      content: "Let's rank the best action scenes! My top pick is the corridor fight in Extraction. What are yours?",
      author: {
        name: "ActionJunkie",
        avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face",
        isVerified: true,
        reputation: 3200,
        level: 38
      },
      category: "movies",
      region: "global",
      likes: 389,
      comments: 92,
      views: 1560,
      rating: 4.7,
      hasSpoiler: false,
      createdAt: "3 days ago",
      tags: ["Action", "Rankings", "Fight Scenes", "Extraction"],
      trending: true
    }
  ]

  const trendingTopics = [
    { tag: "#WednesdayAddams", posts: 1240, trending: true },
    { tag: "#DunePartTwo", posts: 890, trending: true },
    { tag: "#StrangerThings5", posts: 1560, trending: true },
    { tag: "#NetflixOriginals", posts: 2340, trending: false },
    { tag: "#KoreanDramas", posts: 780, trending: true },
    { tag: "#TrueCrimeDocs", posts: 560, trending: false },
  ]

  const topContributors = [
    { name: "MovieBuffPro", level: 78, reputation: 8920, streak: 42 },
    { name: "SeriesAnalyzer", level: 65, reputation: 7560, streak: 31 },
    { name: "CinemaScholar", level: 54, reputation: 6340, streak: 28 },
    { name: "TVShowExpert", level: 47, reputation: 5230, streak: 19 },
  ]

  const filteredPosts = mockPosts.filter((post) => {
    const categoryMatch = selectedCategory === "trending" || post.category === selectedCategory
    const searchMatch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const spoilerMatch = showSpoilers || !post.hasSpoiler
    const regionMatch = selectedRegion === "global" || post.region === selectedRegion
    return categoryMatch && searchMatch && spoilerMatch && regionMatch
  })

  const handleLike = (postId: number) => {
    // In a real app, this would make an API call
    console.log("Liked post:", postId)
  }

  const handleSave = (postId: number) => {
    // In a real app, this would make an API call
    console.log("Saved post:", postId)
  }

  // const handleFollow = (authorName: string) => {
  //   // In a real app, this would make an API call
  //   console.log("Followed author:", authorName)
  // }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-red-600 font-bold text-3xl">NETFLIX</div>
            <div className="h-6 w-px bg-gray-700" />
            <div className="flex items-center gap-2 text-xl font-semibold">
              <MessageSquare className="w-6 h-6 text-red-600" />
              Forum
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search discussions, shows, movies..."
                className="w-64 lg:w-80 bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-red-600"
              />
            </div>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Bell className="w-6 h-6" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 transition-all">
              <Users className="w-5 h-5" />
              <span className="font-medium">My Profile</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-red-600" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  const isActive = selectedCategory === category.id
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                        isActive
                          ? `bg-gradient-to-r ${category.color} text-white`
                          : 'bg-gray-800/50 hover:bg-gray-800 text-gray-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{category.label}</span>
                      {isActive && (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
              <h3 className="font-bold text-lg mb-4">Today's Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">New Posts</span>
                  </div>
                  <span className="font-bold">1,245</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Active Users</span>
                  </div>
                  <span className="font-bold">24.5K</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">Total Likes</span>
                  </div>
                  <span className="font-bold">89.2K</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Avg. Time</span>
                  </div>
                  <span className="font-bold">12m</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Community Discussions</h1>
                <p className="text-gray-400 mt-1">Join the conversation with fellow Netflix viewers</p>
              </div>
              <button
                onClick={() => setShowCreatePost(true)}
                className="group px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Post
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-sm focus:outline-none focus:ring-0"
                >
                  {sortOptions.map((option) => {
                    const Icon = option.icon
                    return (
                      <option key={option.id} value={option.id} className="bg-gray-900">
                        <Icon className="w-4 h-4 inline mr-2" />
                        {option.label}
                      </option>
                    )
                  })}
                </select>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800">
                <Globe className="w-4 h-4 text-gray-400" />
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="bg-transparent border-none text-sm focus:outline-none focus:ring-0"
                >
                  {regions.map((region) => (
                    <option key={region.id} value={region.id} className="bg-gray-900">
                      {region.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setShowSpoilers(!showSpoilers)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  showSpoilers
                    ? 'bg-red-600/20 border-red-600/50 text-red-400'
                    : 'bg-gray-900/50 border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{showSpoilers ? 'Hide' : 'Show'} Spoilers</span>
              </button>
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800 hover:border-red-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/10 hover:-translate-y-1"
                >
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-red-600/20 group-hover:ring-red-600/50 transition-all">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {post.author.isVerified && (
                          <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-blue-500 fill-blue-500 bg-black rounded-full" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{post.author.name}</span>
                          {post.author.level && (
                            <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-full">
                              Level {post.author.level}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <span>{post.createdAt}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Crown className="w-3 h-3 text-yellow-500" />
                            {post.author.reputation.toLocaleString()} rep
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {post.trending && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-red-600 to-pink-600 text-xs font-medium rounded-full">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </span>
                      )}
                      {post.hot && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-orange-600 to-red-600 text-xs font-medium rounded-full">
                          <Flame className="w-3 h-3" />
                          Hot
                        </span>
                      )}
                      {post.hasSpoiler && (
                        <span className="px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-medium rounded-full">
                          SPOILER
                        </span>
                      )}
                      <button className="p-1 hover:bg-gray-800 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 line-clamp-2">
                      {post.content}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors cursor-pointer"
                      >
                        #{tag.replace(/\s+/g, '')}
                      </span>
                    ))}
                  </div>

                  {/* Post Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 transition-colors ${
                          post.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <Heart className="w-5 h-5" />
                        <span className="text-sm font-medium">{post.likes.toLocaleString()}</span>
                      </button>
                      
                      <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">{post.comments.toLocaleString()}</span>
                      </button>
                      
                      <div className="flex items-center gap-2 text-gray-400">
                        <Eye className="w-5 h-5" />
                        <span className="text-sm">{post.views.toLocaleString()} views</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleSave(post.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          post.isSaved
                            ? 'text-red-500 bg-red-500/10'
                            : 'text-gray-400 hover:text-red-500 hover:bg-white/5'
                        }`}
                      >
                        <Bookmark className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-400 hover:bg-white/5 rounded-lg transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trending Topics */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-600" />
                Trending Topics
              </h3>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div
                    key={topic.tag}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-500">#{index + 1}</span>
                      <div>
                        <div className="font-medium group-hover:text-red-500 transition-colors">
                          {topic.tag}
                        </div>
                        <div className="text-xs text-gray-500">{topic.posts.toLocaleString()} posts</div>
                      </div>
                    </div>
                    {topic.trending && (
                      <Flame className="w-4 h-4 text-orange-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Top Contributors */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                Top Contributors
              </h3>
              <div className="space-y-3">
                {topContributors.map((contributor, index) => (
                  <div
                    key={contributor.name}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{contributor.name}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>Lvl {contributor.level}</span>
                        <span>•</span>
                        <span>{contributor.reputation.toLocaleString()} rep</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {contributor.streak} day streak
                        </span>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-xs bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 transition-all">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
              <h3 className="font-bold text-lg mb-4">Community Guidelines</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Be respectful to all members</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Use spoiler tags for recent content</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>No harassment or hate speech</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Keep discussions relevant to Netflix content</span>
                </li>
              </ul>
              <button className="w-full mt-4 px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors text-sm">
                Read Full Guidelines
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal (Simplified) */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Create New Post</h3>
              <button
                onClick={() => setShowCreatePost(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title of your post..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
              />
              <textarea
                placeholder="What would you like to discuss?"
                className="w-full h-40 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 resize-none"
              />
              <div className="flex flex-wrap gap-2">
                {["Spoiler", "Theory", "Discussion", "Review"].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  >
                    #{tag}
                  </button>
                ))}
                <button className="px-3 py-1 border border-dashed border-gray-700 text-gray-500 rounded-lg hover:border-gray-600 hover:text-gray-400 transition-colors text-sm">
                  + Add Tag
                </button>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all">
                  Publish Post
                </button>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg font-semibold hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// X Icon Component
const X = ({ className }: { className?: string }) => (
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
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)