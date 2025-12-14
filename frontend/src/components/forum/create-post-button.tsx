"use client"

import { Plus } from "lucide-react"

export default function CreatePostButton() {
  return (
    <button className="w-full glass-effect hover:bg-white/10 border-2 border-dashed border-white/20 hover:border-primary rounded-lg p-6 transition-all duration-300 group">
      <div className="flex items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/20 group-hover:bg-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110">
          <Plus size={24} className="text-primary group-hover:text-white" />
        </div>
        <div className="text-left">
          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">Create New Post</h3>
          <p className="text-sm text-muted-foreground">Share your thoughts with the community</p>
        </div>
      </div>
    </button>
  )
}
