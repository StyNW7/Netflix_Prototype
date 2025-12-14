import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  SkipBack,
  SkipForward,
  MessageSquare,
  X,
  Send,
  Loader2,
} from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const NetflixPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(100);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, ] = useState<number>(180); // 3 minutes demo
  const [showControls, setShowControls] = useState<boolean>(true);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Netflix Bot. Ask me anything about this movie, the cast, plot, or get personalized recommendations!",
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Format time helper function
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Simulate video playback
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime((prev) => Math.min(prev + 1, duration));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentTime, duration]);

  // Auto-hide controls
  useEffect(() => {
    if (showControls && isPlaying) {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [showControls, isPlaying]);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleMuteToggle = () => setIsMuted(!isMuted);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value, 10);
    setCurrentTime(newTime);
  };

  const handleSkip = (seconds: number) => {
    setCurrentTime((prev) => Math.max(0, Math.min(prev + seconds, duration)));
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // IMPORTANT: Replace with your actual API endpoint and use environment variables
      const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY || '';
      const apiUrl = process.env.REACT_APP_ANTHROPIC_API_URL || 'https://api.anthropic.com/v1/messages';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 1000,
          system:
            'You are Netflix Bot, an AI assistant integrated into Netflix. You help users with questions about the movie "Echoes of Tomorrow" - a sci-fi thriller about time travel and parallel dimensions. The cast includes Emma Stone as Dr. Sarah Chen, Oscar Isaac as Marcus Vale, and directed by Denis Villeneuve. Be conversational, helpful, and enthusiastic about movies. Keep responses concise (2-3 sentences) unless asked for more detail.',
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = data.content
        .filter((item: { type: string }) => item.type === 'text')
        .map((item: { text: string }) => item.text)
        .join('\n');

      setMessages((prev) => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I\'m having trouble connecting right now. Please try again later!',
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

  const handleMouseMove = () => setShowControls(true);
  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex">
      {/* Main Video Player Area */}
      <div className={`relative flex-1 transition-all duration-300 ${isChatOpen ? 'mr-96' : ''}`}>
        {/* Video Container */}
        <div
          className="relative w-full h-full bg-gradient-to-br from-gray-900 via-black to-red-950"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Simulated Video Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold text-red-600 mb-4">ECHOES OF TOMORROW</div>
              <div className="text-2xl text-gray-400">A Netflix Original Film</div>
            </div>
          </div>

          {/* Top Gradient Overlay */}
          <div
            className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="p-6 flex items-center justify-between">
              <button className="text-white hover:text-red-600 transition-colors">
                <X className="w-8 h-8" />
              </button>
              <div className="text-white text-lg font-semibold">Echoes of Tomorrow</div>
              <div className="w-8" />
            </div>
          </div>

          {/* Center Play Button (when paused) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlayPause}
                className="w-24 h-24 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-all transform hover:scale-110 shadow-2xl"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                <Play className="w-12 h-12 text-white ml-2" />
              </button>
            </div>
          )}

          {/* Bottom Controls */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Progress Bar */}
            <div className="px-6 pb-2">
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleProgressChange}
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #E50914 0%, #E50914 ${progressPercentage}%, #4B5563 ${progressPercentage}%, #4B5563 100%)`,
                }}
                aria-label="Video progress"
              />
            </div>

            {/* Control Buttons */}
            <div className="px-6 pb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleSkip(-10)}
                  className="text-white hover:text-red-600 transition-colors"
                  aria-label="Skip back 10 seconds"
                >
                  <SkipBack className="w-7 h-7" />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="text-white hover:text-red-600 transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </button>
                <button
                  onClick={() => handleSkip(10)}
                  className="text-white hover:text-red-600 transition-colors"
                  aria-label="Skip forward 10 seconds"
                >
                  <SkipForward className="w-7 h-7" />
                </button>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={handleMuteToggle}
                    className="text-white hover:text-red-600 transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-6 h-6" />
                    ) : (
                      <Volume2 className="w-6 h-6" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #E50914 0%, #E50914 ${volume}%, #4B5563 ${volume}%, #4B5563 100%)`,
                    }}
                    aria-label="Volume control"
                  />
                </div>

                <div className="text-white text-sm ml-4">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isChatOpen
                      ? 'bg-red-600 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  aria-label={isChatOpen ? 'Close chat' : 'Open chat'}
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-medium">Netflix Bot</span>
                </button>
                <button
                  className="text-white hover:text-red-600 transition-colors"
                  aria-label="Settings"
                >
                  <Settings className="w-6 h-6" />
                </button>
                <button
                  className="text-white hover:text-red-600 transition-colors"
                  aria-label="Fullscreen"
                >
                  <Maximize className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-96 bg-black border-l border-red-900/30 flex flex-col transition-transform duration-300 ${
          isChatOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-white font-bold">Netflix Bot</div>
              <div className="text-red-100 text-xs">AI Assistant</div>
            </div>
          </div>
          <button
            onClick={() => setIsChatOpen(false)}
            className="text-white hover:text-red-200 transition-colors"
            aria-label="Close chat"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.role === 'user' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-100'
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

        {/* Chat Input */}
        <div className="p-4 border-t border-red-900/30">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about the movie..."
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              disabled={isLoading}
              aria-label="Chat input"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg px-4 py-3 transition-colors"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500 text-center">Powered by Claude AI</div>
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #E50914;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .slider:hover::-webkit-slider-thumb {
          opacity: 1;
        }
        .slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #E50914;
          cursor: pointer;
          border: none;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .slider:hover::-moz-range-thumb {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default NetflixPlayer;