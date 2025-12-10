"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is Netflix?",
      answer:
        "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    },
    {
      question: "How much does Netflix cost?",
      answer:
        "We offer multiple plans starting from $6.99/month for our Basic plan up to $19.99/month for our Premium plan. You can change or cancel anytime.",
    },
    {
      question: "Can I watch offline?",
      answer:
        "Yes, you can download titles to your phone or tablet with our Premium membership and watch them offline without an internet connection.",
    },
    {
      question: "Where can I watch Netflix?",
      answer:
        "Netflix is available on all your favorite devices including smartphones, tablets, smart TVs, computers, and streaming devices like Roku and Apple TV.",
    },
    {
      question: "Can I share my account?",
      answer:
        "Yes, with our Family Plan, you can share your account with up to 4 different households. Each household gets their own profile and personalized experience.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel anytime from your account settings. Your access continues until the end of your billing cycle. No hidden fees or early termination charges.",
    },
  ]

  return (
    <section id="faq" className="py-20 bg-black/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Frequently Asked <span className="netflix-text">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">Find answers to common questions about Netflix.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-effect rounded-lg overflow-hidden animate-fadeInUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
              >
                <h3 className="text-lg font-semibold text-left">{faq.question}</h3>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 border-t border-white/10 text-muted-foreground">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
