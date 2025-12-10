"use client"

import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Premium Member",
      content: "Netflix has completely changed how I consume entertainment. The selection is incredible!",
      rating: 5,
      avatar: "👩‍💼",
    },
    {
      name: "Michael Chen",
      role: "Family Plan User",
      content: "The family profiles are perfect for our household. Everyone gets their personalized experience.",
      rating: 5,
      avatar: "👨‍💻",
    },
    {
      name: "Emma Davis",
      role: "Premium Member",
      content: "The 4K quality is stunning. Best streaming service I have tried so far.",
      rating: 5,
      avatar: "👩‍🎓",
    },
    {
      name: "James Wilson",
      role: "Standard Member",
      content: "Great value for money. So many options and the no-ads experience is fantastic.",
      rating: 5,
      avatar: "👨‍🎨",
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            What Our Members <span className="netflix-text">Say</span>
          </h2>
          <p className="text-lg text-muted-foreground">Join millions of satisfied customers worldwide.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-effect p-6 rounded-lg hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-2 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4">{testimonial.content}</p>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{testimonial.avatar}</span>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
