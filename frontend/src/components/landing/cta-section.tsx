"use client"

export default function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-3xl" />
        <div className="absolute -top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 animate-fadeInUp">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          Ready to Start Your <span className="netflix-text">Journey?</span>
        </h2>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Join millions of members and discover thousands of movies and TV shows. Choose your plan and start watching
          today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button className="group bg-primary hover:bg-red-700 text-white px-10 py-4 rounded font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50">
            Start Free Trial
          </button>
          <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-10 py-4 rounded font-semibold transition-all duration-300 hover:scale-105">
            View Plans
          </button>
        </div>

        <p className="text-sm text-muted-foreground">No credit card required. First month on us.</p>
      </div>
    </section>
  )
}
