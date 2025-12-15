import { useState } from 'react';
import { Play, Star, Eye, Lock, Users, TrendingUp, CheckCircle, Settings, Heart, Clock, Award } from 'lucide-react';
import { useNavigate } from 'react-router';

const NetflixFriends = () => {

  const navigate = useNavigate();

  const [privacyMode, setPrivacyMode] = useState('friends'); // public, friends, private
  const [following, setFollowing] = useState<Record<number, boolean>>({});

  const friendsActivity = [
    {
      id: 1,
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      action: 'is watching',
      content: 'Dark',
      details: 'Season 2 • Episode 3',
      time: '2h ago',
      badge: 'Similar Taste 87%',
      badgeColor: 'from-green-600 to-emerald-600',
      contentImage: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop',
      action: 'rated',
      content: 'Dune: Part Two',
      details: '9/10',
      time: '5h ago',
      badge: 'Verified Reviewer',
      badgeColor: 'from-blue-600 to-blue-700',
      contentImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      action: 'shared a theory about',
      content: 'Interstellar',
      details: 'Time paradox explained',
      time: '1d ago',
      badge: 'Verified Reviewer',
      badgeColor: 'from-blue-600 to-blue-700',
      contentImage: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=400&fit=crop'
    },
    {
      id: 4,
      name: 'Sophie Lin',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      action: 'added to watchlist',
      content: 'The Crown',
      details: 'Season 6',
      time: '1d ago',
      badge: 'Similar Taste 92%',
      badgeColor: 'from-green-600 to-emerald-600',
      contentImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop'
    },
    {
      id: 5,
      name: 'Marcus Johnson',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop',
      action: 'finished watching',
      content: 'Breaking Bad',
      details: 'All 5 seasons',
      time: '2d ago',
      badge: 'Similar Taste 79%',
      badgeColor: 'from-green-600 to-emerald-600',
      contentImage: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=600&h=400&fit=crop'
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Oppenheimer',
      image: 'https://images.unsplash.com/photo-1691316749874-e89297ee4cf3?q=80&w=714&auto=format&fit=crop',
      friends: 5,
      rating: 9.2,
      genre: 'Biography, Drama',
      year: 2023
    },
    {
      id: 2,
      title: 'The Last of Us',
      image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop',
      friends: 8,
      rating: 9.5,
      genre: 'Drama, Sci-Fi',
      year: 2023
    },
    {
      id: 3,
      title: 'Succession',
      image: 'https://images.unsplash.com/photo-1551029506-0807df4e2031?w=400&h=600&fit=crop',
      friends: 3,
      rating: 8.9,
      genre: 'Drama',
      year: 2023
    },
    {
      id: 4,
      title: 'The Bear',
      image: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=1170&auto=format&fit=crop',
      friends: 4,
      rating: 9.1,
      genre: 'Drama, Comedy',
      year: 2022
    },
    {
      id: 5,
      title: 'Stranger Things',
      image: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&h=600&fit=crop',
      friends: 12,
      rating: 8.7,
      genre: 'Sci-Fi, Horror',
      year: 2022
    }
  ];

  const suggestedUsers = [
    {
      id: 1,
      name: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w-400&h=400&fit=crop&crop=face',
      similarity: 94,
      genres: ['Sci-Fi', 'Thriller', 'Drama'],
      mutualFriends: 3,
      lastActive: 'Active now'
    },
    {
      id: 2,
      name: 'David Park',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w-400&h=400&fit=crop&crop=face',
      similarity: 89,
      genres: ['Action', 'Crime', 'Drama'],
      mutualFriends: 5,
      lastActive: '2h ago'
    },
    {
      id: 3,
      name: 'Lisa Anderson',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w-400&h=400&fit=crop&crop=face',
      similarity: 85,
      genres: ['Romance', 'Comedy', 'Drama'],
      mutualFriends: 2,
      lastActive: '5h ago'
    },
    {
      id: 4,
      name: 'Ryan Martinez',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w-400&h=400&fit=crop&crop=face',
      similarity: 82,
      genres: ['Horror', 'Thriller', 'Mystery'],
      mutualFriends: 4,
      lastActive: '1d ago'
    }
  ];

  const handleFollow = (userId: number) => {
    setFollowing(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const privacyOptions = [
    { value: 'public', icon: Users, label: 'Public', desc: 'Everyone can see' },
    { value: 'friends', icon: Heart, label: 'Friends', desc: 'Only friends' },
    { value: 'private', icon: Lock, label: 'Private', desc: 'Just you' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate("/")}>
            <div className="text-red-600 font-bold text-3xl">NETFLIX</div>
            <div className="h-6 w-px bg-gray-700" />
            <div className="flex items-center gap-2 text-xl font-semibold">
              <Users className="w-6 h-6 text-red-600" />
              Friends
            </div>
          </div>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-gray-900 via-black to-red-950 border border-gray-800">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=400&fit=crop" 
              alt="Background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-red-100 to-red-300 bg-clip-text text-transparent">
              Friends Activity
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover what people with similar taste are watching
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex -space-x-3">
                {friendsActivity.slice(0, 4).map((friend) => (
                  <div key={friend.id} className="w-12 h-12 rounded-full border-2 border-gray-900 overflow-hidden">
                    <img 
                      src={friend.avatar} 
                      alt={friend.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="text-gray-400">+{friendsActivity.length} friends online</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Activity Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Clock className="w-6 h-6 text-red-600" />
                Recent Activity
              </h2>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">
                View all activity →
              </button>
            </div>

            {/* Activity Cards */}
            <div className="space-y-4">
              {friendsActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800 hover:border-red-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/10 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-red-600/20 group-hover:ring-red-600/50 transition-all">
                        <img 
                          src={activity.avatar} 
                          alt={activity.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-white group-hover:text-red-500 transition-colors">
                            {activity.name}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {activity.action}{' '}
                            <span className="text-white font-medium">{activity.content}</span>
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                      </div>

                      <p className="text-gray-500 text-sm mb-3">{activity.details}</p>

                      {/* Content Preview */}
                      <div className="mb-3 rounded-lg overflow-hidden border border-gray-800 max-w-xs">
                        <img 
                          src={activity.contentImage} 
                          alt={activity.content}
                          className="w-full h-32 object-cover"
                        />
                      </div>

                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full border border-gray-700">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${activity.badgeColor}`} />
                        <span className="text-xs font-medium text-gray-300">{activity.badge}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Privacy Control */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-lg">Privacy Control</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                You control what your friends can see
              </p>
              <div className="space-y-2">
                {privacyOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setPrivacyMode(option.value)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                        privacyMode === option.value
                          ? 'bg-gradient-to-r from-red-600 to-red-700 border-red-500'
                          : 'bg-gray-800/50 border-gray-700 hover:bg-gray-800'
                      } border`}
                    >
                      <Icon className="w-5 h-5" />
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm">{option.label}</div>
                        <div className="text-xs text-gray-400">{option.desc}</div>
                      </div>
                      {privacyMode === option.value && (
                        <CheckCircle className="w-5 h-5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Suggested Users */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-lg">People You May Like</h3>
              </div>
              <div className="space-y-3">
                {suggestedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-all border border-transparent hover:border-red-600/30"
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-red-600/20">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {user.lastActive === 'Active now' && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-1 ring-gray-900"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div className="font-medium text-sm">{user.name}</div>
                        <span className="text-xs text-gray-500">{user.lastActive}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-green-600 to-emerald-600 h-1.5 rounded-full"
                            style={{ width: `${user.similarity}%` }}
                          />
                        </div>
                        <span className="text-xs text-green-500 font-medium whitespace-nowrap">
                          {user.similarity}%
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {user.genres.map((genre) => (
                          <span
                            key={genre}
                            className="text-xs px-2 py-0.5 bg-gray-700 rounded-full text-gray-300"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-gray-400 mb-2">
                        {user.mutualFriends} mutual friends
                      </div>
                      <button
                        onClick={() => handleFollow(user.id)}
                        className={`w-full px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          following[user.id]
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                        }`}
                      >
                        {following[user.id] ? 'Following' : 'Follow'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-red-900/20 to-red-950/30 rounded-2xl p-6 border border-red-900/30">
              <h3 className="font-bold text-lg mb-4">Your Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-900/50 rounded-xl">
                  <div className="text-2xl font-bold text-red-500">24</div>
                  <div className="text-sm text-gray-400">Friends</div>
                </div>
                <div className="text-center p-4 bg-gray-900/50 rounded-xl">
                  <div className="text-2xl font-bold text-green-500">87%</div>
                  <div className="text-sm text-gray-400">Match Rate</div>
                </div>
                <div className="text-center p-4 bg-gray-900/50 rounded-xl">
                  <div className="text-2xl font-bold text-yellow-500">156</div>
                  <div className="text-sm text-gray-400">Shows Watched</div>
                </div>
                <div className="text-center p-4 bg-gray-900/50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-500">42</div>
                  <div className="text-sm text-gray-400">Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended by Friends Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Award className="w-7 h-7 text-red-600" />
              <h2 className="text-3xl font-bold">Recommended by Friends</h2>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors text-sm">
              See all recommendations →
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {recommendations.map((movie) => (
              <div
                key={movie.id}
                className="group relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800 hover:border-red-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-600/20 hover:-translate-y-2"
              >
                {/* Movie Poster */}
                <div className="aspect-[2/3] relative overflow-hidden">
                  <img 
                    src={movie.image} 
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform shadow-2xl">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                  {/* Year Badge */}
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-xs font-medium">
                    {movie.year}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold mb-2 line-clamp-1 group-hover:text-red-500 transition-colors">
                    {movie.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2 line-clamp-1">{movie.genre}</p>
                  
                  {/* Friends Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-red-600/20 border border-red-600/30 rounded-full">
                      <Users className="w-3 h-3 text-red-500" />
                      <span className="text-xs font-medium text-red-500">{movie.friends} friends</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-bold text-yellow-500">{movie.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Verified Badge */}
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ring-2 ring-blue-600/30">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>

                {/* Netflix Logo Overlay */}
                <div className="absolute bottom-2 right-2 text-xs font-bold text-red-600 bg-black/80 px-2 py-1 rounded">
                  N
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Now Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6">Trending in Your Circle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1637947582297-24ccbef1bd19?q=80&w=1881&auto=format&fit=crop" 
                alt="Trending Show"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="px-2 py-1 bg-red-600 rounded text-xs font-bold">TRENDING</div>
                  <div className="text-sm text-gray-300">#1 in your network</div>
                </div>
                <h3 className="text-2xl font-bold">Sci-Fi Marathon</h3>
                <p className="text-gray-300">12 friends are watching this genre now</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1170&auto=format&fit=crop" 
                alt="Popular Movie"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="px-2 py-1 bg-yellow-600 rounded text-xs font-bold">HOT</div>
                  <div className="text-sm text-gray-300">8 reviews this week</div>
                </div>
                <h3 className="text-2xl font-bold">Critics' Choice</h3>
                <p className="text-gray-300">Top rated movies among friends</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetflixFriends;