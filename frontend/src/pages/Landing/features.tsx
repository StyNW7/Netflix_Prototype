import { useState, useEffect } from 'react';
import { Sparkles, MessageSquare, Users, Save, LayoutDashboard, ArrowRight, TrendingUp, ChevronDown } from 'lucide-react';

const NetflixFeaturesHome = () => {
  const [,setHoveredCard] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      id: 'fyp',
      title: 'Netflix FYP',
      description: 'Your personalized For You Page powered by advanced AI. Discover content tailored perfectly to your taste with smart recommendations.',
      icon: TrendingUp,
      color: 'from-red-600 to-pink-600',
      image: '🎯',
      link: '#fyp'
    },
    {
      id: 'bot',
      title: 'Netflix Bot',
      description: 'AI-powered chat assistant that helps you find content, answers questions, and enhances your viewing experience in real-time.',
      icon: MessageSquare,
      color: 'from-red-600 to-orange-600',
      image: '🤖',
      link: '#bot'
    },
    {
      id: 'forum',
      title: 'Netflix Forum',
      description: 'Connect with fellow viewers, discuss your favorite shows, share theories, and join vibrant community discussions.',
      icon: Users,
      color: 'from-red-600 to-purple-600',
      image: '💬',
      link: '#forum'
    },
    {
      id: 'friends',
      title: 'Netflix Friends',
      description: 'Watch together, share recommendations, see what your friends are watching, and create shared watchlists effortlessly.',
      icon: Users,
      color: 'from-red-600 to-blue-600',
      image: '👥',
      link: '#friends'
    },
    {
      id: 'saving',
      title: 'Netflix Saving Mode',
      description: 'Smart bandwidth optimization for seamless streaming on limited connections. Save data without compromising quality.',
      icon: Save,
      color: 'from-red-600 to-green-600',
      image: '📡',
      link: '#saving'
    },
    {
      id: 'dashboard',
      title: 'Netflix Dashboard',
      description: 'Comprehensive analytics of your viewing habits, personalized insights, and complete control over your Netflix experience.',
      icon: LayoutDashboard,
      color: 'from-red-600 to-cyan-600',
      image: '📊',
      link: '#dashboard'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(229, 9, 20, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(229, 9, 20, 0.2) 0%, transparent 50%)',
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
        </div>

        {/* Hero Content */}
        <div className={`relative z-10 text-center px-6 max-w-6xl mx-auto transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-600/30 rounded-full mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-400 font-medium">Future of Streaming</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-red-100 to-red-300 bg-clip-text text-transparent leading-tight">
            Netflix
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Driving Sustainable Growth through T.A.D.U.M.
From Passive Viewing to Active Connection
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-2xl shadow-red-600/30 flex items-center gap-2">
              Explore Features
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg font-semibold text-lg hover:bg-white/20 transition-all border border-white/20">
              Watch Demo
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Innovative Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Six revolutionary additions that will transform your Netflix experience
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className={`group relative transition-all duration-700 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredCard(feature.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <a href={feature.link} className="block">
                    {/* Card */}
                    <div className="relative h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-red-600/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-red-600/20 group-hover:-translate-y-2">
                      {/* Animated Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      
                      {/* Glowing Border Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} blur-xl opacity-30`} />
                      </div>

                      {/* Content */}
                      <div className="relative p-8 h-full flex flex-col">
                        {/* Icon/Image Section */}
                        <div className="mb-6">
                          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-4xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                            {feature.image}
                          </div>
                        </div>

                        {/* Text Content */}
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-3 flex items-center gap-2 group-hover:text-red-500 transition-colors">
                            {feature.title}
                            <ArrowRight className={`w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300`} />
                          </h3>
                          <p className="text-gray-400 leading-relaxed mb-4">
                            {feature.description}
                          </p>
                        </div>

                        {/* Bottom Icon */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-800 group-hover:border-red-600/30 transition-colors">
                          <span className="text-sm text-gray-500 group-hover:text-red-500 transition-colors font-medium">
                            Learn More
                          </span>
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${feature.color} opacity-20 group-hover:opacity-100 flex items-center justify-center transition-all duration-500 transform group-hover:rotate-12`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Shine Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-600/30 rounded-full mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-sm text-red-400 font-medium">Coming Soon</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
            The Future is Here
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Be among the first to experience these revolutionary features. Join our beta program and shape the future of Netflix.
          </p>

          <button className="group px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 rounded-full font-bold text-lg hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-2xl shadow-red-600/50 flex items-center gap-3 mx-auto">
            Join Beta Program
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p className="mb-2">© 2025 Netflix Reimagined. All rights reserved.</p>
          <p className="text-sm">Designed with ❤️ for the future of streaming</p>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NetflixFeaturesHome;