"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, X, Sparkles, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatbotSidebarProps {
  isOpen: boolean
  onClose: () => void
  movieTitle: string
  movieDescription: string
}

export default function ChatbotSidebar({ isOpen, onClose, movieTitle }: ChatbotSidebarProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hi! I'm your Netflix AI assistant. I can help you with information about "${movieTitle}", answer questions, or provide recommendations. What would you like to know?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Handle send message
  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(input),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  // Mock AI response generator
  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("recommend") || lowerQuery.includes("suggestion")) {
      return "Based on your interest in Breaking Bad, I recommend:\n\n1. Better Call Saul - Prequel series\n2. Ozark - Similar crime drama theme\n3. The Wire - Classic crime series\n4. Narcos - Drug cartel drama\n\nWould you like more details about any of these?"
    }

    if (lowerQuery.includes("cast") || lowerQuery.includes("actor")) {
      return "The main cast includes:\n\n• Bryan Cranston as Walter White\n• Aaron Paul as Jesse Pinkman\n• Anna Gunn as Skyler White\n• Dean Norris as Hank Schrader\n\nThe show won multiple Emmy Awards for its outstanding performances!"
    }

    if (lowerQuery.includes("plot") || lowerQuery.includes("story")) {
      return "Breaking Bad follows Walter White, a high school chemistry teacher who turns to cooking methamphetamine after being diagnosed with cancer. The show explores his transformation from a mild-mannered teacher to a ruthless drug lord, and the consequences of his choices on his family and those around him."
    }

    return "That's an interesting question! I can help you with information about the cast, plot, recommendations, or any other questions about the content. What would you like to know more about?"
  }

  // Handle enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Quick prompts
  const quickPrompts = [
    "Tell me about the cast",
    "What should I watch next?",
    "Explain the plot",
    "What awards did this win?",
  ]

  return (
    <div
      className={cn(
        "fixed top-0 right-0 h-full bg-black/95 backdrop-blur-xl border-l border-white/10 flex flex-col transition-all duration-300 z-50",
        isOpen ? "w-full sm:w-[400px] translate-x-0" : "w-0 translate-x-full",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Sparkles className="text-primary" size={20} />
          </div>
          <div>
            <h2 className="font-bold text-lg">Netflix Bot</h2>
            <p className="text-xs text-gray-400">AI Assistant</p>
          </div>
        </div>
        <Button onClick={onClose} variant="ghost" size="icon" className="hover:bg-white/10">
          <X size={20} />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex gap-3 animate-fadeInUp", message.role === "user" ? "justify-end" : "justify-start")}
            >
              {message.role === "assistant" && (
                <Avatar className="w-8 h-8 bg-primary/20 border border-primary/30">
                  <AvatarFallback className="bg-transparent">
                    <Sparkles className="text-primary" size={16} />
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed",
                  message.role === "user"
                    ? "bg-primary text-white rounded-br-sm"
                    : "bg-white/10 text-white rounded-bl-sm",
                )}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className="text-[10px] opacity-50 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>

              {message.role === "user" && (
                <Avatar className="w-8 h-8 bg-white/10">
                  <AvatarFallback className="bg-transparent text-white">U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 animate-fadeInUp">
              <Avatar className="w-8 h-8 bg-primary/20 border border-primary/30">
                <AvatarFallback className="bg-transparent">
                  <Sparkles className="text-primary" size={16} />
                </AvatarFallback>
              </Avatar>
              <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
                <Loader2 className="animate-spin text-primary" size={20} />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Prompts */}
      {messages.length <= 1 && (
        <div className="px-4 pb-3">
          <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => setInput(prompt)}
                className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 bg-white/5 border-white/10 focus:border-primary rounded-full px-4"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="rounded-full bg-primary hover:bg-primary/80 disabled:opacity-50"
            size="icon"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </Button>
        </div>
      </div>
    </div>
  )
}
