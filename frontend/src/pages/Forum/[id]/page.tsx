/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import {
  ArrowLeft,
  ThumbsUp,
  MessageSquare,
  Eye,
  Star,
  AlertTriangle,
  BadgeCheck,
  Share2,
  Flag,
  Bookmark,
  Send,
  MoreVertical,
  Reply,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router"

export default function ForumDetailPage() {
 
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(342)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [replies, setReplies] = useState(mockReplies)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)

  const post = mockPost

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
  }

  const handleReply = () => {
    if (replyContent.trim()) {
      const newReply = {
        id: replies.length + 1,
        author: {
          name: "You",
          avatar: "/placeholder.svg?height=40&width=40",
          isVerified: false,
          reputation: 120,
        },
        content: replyContent,
        likes: 0,
        createdAt: "Just now",
        isLiked: false,
      }
      setReplies([...replies, newReply])
      setReplyContent("")
      setReplyingTo(null)
    }
  }

  const handleReplyLike = (replyId: number) => {
    setReplies(
      replies.map((reply) =>
        reply.id === replyId
          ? {
              ...reply,
              isLiked: !reply.isLiked,
              likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
            }
          : reply,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Back Navigation */}
      <div className="pt-20 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Forum
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Post Header */}
        <div className="glass-effect rounded-lg p-6 sm:p-8 mb-6 animate-fadeInUp">
          {/* Author Info */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-start gap-3">
              <img
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-lg">{post.author.name}</span>
                  {post.author.isVerified && (
                    <Badge variant="default" className="flex items-center gap-1">
                      <BadgeCheck size={12} />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {post.author.reputation} reputation • {post.createdAt}
                </div>
              </div>
            </div>

            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Title with Spoiler Warning */}
          <div className="mb-4">
            {post.hasSpoiler && (
              <div className="flex items-center gap-2 text-yellow-500 mb-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <AlertTriangle size={18} />
                <span className="text-sm font-medium">This post contains spoilers</span>
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl font-black leading-tight">{post.title}</h1>
          </div>

          {/* Tags and Rating */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
            <div className="flex items-center gap-1 bg-primary/20 px-3 py-1 rounded-lg ml-auto">
              <Star size={16} className="text-primary fill-current" />
              <span className="text-sm font-bold">{post.rating}</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">{post.content}</p>
          </div>

          {/* Image if exists */}
          {post.image && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img src={post.image || "/placeholder.svg"} alt="Post content" className="w-full h-auto" />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-6 pt-6 border-t border-white/10">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 text-sm font-medium transition-all ${
                isLiked ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ThumbsUp size={20} className={isLiked ? "fill-current" : ""} />
              <span>{likesCount}</span>
            </button>

            <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <MessageSquare size={20} />
              <span>{post.comments}</span>
            </button>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye size={20} />
              <span>{post.views}</span>
            </div>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`ml-auto p-2 rounded-lg transition-all ${
                isBookmarked ? "text-primary bg-primary/20" : "text-muted-foreground hover:bg-white/10"
              }`}
            >
              <Bookmark size={20} className={isBookmarked ? "fill-current" : ""} />
            </button>

            <button className="p-2 rounded-lg text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all">
              <Share2 size={20} />
            </button>

            <button className="p-2 rounded-lg text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all">
              <Flag size={20} />
            </button>
          </div>
        </div>

        {/* Reply Form */}
        <div className="glass-effect rounded-lg p-6 mb-6 animate-fadeInUp delay-100">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MessageSquare size={20} />
            Add a Reply
          </h3>
          <div className="space-y-4">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Share your thoughts..."
              rows={4}
              className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/20 focus:border-primary rounded-lg px-4 py-3 transition-all duration-300 focus:outline-none resize-none"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setReplyContent("")}
                className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleReply}
                disabled={!replyContent.trim()}
                className="px-6 py-2 bg-primary hover:bg-red-600 disabled:bg-white/10 disabled:text-muted-foreground text-white rounded-lg font-medium transition-all flex items-center gap-2 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                Post Reply
              </button>
            </div>
          </div>
        </div>

        {/* Replies Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold mb-6">
            Replies <span className="text-muted-foreground text-lg">({replies.length})</span>
          </h3>

          {replies.map((reply, index) => (
            <div
              key={reply.id}
              className="glass-effect rounded-lg p-6 hover:bg-white/5 transition-all animate-fadeInUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Reply Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <img
                    src={reply.author.avatar || "/placeholder.svg"}
                    alt={reply.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{reply.author.name}</span>
                      {reply.author.isVerified && (
                        <Badge variant="default" className="flex items-center gap-1 text-xs">
                          <BadgeCheck size={10} />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {reply.author.reputation} reputation • {reply.createdAt}
                    </div>
                  </div>
                </div>

                <button className="p-1 hover:bg-white/10 rounded transition-colors">
                  <MoreVertical size={16} />
                </button>
              </div>

              {/* Reply Content */}
              <p className="text-sm leading-relaxed text-muted-foreground mb-4">{reply.content}</p>

              {/* Reply Actions */}
              <div className="flex items-center gap-4 pt-3 border-t border-white/10">
                <button
                  onClick={() => handleReplyLike(reply.id)}
                  className={`flex items-center gap-2 text-xs font-medium transition-all ${
                    reply.isLiked ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ThumbsUp size={14} className={reply.isLiked ? "fill-current" : ""} />
                  <span>{reply.likes}</span>
                </button>

                <button
                  onClick={() => setReplyingTo(reply.id)}
                  className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Reply size={14} />
                  Reply
                </button>

                <button className="ml-auto text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
                  <Flag size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

// Mock post data
const mockPost = {
  id: 1,
  title: "Breaking Bad Series Finale - What a masterpiece! The Journey from Walter White to Heisenberg",
  content: `Just finished watching the series finale and I'm blown away. The character development throughout 5 seasons was absolutely perfect.

The way they wrapped up Walter's story was both satisfying and heartbreaking. From a high school chemistry teacher to the most feared drug lord in the Southwest, his transformation was gradual and believable.

What I loved most:
• The cinematography in the final episodes was stunning
• Jesse's emotional arc and his redemption
• The callback to the pilot episode with the pants
• How they tied up every loose end without feeling rushed

The finale aired 10 years ago but it still holds up as one of the greatest TV endings of all time. What did you all think? Did it live up to your expectations?`,
  author: {
    name: "WalterWhiteFan",
    avatar: "/placeholder.svg?height=48&width=48",
    isVerified: true,
    reputation: 2850,
  },
  likes: 342,
  comments: 89,
  views: 1520,
  rating: 5,
  hasSpoiler: false,
  createdAt: "2 hours ago",
  tags: ["Breaking Bad", "Drama", "Series Finale", "Discussion"],
  image: null,
}

// Mock replies data
const mockReplies = [
  {
    id: 1,
    author: {
      name: "JessePinkmanLover",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
      reputation: 1820,
    },
    content:
      "Completely agree! The finale was perfect. The way they showed Jesse's emotional release when he finally escaped was so powerful. Aaron Paul's acting in that final scene still gives me chills.",
    likes: 45,
    createdAt: "1 hour ago",
    isLiked: false,
  },
  {
    id: 2,
    author: {
      name: "ChemistryNerd",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
      reputation: 620,
    },
    content:
      "What I appreciate most is how realistic the chemistry was throughout the series. They actually consulted with real chemists! The attention to detail in Breaking Bad is unmatched.",
    likes: 28,
    createdAt: "45 minutes ago",
    isLiked: false,
  },
  {
    id: 3,
    author: {
      name: "TVCritic2024",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
      reputation: 3450,
    },
    content:
      "Breaking Bad set the standard for what prestige television should be. The finale didn't disappoint - it honored the characters and the story. Better Call Saul also did an amazing job expanding this universe!",
    likes: 67,
    createdAt: "30 minutes ago",
    isLiked: false,
  },
  {
    id: 4,
    author: {
      name: "BingeFan99",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
      reputation: 340,
    },
    content:
      "I just started my third rewatch! Every time I watch it, I notice new details and foreshadowing. This show is a masterclass in storytelling.",
    likes: 19,
    createdAt: "15 minutes ago",
    isLiked: false,
  },
]
