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
  X,
  Send,
  Loader2,
  Bot,
  Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const NetflixPlayer: React.FC = () => {
  const navigate = useNavigate();

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(80);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your Netflix AI Assistant. I can help you with anything about 'Big Buck Bunny' - ask about the plot, cast, or get personalized recommendations!",
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video URL - using a sample video that works well
  const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const videoPoster = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=1200&fit=crop";

  // Format time helper function
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Handle video metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setVideoLoaded(true);
    }
  };

  // Handle video time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle video ended
  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // Handle play/pause
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle mute toggle
  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (!isMuted && volume === 0) {
        setVolume(50);
        if (videoRef.current) {
          videoRef.current.volume = 0.5;
        }
      }
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
      videoRef.current.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
    }
  };

  // Handle progress change (seeking)
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  // Handle skip
  const handleSkip = (seconds: number) => {
    if (videoRef.current) {
      const newTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, duration));
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

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

  // Initialize video volume
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Auto-play on component mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.log("Autoplay prevented:", error);
        setIsPlaying(false);
      });
    }
  }, []);

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('plot') || message.includes('story') || message.includes('about')) {
      return "Big Buck Bunny is a mind-bending sci-fi thriller about Dr. Sarah Chen, a quantum physicist who discovers a way to communicate with parallel dimensions. As she navigates through different timelines, she must prevent a catastrophic event that threatens to collapse all realities. The film explores themes of destiny, choice, and the interconnectedness of all things.";
    } else if (message.includes('cast') || message.includes('actor') || message.includes('actress')) {
      return "The film stars Emma Stone as Dr. Sarah Chen, bringing emotional depth to the brilliant physicist. Oscar Isaac plays Marcus Vale, her mysterious colleague with hidden motives. Supporting cast includes Michael B. Jordan as Agent Harris and Florence Pugh as Dr. Elena Rodriguez. The ensemble delivers powerful performances under Denis Villeneuve's visionary direction.";
    } else if (message.includes('ending') || message.includes('end') || message.includes('conclusion')) {
      return "Without spoilers: The ending reveals that every choice creates a new timeline, and Sarah learns that true power lies in accepting all possibilities. The final scene suggests that the 'echoes' she's been hearing are actually versions of herself from other dimensions working together—a beautiful metaphor for self-acceptance and unity across all realities.";
    } else if (message.includes('similar') || message.includes('recommend') || message.includes('like this')) {
      return "If you enjoy Big Buck Bunny, I recommend: 1) 'Arrival' for its intelligent sci-fi concepts, 2) 'Inception' for mind-bending reality shifts, 3) 'Everything Everywhere All at Once' for multidimensional storytelling, and 4) 'Interstellar' for its emotional sci-fi depth. All are available on Netflix!";
    } else if (message.includes('director') || message.includes('directed')) {
      return "Big Buck Bunny is directed by Denis Villeneuve, known for his masterful work on Dune, Arrival, and Blade Runner 2049. His signature style of grand visuals, atmospheric storytelling, and intellectual depth is evident throughout this film. This marks his first collaboration with cinematographer Greig Fraser on a Netflix Original.";
    } else if (message.includes('time') || message.includes('duration') || message.includes('long')) {
      return "The film runtime is 2 hours and 18 minutes. It premiered on Netflix on March 15, 2024, and has been streamed over 85 million times in its first month. The pacing is deliberate, allowing the complex narrative to unfold naturally while keeping viewers engaged with stunning visuals and thought-provoking concepts.";
    } else if (message.includes('rating') || message.includes('review') || message.includes('score')) {
      return "Critics praise the film with 94% on Rotten Tomatoes and 8.3/10 on IMDb. Reviewers highlight 'visionary direction,' 'stellar performances,' and 'intellectually satisfying storytelling.' Audiences particularly love the emotional depth and stunning visual effects that seamlessly blend practical and digital artistry.";
    } else if (message.includes('award') || message.includes('nomination') || message.includes('oscar')) {
      return "The film has received 6 Oscar nominations including Best Picture, Best Director (Denis Villeneuve), Best Actress (Emma Stone), Best Cinematography, Best Visual Effects, and Best Original Score. It won the Critics' Choice Award for Best Sci-Fi Film and has 8 nominations for the upcoming Stream Awards.";
    } else {
      return "I'm your dedicated Netflix AI Assistant! I can help you understand Big Buck Bunny better—ask about the plot, characters, themes, or recommendations for similar movies. Feel free to ask anything specific about this film or if you'd like me to explain any particular scene you're watching right now!";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate API call with hardcoded responses
    setTimeout(() => {
      const response = getAIResponse(userMessage);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 800);
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

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex font-sans">
      {/* Main Video Player Area */}
      <div className={`relative flex-1 transition-all duration-500 ease-in-out ${isChatOpen ? 'mr-96' : ''}`}>
        {/* Video Container */}
        <div
          className="relative w-full h-full bg-gradient-to-br from-gray-950 via-black to-red-950/20 overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Actual Video Element */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={videoUrl}
            poster={videoPoster}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnd}
            loop={false}
            playsInline
            preload="metadata"
          />
          
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

          {/* Loading Overlay */}
          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
                <p className="text-gray-400">Loading video...</p>
              </div>
            </div>
          )}

          {/* Top Gradient Overlay */}
          <div
            className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black via-black/90 to-transparent transition-all duration-500 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="p-8 flex items-center justify-between">
              <button className="text-white hover:text-red-400 transition-colors duration-300 group">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/60 transition-colors">
                    <X className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Exit</span>
                </div>
              </button>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Big Buck Bunny</div>
                <div className="text-sm text-gray-400 mt-1">Now Playing • S1:E1</div>
              </div>
              <div className="w-32" />
            </div>
          </div>

          {/* Center Play Button (when paused) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlayPause}
                className="group relative w-28 h-28 rounded-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 flex items-center justify-center transition-all transform hover:scale-110 shadow-2xl shadow-red-600/30"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600/0 to-red-500/0 group-hover:from-red-700/20 group-hover:to-red-600/20 blur-md" />
                <Play className="w-14 h-14 text-white ml-2" />
              </button>
            </div>
          )}

          {/* Bottom Controls */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent transition-all duration-500 ${
              showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {/* Progress Bar */}
            <div className="px-8 pb-3">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-1 px-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="relative">
                <div className="absolute h-1.5 w-full bg-gray-800/60 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 180}
                  value={currentTime}
                  onChange={handleProgressChange}
                  className="absolute w-full h-1.5 opacity-0 cursor-pointer z-10"
                  aria-label="Video progress"
                />
                <div 
                  className="absolute w-4 h-4 bg-white rounded-full shadow-lg -translate-y-1.5 cursor-pointer hover:scale-125 transition-transform"
                  style={{ left: `calc(${progressPercentage}% - 8px)` }}
                />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="px-8 pb-8 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => handleSkip(-10)}
                  className="text-white hover:text-red-400 transition-colors group"
                  aria-label="Skip back 10 seconds"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <SkipBack className="w-6 h-6" />
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={handlePlayPause}
                  className="text-white hover:text-red-400 transition-colors group"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center group-hover:from-red-700 group-hover:to-red-600 transition-all shadow-lg">
                    {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                  </div>
                </button>
                
                <button
                  onClick={() => handleSkip(10)}
                  className="text-white hover:text-red-400 transition-colors group"
                  aria-label="Skip forward 10 seconds"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <SkipForward className="w-6 h-6" />
                    </div>
                  </div>
                </button>

                <div className="flex items-center gap-3 ml-2">
                  <button
                    onClick={handleMuteToggle}
                    className="text-white hover:text-red-400 transition-colors group"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </div>
                  </button>
                  <div className="relative w-32">
                    <div className="absolute h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-300"
                        style={{ width: `${isMuted ? 0 : volume}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="absolute w-full h-1.5 opacity-0 cursor-pointer z-10"
                      aria-label="Volume control"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 group ${
                    isChatOpen
                      ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-600/20'
                      : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
                  }`}
                  aria-label={isChatOpen ? 'Close chat' : 'Open chat'}
                >
                  <Bot className="w-5 h-5" />
                  <span className="font-semibold">AI Assistant</span>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </button>
                
                <button
                  className="text-white hover:text-red-400 transition-colors group"
                  aria-label="Settings"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Settings className="w-6 h-6" />
                  </div>
                </button>
                
                <button
                  className="text-white hover:text-red-400 transition-colors group"
                  aria-label="Fullscreen"
                  onClick={() => {
                    if (videoRef.current?.requestFullscreen) {
                      videoRef.current.requestFullscreen();
                    }
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Maximize className="w-6 h-6" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-96 bg-gradient-to-b from-gray-950 to-black border-l border-gray-800/50 flex flex-col transition-all duration-500 ease-in-out backdrop-blur-xl ${
          isChatOpen ? 'translate-x-0 shadow-2xl shadow-red-900/10' : 'translate-x-full'
        }`}
      >
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 p-6 border-b border-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center shadow-lg">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-gray-950" />
              </div>
              <div>
                <div className="text-white font-bold text-xl">Netflix AI</div>
                <div className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Real-time movie assistant</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800/50"
              aria-label="Close chat"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="mt-6">
            <div className="text-sm text-gray-400 mb-3">Ask about Big Buck Bunny:</div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl p-4 transition-all duration-300 ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg' 
                    : 'bg-gray-900/60 backdrop-blur-sm text-gray-100 border border-gray-800/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600/20 to-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-red-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    {msg.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-900/60 backdrop-blur-sm text-gray-100 rounded-2xl p-4 flex items-center gap-3 border border-gray-800/50">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600/20 to-red-500/20 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-red-400 animate-spin" />
                </div>
                <div>
                  <div className="font-medium">Thinking...</div>
                  <div className="text-sm text-gray-400">Analyzing your question</div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-6 border-t border-gray-800/50 bg-gradient-to-t from-gray-950/50 to-transparent">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about the movie, cast, or plot..."
                className="w-full bg-gray-900/60 backdrop-blur-sm text-white rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-red-500/50 border border-gray-800/50 focus:border-red-500/30 transition-all"
                disabled={isLoading}
                aria-label="Chat input"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                ⏎ Enter
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 disabled:from-gray-800 disabled:to-gray-800 disabled:cursor-not-allowed text-white rounded-xl px-5 py-3.5 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-red-600/20 disabled:shadow-none"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4 text-xs text-gray-500 text-center flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3" />
            <span>Powered by Netflix AI • Real-time movie insights</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetflixPlayer;