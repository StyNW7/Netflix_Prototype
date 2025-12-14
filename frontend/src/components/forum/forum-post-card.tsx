"use client"

import { useState } from "react"
import { ThumbsUp, MessageSquare, Eye, Star, AlertTriangle, BadgeCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ForumPost {
  id: number
  title: string
  content: string
  author: {
    name: string
    avatar: string
    isVerified: boolean
    reputation: number
  }
  likes: number
  comments: number
  views: number
  rating: number
  hasSpoiler: boolean
  createdAt: string
  tags: string[]
}

interface ForumPostCardProps {
  post: ForumPost
}

export default function ForumPostCard({ post }: ForumPostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
  }

  return (
    <div className="glass-effect rounded-lg p-6 hover:bg-white/5 transition-all duration-300 group animate-fadeInUp">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3 flex-1">
          {/* Avatar */}
          <img
            src={post.author.avatar || "/placeholder.svg"}
            alt={post.author.name}
            className="w-10 h-10 rounded-full"
          />

          {/* Author Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold">{post.author.name}</span>
              {post.author.isVerified && (
                <Badge variant="default" className="flex items-center gap-1">
                  <BadgeCheck size={12} />
                  Verified
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">• {post.createdAt}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">{post.author.reputation} reputation</div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 bg-primary/20 px-3 py-1 rounded-lg">
          <Star size={14} className="text-primary fill-current" />
          <span className="text-sm font-bold">{post.rating}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors cursor-pointer line-clamp-2">
        {post.hasSpoiler && <AlertTriangle size={18} className="inline mr-2 text-yellow-500" />}
        {post.title}
      </h3>

      {/* Content */}
      <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">{post.content}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 pt-4 border-t border-white/10">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 text-sm transition-all ${
            isLiked ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ThumbsUp size={16} className={isLiked ? "fill-current" : ""} />
          <span>{likesCount}</span>
        </button>

        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <MessageSquare size={16} />
          <span>{post.comments}</span>
        </button>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Eye size={16} />
          <span>{post.views}</span>
        </div>

        <button className="ml-auto text-sm text-primary hover:text-red-600 transition-colors font-medium">
          Read More →
        </button>
      </div>
    </div>
  )
}
