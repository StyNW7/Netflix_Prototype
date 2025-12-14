"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ArrowLeft, Film, Star, AlertTriangle, Globe, Tag, Upload, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router"

export default function CreateForumPage() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "movies",
    movie: "",
    rating: 0,
    hasSpoiler: false,
    region: "global",
    tags: [] as string[],
    image: null as File | null,
  })
  const [tagInput, setTagInput] = useState("")
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const categories = [
    { value: "movies", label: "Movies", icon: Film },
    { value: "shows", label: "TV Shows", icon: Film },
    { value: "reviews", label: "Reviews", icon: Star },
    { value: "community", label: "Community", icon: Globe },
  ]

  const regions = [
    { value: "global", label: "Global" },
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "kr", label: "South Korea" },
    { value: "jp", label: "Japan" },
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && formData.tags.length < 5) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      })
      setTagInput("")
    }
  }

  const handleRemoveTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    // Redirect to forum page or detail page
    navigate("/forum")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="relative w-full h-48 pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-secondary to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <div className="max-w-4xl mx-auto w-full">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft size={18} />
              Back to Forum
            </button>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
              <span className="netflix-text">Create</span> New Post
            </h1>
            <p className="text-muted-foreground mt-2">Share your thoughts with the Netflix community</p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Content Card */}
          <div className="glass-effect rounded-lg p-6 sm:p-8 space-y-6 animate-fadeInUp">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                Post Title <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="What's on your mind?"
                className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/20 focus:border-primary rounded-lg px-4 py-3 text-lg font-medium transition-all duration-300 focus:outline-none"
                required
              />
            </div>

            {/* Category and Movie Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  Category <span className="text-primary">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => {
                    const Icon = cat.icon
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat.value })}
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                          formData.category === cat.value
                            ? "bg-primary text-white shadow-lg shadow-primary/30"
                            : "bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Icon size={16} />
                        {cat.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Region */}
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Globe size={16} />
                  Region
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/20 focus:border-primary rounded-lg px-4 py-3 transition-all duration-300 focus:outline-none cursor-pointer"
                >
                  {regions.map((region) => (
                    <option key={region.value} value={region.value} className="bg-secondary text-foreground">
                      {region.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Movie/Show Title */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Film size={16} />
                Movie or Show Title
              </label>
              <input
                type="text"
                value={formData.movie}
                onChange={(e) => setFormData({ ...formData, movie: e.target.value })}
                placeholder="e.g., Breaking Bad, Stranger Things, The Crown..."
                className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/20 focus:border-primary rounded-lg px-4 py-3 transition-all duration-300 focus:outline-none"
              />
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Star size={16} />
                Your Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="transition-all duration-300 hover:scale-110"
                  >
                    <Star
                      size={32}
                      className={`${
                        star <= formData.rating ? "text-primary fill-current" : "text-white/20 hover:text-white/40"
                      } transition-colors`}
                    />
                  </button>
                ))}
                {formData.rating > 0 && (
                  <span className="ml-2 flex items-center text-lg font-bold text-primary">{formData.rating}.0</span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                Post Content <span className="text-primary">*</span>
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Share your thoughts, reviews, theories, or questions..."
                rows={8}
                className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/20 focus:border-primary rounded-lg px-4 py-3 transition-all duration-300 focus:outline-none resize-none"
                required
              />
              <p className="text-xs text-muted-foreground">{formData.content.length} characters</p>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Upload size={16} />
                Upload Image (Optional)
              </label>
              <div className="relative">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 hover:border-primary rounded-lg cursor-pointer transition-all duration-300 group"
                >
                  {previewImage ? (
                    <img
                      src={previewImage || "/placeholder.svg"}
                      alt="Preview"
                      className="h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <Upload size={24} className="mx-auto text-muted-foreground group-hover:text-primary" />
                      <p className="text-sm text-muted-foreground mt-2">Click to upload an image</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Tag size={16} />
                Tags (Max 5)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                  placeholder="Add a tag..."
                  className="flex-1 bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/20 focus:border-primary rounded-lg px-4 py-2 transition-all duration-300 focus:outline-none"
                  disabled={formData.tags.length >= 5}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  disabled={formData.tags.length >= 5}
                  className="px-4 py-2 bg-primary hover:bg-red-600 disabled:bg-white/10 disabled:text-muted-foreground text-white rounded-lg font-medium transition-all disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-sm py-1 px-3">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                        className="ml-2 hover:text-primary transition-colors"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Spoiler Warning */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <input
                type="checkbox"
                id="spoiler"
                checked={formData.hasSpoiler}
                onChange={(e) => setFormData({ ...formData, hasSpoiler: e.target.checked })}
                className="w-5 h-5 rounded cursor-pointer"
              />
              <label htmlFor="spoiler" className="flex items-center gap-2 text-sm cursor-pointer">
                <AlertTriangle size={18} className="text-yellow-500" />
                <span>This post contains spoilers</span>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg font-semibold transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-primary hover:bg-red-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 flex items-center justify-center gap-2"
            >
              <Sparkles size={20} />
              Publish Post
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}
