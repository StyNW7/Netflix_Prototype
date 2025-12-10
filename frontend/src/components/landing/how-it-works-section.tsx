"use client"

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Create Account",
      description: "Sign up with your email and choose your plan.",
    },
    {
      number: "02",
      title: "Choose Plan",
      description: "Select from Basic, Standard, or Premium subscription.",
    },
    {
      number: "03",
      title: "Start Watching",
      description: "Access thousands of shows and movies instantly.",
    },
    {
      number: "04",
      title: "Enjoy Premium",
      description: "Experience unlimited entertainment with no ads.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            How It <span className="netflix-text">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">Simple steps to unlock unlimited entertainment.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative animate-fadeInUp" style={{ animationDelay: `${index * 100}ms` }}>
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[90%] h-0.5 bg-gradient-to-r from-primary to-transparent" />
              )}

              <div className="glass-effect p-8 rounded-lg hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-bold text-primary/50">{step.number}</span>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">{index + 1}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
