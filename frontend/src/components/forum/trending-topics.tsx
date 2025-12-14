"use client"

import { TrendingUp, Flame } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function TrendingTopics() {
  const trendingTopics = [
    { tag: "Breaking Bad", posts: 234, trend: "+15%" },
    { tag: "Stranger Things S5", posts: 189, trend: "+28%" },
    { tag: "Squid Game", posts: 156, trend: "+12%" },
    { tag: "The Crown", posts: 142, trend: "+8%" },
    { tag: "Wednesday", posts: 128, trend: "+22%" },
  ]

  return (
    <aside className="hidden xl:block w-80 shrink-0">
      <div className="sticky top-20 space-y-6">
        {/* Trending Topics */}
        <div className="glass-effect rounded-lg p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Flame size={20} className="text-primary" />
            <h2 className="text-lg font-bold">Trending Topics</h2>
          </div>

          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <div
                key={topic.tag}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                    {topic.tag}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{topic.posts} posts</span>
                    <Badge variant="default" className="text-xs">
                      <TrendingUp size={10} className="mr-1" />
                      {topic.trend}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="glass-effect rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-bold">Community Guidelines</h3>
          <ul className="text-xs text-muted-foreground space-y-2">
            <li>• Be respectful and constructive</li>
            <li>• Mark spoilers appropriately</li>
            <li>• No spam or self-promotion</li>
            <li>• Stay on topic</li>
          </ul>
        </div>
      </div>
    </aside>
  )
}
