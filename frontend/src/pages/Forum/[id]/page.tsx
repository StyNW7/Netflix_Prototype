"use client"

import { useState } from "react"
import { 
  ArrowLeft,
  Heart,
  MessageSquare,
  Eye,
  Star,
  AlertTriangle,
  CheckCircle,
  Share2,
  Flag,
  Bookmark,
  Send,
  MoreVertical,
  Reply,
  Users,
  Clock,
  ThumbsUp,
  Crown,
  Award,
  BookOpen,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Play,
  TrendingUp,
  Hash
} from "lucide-react"

interface Reply {
  id: number
  author: {
    name: string
    avatar: string
    isVerified: boolean
    reputation: number
    level: number
  }
  content: string
  likes: number
  createdAt: string
  isLiked: boolean
  replies?: Reply[]
}

export default function ForumDetailPage() {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(342)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [replies, setReplies] = useState<Reply[]>(mockReplies)
  const [showNestedReplies, setShowNestedReplies] = useState<Record<number, boolean>>({})
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [nestedReplyContent, setNestedReplyContent] = useState("")

  const post = mockPost

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
  }

  const handleReply = () => {
    if (replyContent.trim()) {
      const newReply: Reply = {
        id: replies.length + 1,
        author: {
          name: "You",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          isVerified: false,
          reputation: 120,
          level: 8
        },
        content: replyContent,
        likes: 0,
        createdAt: "Just now",
        isLiked: false,
        replies: []
      }
      setReplies([...replies, newReply])
      setReplyContent("")
    }
  }

  const handleNestedReply = (parentId: number) => {
    if (nestedReplyContent.trim()) {
      const newNestedReply: Reply = {
        id: Date.now(),
        author: {
          name: "You",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          isVerified: false,
          reputation: 120,
          level: 8
        },
        content: nestedReplyContent,
        likes: 0,
        createdAt: "Just now",
        isLiked: false
      }

      const addNestedReply = (replies: Reply[]): Reply[] => {
        return replies.map(reply => {
          if (reply.id === parentId) {
            return {
              ...reply,
              replies: [...(reply.replies || []), newNestedReply]
            }
          }
          if (reply.replies) {
            return {
              ...reply,
              replies: addNestedReply(reply.replies)
            }
          }
          return reply
        })
      }

      setReplies(addNestedReply(replies))
      setNestedReplyContent("")
      setReplyingTo(null)
      setShowNestedReplies(prev => ({ ...prev, [parentId]: true }))
    }
  }

  const handleLikeReply = (replyId: number) => {
    const updateReplyLikes = (replies: Reply[]): Reply[] => {
      return replies.map(reply => {
        if (reply.id === replyId) {
          return {
            ...reply,
            isLiked: !reply.isLiked,
            likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
          }
        }
        if (reply.replies) {
          return {
            ...reply,
            replies: updateReplyLikes(reply.replies)
          }
        }
        return reply
      })
    }
    setReplies(updateReplyLikes(replies))
  }

  const toggleNestedReplies = (replyId: number) => {
    setShowNestedReplies(prev => ({
      ...prev,
      [replyId]: !prev[replyId]
    }))
  }

  const stats = [
    { icon: Eye, value: "2.5M", label: "Views" },
    { icon: Users, value: "89.2K", label: "Replies" },
    { icon: TrendingUp, value: "#3", label: "Trending" },
    { icon: Clock, value: "12m", label: "Avg. Read" }
  ]

  const relatedTopics = [
    { tag: "#BreakingBad", posts: 1240 },
    { tag: "#SeriesFinale", posts: 890 },
    { tag: "#CrimeDrama", posts: 560 },
    { tag: "#CharacterDevelopment", posts: 320 }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Forum</span>
              </button>
              <div className="h-6 w-px bg-gray-700" />
              <div className="text-red-600 font-bold text-2xl">NETFLIX</div>
              <div className="text-gray-400">Forum</div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Bookmark className="w-6 h-6" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Share2 className="w-6 h-6" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 transition-all">
                <MessageSquare className="w-5 h-5" />
                <span className="font-medium">Join Discussion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Post Card */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
              {/* Post Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-red-600/30">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {post.author.isVerified && (
                      <CheckCircle className="absolute -bottom-1 -right-1 w-6 h-6 text-blue-500 fill-blue-500 bg-black rounded-full" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl font-bold">{post.author.name}</span>
                      <span className="text-sm px-2 py-0.5 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-full">
                        Level {post.author.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Crown className="w-4 h-4 text-yellow-500" />
                        {post.author.reputation.toLocaleString()} reputation
                      </span>
                      <span>•</span>
                      <span>{post.createdAt}</span>
                    </div>
                  </div>
                </div>

                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
                {post.title}
              </h1>

              {/* Tags and Rating */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
                <div className="ml-auto flex items-center gap-2 bg-yellow-600/20 border border-yellow-600/30 px-4 py-2 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold">{post.rating}</span>
                  <span className="text-gray-400 text-sm">/5</span>
                </div>
              </div>

              {/* Spoiler Warning */}
              {post.hasSpoiler && (
                <div className="mb-8 p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-purple-500" />
                    <div>
                      <div className="font-bold text-purple-400">Spoiler Warning</div>
                      <div className="text-sm text-gray-400">
                        This post contains spoilers for {post.show}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="mb-8">
                <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </div>

              {/* Video Preview */}
              {post.video && (
                <div className="mb-8 rounded-xl overflow-hidden border border-gray-800">
                  <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black">
                    <img
                      src={post.video.thumbnail}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-all">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </button>
                    <div className="absolute bottom-4 left-4">
                      <div className="text-sm text-gray-300">{post.video.duration}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Post Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div
                      key={index}
                      className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-800"
                    >
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="flex items-center justify-center gap-1 text-sm text-gray-400 mt-1">
                        <Icon className="w-4 h-4" />
                        {stat.label}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-800">
                <div className="flex items-center gap-6">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 transition-colors group ${
                      isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isLiked 
                        ? 'bg-red-600/20 ring-2 ring-red-600/30' 
                        : 'bg-gray-800 group-hover:bg-red-600/10'
                    }`}>
                      <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                    </div>
                    <span className="font-bold text-lg">{likesCount.toLocaleString()}</span>
                  </button>

                  <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-gray-800 group-hover:bg-blue-600/10 flex items-center justify-center transition-all">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-lg">{post.comments.toLocaleString()}</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-3 rounded-xl transition-all ${
                      isBookmarked
                        ? 'text-red-500 bg-red-600/20 ring-2 ring-red-600/30'
                        : 'text-gray-400 hover:text-red-500 hover:bg-gray-800'
                    }`}
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button className="p-3 text-gray-400 hover:text-green-400 hover:bg-gray-800 rounded-xl transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-3 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-xl transition-colors">
                    <Flag className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Reply Form */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-red-600" />
                Join the Discussion
              </h3>
              <div className="space-y-4">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="What are your thoughts on this post? Share your insights..."
                  rows={4}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-5 py-4 text-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 resize-none transition-all"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                      <BookOpen className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                      <Hash className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                      <AlertTriangle className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                  <button
                    onClick={handleReply}
                    disabled={!replyContent.trim()}
                    className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Post Reply
                  </button>
                </div>
              </div>
            </div>

            {/* Replies Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">
                  Replies <span className="text-gray-400 text-lg">({replies.length})</span>
                </h3>
                <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-600">
                  <option>Sort by: Most Relevant</option>
                  <option>Sort by: Newest</option>
                  <option>Sort by: Most Liked</option>
                </select>
              </div>

              {replies.map((reply) => (
                <div key={reply.id} className="space-y-4">
                  {/* Main Reply */}
                  <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-600/20">
                            <img
                              src={reply.author.avatar}
                              alt={reply.author.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {reply.author.isVerified && (
                            <CheckCircle className="absolute -bottom-1 -right-1 w-4 h-4 text-blue-500 fill-blue-500 bg-black rounded-full" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{reply.author.name}</span>
                            <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full">
                              Level {reply.author.level}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {reply.author.reputation} reputation • {reply.createdAt}
                          </div>
                        </div>
                      </div>
                      <button className="p-1 hover:bg-gray-800 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-gray-300 mb-4">{reply.content}</p>

                    <div className="flex items-center gap-4 pt-3 border-t border-gray-800">
                      <button
                        onClick={() => handleLikeReply(reply.id)}
                        className={`flex items-center gap-2 transition-colors ${
                          reply.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${reply.isLiked ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium">{reply.likes}</span>
                      </button>
                      
                      <button
                        onClick={() => setReplyingTo(replyingTo === reply.id ? null : reply.id)}
                        className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Reply className="w-5 h-5" />
                        <span className="text-sm">Reply</span>
                      </button>

                      {reply.replies && reply.replies.length > 0 && (
                        <button
                          onClick={() => toggleNestedReplies(reply.id)}
                          className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors ml-auto"
                        >
                          {showNestedReplies[reply.id] ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                          <span className="text-sm">
                            {reply.replies.length} {reply.replies.length === 1 ? 'reply' : 'replies'}
                          </span>
                        </button>
                      )}
                    </div>

                    {/* Nested Reply Form */}
                    {replyingTo === reply.id && (
                      <div className="mt-4 pl-4 border-l-2 border-gray-700">
                        <textarea
                          value={nestedReplyContent}
                          onChange={(e) => setNestedReplyContent(e.target.value)}
                          placeholder={`Reply to ${reply.author.name}...`}
                          rows={2}
                          className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-600 resize-none transition-all"
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <button
                            onClick={() => setReplyingTo(null)}
                            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleNestedReply(reply.id)}
                            disabled={!nestedReplyContent.trim()}
                            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:text-gray-500 rounded-lg transition-colors"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Nested Replies */}
                  {reply.replies && showNestedReplies[reply.id] && (
                    <div className="ml-8 space-y-4">
                      {reply.replies.map((nestedReply) => (
                        <div
                          key={nestedReply.id}
                          className="bg-gray-900/50 rounded-xl p-4 border border-gray-700"
                        >
                          <div className="flex items-start gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <img
                                src={nestedReply.author.avatar}
                                alt={nestedReply.author.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{nestedReply.author.name}</span>
                                <span className="text-xs text-gray-400">{nestedReply.createdAt}</span>
                              </div>
                              <p className="text-gray-300 text-sm mt-1">{nestedReply.content}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 ml-11">
                            <button
                              onClick={() => handleLikeReply(nestedReply.id)}
                              className={`flex items-center gap-1 text-xs transition-colors ${
                                nestedReply.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                              }`}
                            >
                              <Heart className={`w-3 h-3 ${nestedReply.isLiked ? 'fill-current' : ''}`} />
                              <span>{nestedReply.likes}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Related Topics */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-red-600" />
                Related Topics
              </h3>
              <div className="space-y-3">
                {relatedTopics.map((topic) => (
                  <div
                    key={topic.tag}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all cursor-pointer group"
                  >
                    <div className="font-medium group-hover:text-red-500 transition-colors">
                      {topic.tag}
                    </div>
                    <div className="text-xs text-gray-500">{topic.posts.toLocaleString()} posts</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Author Stats */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                Author Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold">{post.author.name}</div>
                    <div className="text-sm text-gray-400">Top Contributor</div>
                    <div className="flex items-center gap-2 mt-2">
                      <button className="px-3 py-1 text-xs bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 transition-all">
                        Follow
                      </button>
                      <button className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all">
                        Message
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-800/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">{post.author.reputation.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Reputation</div>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">{post.author.level}</div>
                    <div className="text-xs text-gray-400">Level</div>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">156</div>
                    <div className="text-xs text-gray-400">Posts</div>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">4.8</div>
                    <div className="text-xs text-gray-400">Avg. Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
              <h3 className="font-bold text-lg mb-4">Keep it Civil</h3>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Respect different opinions</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Use spoiler tags when needed</span>
                </div>
                <div className="flex items-start gap-2">
                  <ThumbsUp className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Upvote quality contributions</span>
                </div>
                <div className="flex items-start gap-2">
                  <Flag className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Report inappropriate content</span>
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                View Guidelines
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mock data
const mockPost = {
  id: 1,
  title: "Breaking Bad Series Finale - The Perfect Conclusion to a Masterpiece",
  content: `Just finished my fourth rewatch of the Breaking Bad series finale and I'm still blown away. The character development throughout 5 seasons was absolutely perfect.

The way they wrapped up Walter's story was both satisfying and heartbreaking. From a high school chemistry teacher to the most feared drug lord in the Southwest, his transformation was gradual and believable.

What I loved most:
• The cinematography in the final episodes was stunning - every frame felt intentional
• Jesse's emotional arc and his final moment of freedom was pure catharsis
• The callback to the pilot episode with the pants in the desert
• How they tied up every loose end without feeling rushed

The finale aired over a decade ago but it still holds up as one of the greatest TV endings of all time. What did you all think? Did it live up to your expectations?`,
  author: {
    name: "WalterWhiteFan",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=200&h=200&fit=crop&crop=face",
    isVerified: true,
    reputation: 2850,
    level: 42
  },
  likes: 342,
  comments: 89,
  views: 1520,
  rating: 5,
  hasSpoiler: false,
  show: "Breaking Bad",
  createdAt: "2 hours ago",
  tags: ["Breaking Bad", "Drama", "Series Finale", "Character Development", "Crime"],
  video: {
    thumbnail: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=800&h=450&fit=crop",
    duration: "4:22"
  }
}

const mockReplies: Reply[] = [
  {
    id: 1,
    author: {
      name: "JessePinkmanLover",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      isVerified: true,
      reputation: 1820,
      level: 28
    },
    content: "Completely agree! The finale was perfect. The way they showed Jesse's emotional release when he finally escaped was so powerful. Aaron Paul's acting in that final scene still gives me chills.",
    likes: 45,
    createdAt: "1 hour ago",
    isLiked: false,
    replies: [
      {
        id: 11,
        author: {
          name: "CinemaBuff",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
          isVerified: false,
          reputation: 420,
          level: 12
        },
        content: "That scream of pure joy and pain combined - masterful acting!",
        likes: 8,
        createdAt: "30 minutes ago",
        isLiked: false
      }
    ]
  },
  {
    id: 2,
    author: {
      name: "ChemistryNerd",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      isVerified: false,
      reputation: 620,
      level: 15
    },
    content: "What I appreciate most is how realistic the chemistry was throughout the series. They actually consulted with real chemists! The attention to detail in Breaking Bad is unmatched.",
    likes: 28,
    createdAt: "45 minutes ago",
    isLiked: false
  },
  {
    id: 3,
    author: {
      name: "TVCritic2024",
      avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?w=100&h=100&fit=crop&crop=face",
      isVerified: true,
      reputation: 3450,
      level: 48
    },
    content: "Breaking Bad set the standard for what prestige television should be. The finale didn't disappoint - it honored the characters and the story. Better Call Saul also did an amazing job expanding this universe!",
    likes: 67,
    createdAt: "30 minutes ago",
    isLiked: true,
    replies: [
      {
        id: 31,
        author: {
          name: "SoulWriter",
          avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop&crop=face",
          isVerified: false,
          reputation: 890,
          level: 22
        },
        content: "Better Call Saul is actually my favorite of the two! The character depth is incredible.",
        likes: 12,
        createdAt: "15 minutes ago",
        isLiked: false
      },
      {
        id: 32,
        author: {
          name: "SeriesAnalyst",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          isVerified: true,
          reputation: 2100,
          level: 34
        },
        content: "Agreed! Both shows are masterclasses in storytelling.",
        likes: 5,
        createdAt: "10 minutes ago",
        isLiked: false
      }
    ]
  }
]