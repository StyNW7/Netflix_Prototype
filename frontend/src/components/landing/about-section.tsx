"use client"

export default function AboutSection() {
  const features = [
    {
      title: "4K Ultra HD",
      description: "Experience stunning visual quality with our premium streaming service.",
      icon: "🎬",
    },
    {
      title: "Multi-Device",
      description: "Watch on your phone, tablet, TV, and computer simultaneously.",
      icon: "📱",
    },
    {
      title: "Offline Download",
      description: "Download your favorite content to watch offline anytime.",
      icon: "⬇️",
    },
    {
      title: "Family Profiles",
      description: "Create personalized profiles for each family member.",
      icon: "👨‍👩‍👧‍👦",
    },
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-transparent to-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Why Choose <span className="netflix-text">Netflix?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer the best streaming experience with cutting-edge technology and exclusive content.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-effect p-8 rounded-lg hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
