import { useState } from 'react';
import { Play, Star, Eye, Lock, Users, TrendingUp, CheckCircle, Settings, Heart, Clock, Award } from 'lucide-react';

const NetflixFriends = () => {
  const [privacyMode, setPrivacyMode] = useState('friends'); // public, friends, private
  const [following, setFollowing] = useState<Record<number, boolean>>({});

  const friendsActivity = [
    {
      id: 1,
      name: 'Alex Chen',
      avatar: '👨‍💼',
      action: 'is watching',
      content: 'Dark',
      details: 'Season 2 • Episode 3',
      time: '2h ago',
      badge: 'Similar Taste 87%',
      badgeColor: 'from-green-600 to-emerald-600'
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      avatar: '👩‍🎨',
      action: 'rated',
      content: 'Dune: Part Two',
      details: '9/10',
      time: '5h ago',
      badge: 'Verified Reviewer',
      badgeColor: 'from-blue-600 to-blue-700'
    },
    {
      id: 3,
      name: 'James Wilson',
      avatar: '👨‍🔬',
      action: 'shared a theory about',
      content: 'Interstellar',
      details: 'Time paradox explained',
      time: '1d ago',
      badge: 'Verified Reviewer',
      badgeColor: 'from-blue-600 to-blue-700'
    },
    {
      id: 4,
      name: 'Sophie Lin',
      avatar: '👩‍💻',
      action: 'added to watchlist',
      content: 'The Crown',
      details: 'Season 6',
      time: '1d ago',
      badge: 'Similar Taste 92%',
      badgeColor: 'from-green-600 to-emerald-600'
    },
    {
      id: 5,
      name: 'Marcus Johnson',
      avatar: '👨‍🎓',
      action: 'finished watching',
      content: 'Breaking Bad',
      details: 'All 5 seasons',
      time: '2d ago',
      badge: 'Similar Taste 79%',
      badgeColor: 'from-green-600 to-emerald-600'
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Oppenheimer',
      image: '🎬',
      friends: 5,
      rating: 9.2,
      genre: 'Biography, Drama'
    },
    {
      id: 2,
      title: 'The Last of Us',
      image: '🎮',
      friends: 8,
      rating: 9.5,
      genre: 'Drama, Sci-Fi'
    },
    {
      id: 3,
      title: 'Succession',
      image: '💼',
      friends: 3,
      rating: 8.9,
      genre: 'Drama'
    },
    {
      id: 4,
      title: 'The Bear',
      image: '🍳',
      friends: 4,
      rating: 9.1,
      genre: 'Drama, Comedy'
    },
    {
      id: 5,
      title: 'Stranger Things',
      image: '👾',
      friends: 12,
      rating: 8.7,
      genre: 'Sci-Fi, Horror'
    }
  ];

  const suggestedUsers = [
    {
      id: 1,
      name: 'Emma Thompson',
      avatar: '👩‍🦰',
      similarity: 94,
      genres: ['Sci-Fi', 'Thriller', 'Drama'],
      mutualFriends: 3
    },
    {
      id: 2,
      name: 'David Park',
      avatar: '👨‍🦱',
      similarity: 89,
      genres: ['Action', 'Crime', 'Drama'],
      mutualFriends: 5
    },
    {
      id: 3,
      name: 'Lisa Anderson',
      avatar: '👩‍🦳',
      similarity: 85,
      genres: ['Romance', 'Comedy', 'Drama'],
      mutualFriends: 2
    },
    {
      id: 4,
      name: 'Ryan Martinez',
      avatar: '👨‍🦲',
      similarity: 82,
      genres: ['Horror', 'Thriller', 'Mystery'],
      mutualFriends: 4
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
          <div className="flex items-center gap-4">
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
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-red-100 to-red-300 bg-clip-text text-transparent">
            Friends Activity
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover what people with similar taste are watching
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Activity Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Clock className="w-6 h-6 text-red-600" />
                Recent Activity
              </h2>
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
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-2xl ring-2 ring-red-600/20 group-hover:ring-red-600/50 transition-all">
                        {activity.avatar}
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
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-xl flex-shrink-0">
                      {user.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm mb-1">{user.name}</div>
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
          </div>
        </div>

        {/* Recommended by Friends Section */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-7 h-7 text-red-600" />
            <h2 className="text-3xl font-bold">Recommended by Friends</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {recommendations.map((movie) => (
              <div
                key={movie.id}
                className="group relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800 hover:border-red-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-600/20 hover:-translate-y-2"
              >
                {/* Movie Poster */}
                <div className="aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-6xl relative overflow-hidden">
                  {movie.image}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetflixFriends;