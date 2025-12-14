"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FriendsActivityFeed from "@/components/friends/friends-activity-feed"
import SocialRecommendations from "@/components/friends/social-recommendations"
import TasteMatchPanel from "@/components/friends/taste-match-panel"
import PrivacyControls from "@/components/friends/privacy-controls"

export default function FriendsPage() {
  const [filter, setFilter] = useState("all")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Header */}
      <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="max-w-7xl mx-auto text-center space-y-4 animate-fadeInUp">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">Friends Activity</h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Discover what people with similar taste are watching
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Feed */}
          <div className="flex-1 space-y-8">
            {/* Filter Tabs */}
            <div className="flex gap-4 border-b border-white/10 pb-2 overflow-x-auto">
              {["all", "watching", "rated", "reviewed"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-t-lg font-semibold capitalize transition-colors whitespace-nowrap ${
                    filter === tab
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Activity Feed */}
            <FriendsActivityFeed filter={filter} />

            {/* Social Recommendations */}
            <SocialRecommendations />
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block w-80 space-y-6">
            {/* Taste Match Panel */}
            <TasteMatchPanel />

            {/* Privacy Controls */}
            <PrivacyControls />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
