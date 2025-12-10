"use client"

import { useEffect, useState } from "react"

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    const element = document.getElementById("stats-section")
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const stats = [
    { label: "250M+", description: "Subscribers Worldwide" },
    { label: "15,000+", description: "Titles Available" },
    { label: "190+", description: "Countries" },
    { label: "100+", description: "Original Series" },
  ]

  return (
    <section id="stats-section" className="py-20 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center space-y-2 animate-scaleIn"
              style={{ animationDelay: isVisible ? `${index * 100}ms` : "0ms" }}
            >
              <div className="text-5xl sm:text-6xl font-bold text-primary">{stat.label}</div>
              <p className="text-lg text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
