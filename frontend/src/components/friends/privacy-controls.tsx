/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Eye, Users, Lock, Globe } from "lucide-react"

export default function PrivacyControls() {
  const [settings, setSettings] = useState({
    watchingActivity: "friends",
    ratings: "public",
    reviews: "friends",
  })

  const visibilityOptions = [
    { value: "public", label: "Public", icon: Globe },
    { value: "friends", label: "Friends", icon: Users },
    { value: "private", label: "Private", icon: Lock },
  ]

  const updateSetting = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="glass-effect rounded-xl p-6 space-y-6 animate-fadeInUp">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-primary/20 rounded-lg">
          <Eye size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-bold">Privacy & Control</h3>
          <p className="text-xs text-muted-foreground mt-1">You control what your friends can see</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Watching Activity */}
        <PrivacySetting
          label="Watching Activity"
          description="Who can see what you're watching"
          value={settings.watchingActivity}
          onChange={(value) => updateSetting("watchingActivity", value)}
          options={visibilityOptions}
        />

        {/* Ratings */}
        <PrivacySetting
          label="Ratings"
          description="Who can see your ratings"
          value={settings.ratings}
          onChange={(value) => updateSetting("ratings", value)}
          options={visibilityOptions}
        />

        {/* Reviews */}
        <PrivacySetting
          label="Reviews & Comments"
          description="Who can see your reviews"
          value={settings.reviews}
          onChange={(value) => updateSetting("reviews", value)}
          options={visibilityOptions}
        />
      </div>

      <div className="pt-4 border-t border-white/10">
        <button className="text-sm text-primary hover:text-red-600 font-semibold transition-colors">
          Advanced Settings →
        </button>
      </div>
    </div>
  )
}

function PrivacySetting({
  label,
  description,
  value,
  onChange,
  options,
}: {
  label: string
  description: string
  value: string
  onChange: (value: string) => void
  options: any[]
}) {
  return (
    <div className="space-y-2">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => {
          const Icon = option.icon
          const isActive = value === option.value

          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                isActive
                  ? "bg-primary/20 border-primary text-primary"
                  : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:border-white/20"
              }`}
            >
              <Icon size={16} />
              <span className="text-xs font-medium">{option.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
