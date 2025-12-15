import { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, Tv, Heart, Users, Leaf, Zap, Award, ChevronUp, ChevronDown, Target, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';

const NetflixDashboard = () => {

  const navigate = useNavigate();
  
  const [timeRange, setTimeRange] = useState('month');

  // Watch time data
  const weeklyData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 3.2 },
    { day: 'Thu', hours: 2.1 },
    { day: 'Fri', hours: 4.5 },
    { day: 'Sat', hours: 5.2 },
    { day: 'Sun', hours: 4.8 }
  ];

  const monthlyData = [
    { week: 'Week 1', hours: 18 },
    { week: 'Week 2', hours: 22 },
    { week: 'Week 3', hours: 28 },
    { week: 'Week 4', hours: 24 }
  ];

  // Genre data
  const genreData = [
    { name: 'Sci-Fi', value: 35, color: '#3B82F6' },
    { name: 'Drama', value: 28, color: '#8B5CF6' },
    { name: 'Comedy', value: 18, color: '#F59E0B' },
    { name: 'Thriller', value: 12, color: '#E50914' },
    { name: 'Documentary', value: 7, color: '#10B981' }
  ];

  // Mood trend data
//   const moodData = [
//     { day: 'Mon', mood: 'Relaxed' },
//     { day: 'Tue', mood: 'Relaxed' },
//     { day: 'Wed', mood: 'Intense' },
//     { day: 'Thu', mood: 'Emotional' },
//     { day: 'Fri', mood: 'Intense' },
//     { day: 'Sat', mood: 'Relaxed' },
//     { day: 'Sun', mood: 'Emotional' }
//   ];

  const moodCounts = {
    'Relaxed': 3,
    'Intense': 2,
    'Emotional': 2
  };

  const stats = [
    {
      label: 'Total Hours',
      value: '28',
      unit: 'hrs',
      change: '+12%',
      isPositive: true,
      icon: Clock,
      color: 'from-blue-600 to-cyan-600'
    },
    {
      label: 'Avg Session',
      value: '1.8',
      unit: 'hrs',
      change: '-5%',
      isPositive: false,
      icon: Tv,
      color: 'from-purple-600 to-pink-600'
    },
    {
      label: 'New Genres',
      value: '6',
      unit: 'genres',
      change: '+2',
      isPositive: true,
      icon: Sparkles,
      color: 'from-orange-600 to-red-600'
    },
    {
      label: 'Energy Saved',
      value: '3',
      unit: 'days',
      change: '+18%',
      isPositive: true,
      icon: Leaf,
      color: 'from-green-600 to-emerald-600'
    }
  ];

  const socialInsights = [
    {
      metric: 'From Friends',
      value: '42%',
      description: 'Content discovered via friends',
      icon: Users,
      color: 'from-blue-600 to-cyan-600'
    },
    {
      metric: 'Top Influencer',
      value: 'Sarah Chen',
      description: 'Most influential friend this month',
      icon: Award,
      color: 'from-purple-600 to-pink-600'
    },
    {
      metric: 'Your Review',
      value: '124 likes',
      description: 'Most liked: "Dune was masterful"',
      icon: Heart,
      color: 'from-red-600 to-pink-600'
    }
  ];

  const savingStats = [
    {
      label: 'Auto-Paused',
      value: '12.5',
      unit: 'hours',
      comparison: '+3.2 hrs vs last month',
      icon: Clock,
      trend: 'up'
    },
    {
      label: 'Energy Saved',
      value: '3.2',
      unit: 'kWh',
      comparison: '+18% improvement',
      icon: Zap,
      trend: 'up'
    },
    {
      label: 'Carbon Impact',
      value: '1.4',
      unit: 'kg CO₂',
      comparison: 'Equal to 180 phone charges',
      icon: Leaf,
      trend: 'up'
    }
  ];

  const CustomTooltip = ({ active, payload }: { active: boolean; payload: Array<{ value: number }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border border-red-600/30 rounded-lg p-3 shadow-xl">
          <p className="text-white font-semibold">{payload[0].value} hours</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate("/")}>
            <div className="text-red-600 font-bold text-3xl">NETFLIX</div>
            <div className="h-6 w-px bg-gray-700" />
            <div className="flex items-center gap-2 text-xl font-semibold">
              <TrendingUp className="w-6 h-6 text-red-600" />
              Dashboard
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 rounded-lg transition-all ${
                timeRange === 'week'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 rounded-lg transition-all ${
                timeRange === 'month'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Month
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-red-100 to-red-300 bg-clip-text text-transparent">
              Your Netflix Insights
            </h1>
          </div>
          
          {/* AI Summary */}
          <div className="bg-gradient-to-br from-red-950/30 via-gray-900 to-black rounded-2xl p-8 border border-red-800/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl" />
            <div className="relative flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-red-500">AI-Generated Summary</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  This month, you watched <span className="text-white font-semibold">28 hours</span>, 
                  discovered <span className="text-white font-semibold">6 new genres</span>, and 
                  saved energy equivalent to powering a TV for <span className="text-white font-semibold">3 days</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800 hover:border-red-600/30 transition-all hover:shadow-lg hover:shadow-red-600/10"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-white">{stat.value}</span>
                  <span className="text-gray-500">{stat.unit}</span>
                </div>
                <div className={`flex items-center gap-1 text-sm ${stat.isPositive ? 'text-green-500' : 'text-gray-500'}`}>
                  {stat.isPositive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Watch Time Chart */}
          <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Clock className="w-6 h-6 text-red-600" />
                Watch Time Overview
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeRange === 'week' ? weeklyData : monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey={timeRange === 'week' ? 'day' : 'week'} stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip active={false} payload={[]} />} />
                <Bar dataKey="hours" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E50914" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#E50914" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Genre Distribution */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800 text-white">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-red-600" />
              Top Genres
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genreData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {genreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #E50914',
                    borderRadius: '8px',
                    color: "white"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {genreData.map((genre) => (
                <div key={genre.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: genre.color }} />
                    <span className="text-sm text-gray-300">{genre.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">{genre.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mood & Genre Insights */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-600" />
            Viewing Mood Trends
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(moodCounts).map(([mood, count]) => {
              const colors: Record<string, string> = {
                'Relaxed': 'from-blue-600 to-cyan-600',
                'Intense': 'from-orange-600 to-red-600',
                'Emotional': 'from-purple-600 to-pink-600'
              };
              return (
                <div
                  key={mood}
                  className={`bg-gradient-to-br ${colors[mood]} bg-opacity-10 rounded-xl p-6 border border-gray-700`}
                >
                  <div className="text-4xl mb-2">
                    {mood === 'Relaxed' ? '😌' : mood === 'Intense' ? '🔥' : '💙'}
                  </div>
                  <h4 className="text-xl font-bold mb-1">{mood}</h4>
                  <p className="text-3xl font-bold text-white">{count} days</p>
                  <p className="text-sm text-gray-400 mt-1">This week</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Social Impact Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-red-600" />
            Social Impact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialInsights.map((insight) => {
              const Icon = insight.icon;
              return (
                <div
                  key={insight.metric}
                  className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800 hover:border-red-600/30 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${insight.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm text-gray-400 mb-2">{insight.metric}</div>
                  <div className="text-2xl font-bold text-white mb-2">{insight.value}</div>
                  <p className="text-sm text-gray-500">{insight.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sustainability Stats */}
        <div className="bg-gradient-to-br from-green-950/30 to-black rounded-2xl p-8 border border-green-800/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Sustainability & Saving Stats</h3>
              <p className="text-gray-400 text-sm">Powered by Netflix Saving Mode</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savingStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8 text-green-500" />
                    <div className="flex items-center gap-1 text-green-500 text-sm">
                      <ChevronUp className="w-4 h-4" />
                      <span>Improved</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-white">{stat.value}</span>
                    <span className="text-gray-400 ml-2">{stat.unit}</span>
                  </div>
                  <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
                  <div className="text-xs text-green-500">{stat.comparison}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetflixDashboard;