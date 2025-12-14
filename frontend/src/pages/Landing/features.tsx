import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Users, 
  Save, 
  LayoutDashboard, 
  ArrowRight, 
  ChevronDown,
  Target,
  Bot,
  MessageCircle,
  UserCog,
  Wifi,
  BarChart3,
  Play,
  Zap,
  Globe,
  Shield,
  Star,
  Heart,
  Clock,
  Award,
  Video,
  Film,
  Tv,
  Search,
  Bell,
  Home,
  Compass,
  Download,
  HelpCircle,
  Crown,
  Rocket
} from 'lucide-react';

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
      icon: Target,
      color: 'from-red-600 to-pink-600',
      featureIcon: Target,
      link: '/fyp'
    },
    {
      id: 'bot',
      title: 'Netflix Bot',
      description: 'AI-powered chat assistant that helps you find content, answers questions, and enhances your viewing experience in real-time.',
      icon: Bot,
      color: 'from-red-600 to-orange-600',
      featureIcon: Bot,
      link: '/watch'
    },
    {
      id: 'forum',
      title: 'Netflix Forum',
      description: 'Connect with fellow viewers, discuss your favorite shows, share theories, and join vibrant community discussions.',
      icon: MessageCircle,
      color: 'from-red-600 to-purple-600',
      featureIcon: Users,
      link: '/forum'
    },
    {
      id: 'friends',
      title: 'Netflix Friends',
      description: 'Watch together, share recommendations, see what your friends are watching, and create shared watchlists effortlessly.',
      icon: UserCog,
      color: 'from-red-600 to-blue-600',
      featureIcon: Users,
      link: '/friends'
    },
    {
      id: 'saving',
      title: 'Netflix Saving Mode',
      description: 'Smart bandwidth optimization for seamless streaming on limited connections. Save data without compromising quality.',
      icon: Wifi,
      color: 'from-red-600 to-green-600',
      featureIcon: Save,
      link: '/saving'
    },
    {
      id: 'dashboard',
      title: 'Netflix Dashboard',
      description: 'Comprehensive analytics of your viewing habits, personalized insights, and complete control over your Netflix experience.',
      icon: BarChart3,
      color: 'from-red-600 to-cyan-600',
      featureIcon: LayoutDashboard,
      link: '/dashboard'
    }
  ];

  const stats = [
    { icon: Users, value: '10M+', label: 'Active Users' },
    { icon: Film, value: '100K+', label: 'Movies & Shows' },
    { icon: Globe, value: '190+', label: 'Countries' },
    { icon: Award, value: '300+', label: 'Awards' }
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
          
          {/* Floating Icons Background */}
          <div className="absolute inset-0 opacity-10">
            <Film className="absolute top-1/4 left-1/4 w-24 h-24 animate-float" style={{ animationDelay: '0s' }} />
            <Tv className="absolute top-1/3 right-1/4 w-24 h-24 animate-float" style={{ animationDelay: '1s' }} />
            <Video className="absolute bottom-1/4 left-1/3 w-24 h-24 animate-float" style={{ animationDelay: '2s' }} />
            <Play className="absolute bottom-1/3 right-1/3 w-24 h-24 animate-float" style={{ animationDelay: '3s' }} />
          </div>
        </div>

        {/* Hero Content */}
        <div className={`relative z-10 text-center px-6 max-w-6xl mx-auto transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-600/30 rounded-full mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-400 font-medium">Future of Streaming</span>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <Film className="w-16 h-16 text-red-600" />
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-red-100 to-red-300 bg-clip-text text-transparent leading-tight">
              Netflix
            </h1>
            <Tv className="w-16 h-16 text-red-600" />
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Driving Sustainable Growth through T.A.D.U.M.
            From Passive Viewing to Active Connection
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-2xl shadow-red-600/30 flex items-center gap-2">
              Explore Features
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg font-semibold text-lg hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <div 
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800 transform transition-all duration-300 hover:scale-105 hover:border-red-600/30"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center">
                      <StatIcon className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  </div>
                </div>
              );
            })}
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
              const FeatureIcon = feature.featureIcon;
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
                          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                            <Icon className="w-10 h-10 text-white" />
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
                            <FeatureIcon className="w-5 h-5 text-white" />
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

          {/* Additional Features Preview */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-red-600/30 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors">
                <Search className="w-6 h-6 text-blue-500" />
              </div>
              <h4 className="font-semibold mb-2">Smart Search</h4>
              <p className="text-sm text-gray-400">AI-powered content discovery</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-red-600/30 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center mb-4 group-hover:bg-purple-600/30 transition-colors">
                <Bell className="w-6 h-6 text-purple-500" />
              </div>
              <h4 className="font-semibold mb-2">Smart Alerts</h4>
              <p className="text-sm text-gray-400">Personalized notifications</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-red-600/30 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-green-600/20 flex items-center justify-center mb-4 group-hover:bg-green-600/30 transition-colors">
                <Download className="w-6 h-6 text-green-500" />
              </div>
              <h4 className="font-semibold mb-2">Offline Sync</h4>
              <p className="text-sm text-gray-400">Smart download management</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-red-600/30 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-yellow-600/20 flex items-center justify-center mb-4 group-hover:bg-yellow-600/30 transition-colors">
                <Shield className="w-6 h-6 text-yellow-500" />
              </div>
              <h4 className="font-semibold mb-2">Parental Control+</h4>
              <p className="text-sm text-gray-400">Enhanced family safety</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative py-20 px-6 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent">
              Why Choose Netflix TA-D(Ú)M?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience streaming like never before with our cutting-edge features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-red-600/50 transition-all group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-pink-600 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
              <p className="text-gray-400">Reduced buffering and instant content loading with our optimized streaming technology.</p>
            </div>

            <div className="text-center p-8 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-red-600/50 transition-all group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-blue-600 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Personalized</h3>
              <p className="text-gray-400">Content recommendations that truly understand your preferences and viewing habits.</p>
            </div>

            <div className="text-center p-8 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-red-600/50 transition-all group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-green-600 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Social Experience</h3>
              <p className="text-gray-400">Connect with friends and share your streaming journey like never before.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black" />
        
        {/* Floating Icons */}
        <div className="absolute inset-0 opacity-10">
          <Crown className="absolute top-20 left-10 w-16 h-16 animate-float" style={{ animationDelay: '0s' }} />
          <Star className="absolute top-40 right-20 w-16 h-16 animate-float" style={{ animationDelay: '1s' }} />
          <Rocket className="absolute bottom-40 left-20 w-16 h-16 animate-float" style={{ animationDelay: '2s' }} />
          <HelpCircle className="absolute bottom-20 right-10 w-16 h-16 animate-float" style={{ animationDelay: '3s' }} />
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-600/30 rounded-full mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-sm text-red-400 font-medium">Coming Soon</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
            The Future is Here
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Be among the first to experience these revolutionary features. Join our beta program and shape the future of Netflix.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 rounded-full font-bold text-lg hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-2xl shadow-red-600/50 flex items-center gap-3">
              Join Beta Program
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="px-10 py-5 bg-white/10 backdrop-blur-sm rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/20 flex items-center gap-3">
              <HelpCircle className="w-6 h-6" />
              Learn More
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span className="text-sm">Global Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Film className="w-8 h-8 text-red-600" />
              <span className="text-2xl font-bold text-white">NETFLIX</span>
              <span className="text-gray-500 text-sm">TA-D(Ú)M</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Home</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Beta</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Support</a>
            </div>
            
            <div className="flex items-center gap-4">
              <Compass className="w-5 h-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
              <Home className="w-5 h-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
              <Tv className="w-5 h-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
              <Video className="w-5 h-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>
          
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p className="mb-2">© 2025 Netflix TA-D(Ú)M. All rights reserved.</p>
            <p>Designed with <Heart className="w-3 h-3 inline text-red-500" /> for the future of streaming</p>
          </div>
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