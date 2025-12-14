import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, ChevronDown } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type FloatingChatbotProps = {
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  initialOpen?: boolean;
};

const FloatingChatbot: React.FC<FloatingChatbotProps> = ({
  position = 'bottom-right',
  initialOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your Netflix AI Assistant. Ask me anything about movies, shows, or get personalized recommendations! 🎬",
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Position classes mapping
  const positionClasses = {
    'bottom-left': 'bottom-6 left-6',
    'bottom-right': 'bottom-16 right-14',
    'top-left': 'top-6 left-6',
    'top-right': 'top-6 right-6',
  };

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Simulate API call - Replace with actual API in production
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock responses based on user input
      const mockResponses = [
        "That's a great question! Let me check the latest information about that. Based on what I know, the new season is expected to release next month.",
        "I'd recommend checking out 'Stranger Things' or 'The Witcher' if you enjoy fantasy and adventure! Both have amazing storytelling.",
        "For family-friendly content, I'd suggest 'The Mitchells vs The Machines' or 'Klaus'. Both are highly rated and entertaining for all ages!",
        "Netflix Originals are exclusive content produced by Netflix. Some popular ones include 'The Crown', 'Bridgerton', and 'Squid Game'.",
        "You can manage your subscription by going to 'Account' in the Netflix menu. From there, you can update your plan, payment method, or cancel if needed.",
        "Yes! Netflix offers a wide variety of international content with subtitles and dubbing options. You can browse by language in the 'International' category.",
        "That show is available in 4K Ultra HD! Make sure your subscription plan supports 4K and that your device and internet connection meet the requirements.",
        "Netflix regularly adds new content every month. You can check the 'New & Popular' section to see the latest releases.",
        "Parental controls allow you to set maturity levels for profiles and require a PIN for certain content. You can set this up in 'Account' > 'Parental Controls'.",
        "Make sure you have a stable internet connection, try restarting the app or device, and check if there are any service outages in your area."
      ];

      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: randomResponse }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I'm having trouble connecting right now. Please try again later! 🔄",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    if (isOpen && isMinimized) {
      setIsMinimized(false);
    } else if (isOpen && !isMinimized) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const suggestions = [
    "What's new on Netflix?",
    "Recommend a movie",
    "How do I cancel?",
    "Best Netflix Originals",
  ];

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* Floating Chat Window */}
      {isOpen && (
        <div
          className={`bg-black border border-red-900/50 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
            isMinimized 
              ? 'w-80 h-16' 
              : 'w-96 h-[700px]'
          }`}
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <h3 className="w-6 h-6 text-white" >N</h3>
              </div>
              <div>
                <div className="text-white font-bold text-lg">Netflix AI</div>
                <div className="text-red-100 text-xs">Powered by AI Assistant</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {!isMinimized && (
                <button
                  onClick={handleMinimize}
                  className="text-white hover:text-red-200 transition-colors p-1"
                  aria-label="Minimize chat"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={handleClose}
                className="text-white hover:text-red-200 transition-colors p-1"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Content - Only shown when not minimized */}
          {!isMinimized && (
            <>
              {/* Chat Messages */}
              <div className="flex-1 h-[calc(500px-180px)] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900 to-black">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 ${
                        msg.role === 'user'
                          ? 'bg-red-600 text-white rounded-br-none'
                          : 'bg-gray-800 text-gray-100 rounded-bl-none'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800 text-gray-100 rounded-lg p-3 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Suggestions */}
              <div className="px-4 py-2 bg-gray-900/50 border-t border-red-900/30">
                <div className="text-xs text-gray-400 mb-2">Quick suggestions:</div>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInputMessage(suggestion);
                        inputRef.current?.focus();
                      }}
                      className="px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-full transition-colors border border-gray-700"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-black border-t border-red-900/30">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about Netflix..."
                    className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-700"
                    disabled={isLoading}
                    aria-label="Chat input"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg px-4 py-3 transition-colors flex items-center justify-center min-w-[48px]"
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-500 text-center">
                  Responses are AI-generated. Netflix is a registered trademark.
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={toggleChat}
        className={`mt-4 w-14 h-14 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white/20 ${
          isOpen ? 'rotate-0' : 'rotate-0'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageSquare className="w-6 h-6 text-white" />
        )}
        
        {/* Notification Badge */}
        {messages.length === 1 && !isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-xs font-bold text-white">1</span>
          </div>
        )}
      </button>

      {/* Chatbot Status Indicator */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full border border-red-900/30">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-300 font-medium">AI Assistant Ready</span>
        </div>
      </div>
    </div>
  );
};

export default FloatingChatbot;