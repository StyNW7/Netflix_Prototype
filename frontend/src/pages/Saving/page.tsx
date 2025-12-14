import { useState } from 'react';
import { Battery, BatteryCharging, Leaf, Moon, Power, Zap, Clock, TrendingDown, Info, Check, Settings, Globe } from 'lucide-react';

const NetflixSavingMode = () => {
  const [savingModeEnabled, setSavingModeEnabled] = useState(true);
  const [currentMode, setCurrentMode] = useState('balanced');
  const [autoPauseTime, setAutoPauseTime] = useState(15);
  const [nightMode, setNightMode] = useState(true);
  const [batteryAware, setBatteryAware] = useState(true);

  const modes = [
    {
      id: 'light',
      name: 'Light',
      description: 'Minimal intervention, gentle reminders',
      color: 'from-blue-600 to-cyan-600',
      icon: Zap
    },
    {
      id: 'balanced',
      name: 'Balanced',
      description: 'Smart automation with flexibility',
      color: 'from-green-600 to-emerald-600',
      icon: Battery
    },
    {
      id: 'aggressive',
      name: 'Aggressive',
      description: 'Maximum energy savings',
      color: 'from-orange-600 to-red-600',
      icon: TrendingDown
    }
  ];

  const impactStats = [
    {
      label: 'Hours Auto-Paused',
      value: '12.5',
      unit: 'hrs',
      subtitle: 'This week',
      icon: Clock,
      color: 'from-blue-600 to-cyan-600'
    },
    {
      label: 'Energy Saved',
      value: '3.2',
      unit: 'kWh',
      subtitle: 'This month',
      icon: Zap,
      color: 'from-green-600 to-emerald-600'
    },
    {
      label: 'Carbon Reduced',
      value: '1.4',
      unit: 'kg CO₂',
      subtitle: 'Equivalent impact',
      icon: Leaf,
      color: 'from-emerald-600 to-green-700'
    }
  ];

  const carbonComparisons = [
    { label: 'Phone charges', value: '~180', icon: BatteryCharging },
    { label: 'LED bulb hours', value: '~320', icon: Power },
    { label: 'Trees planted', value: '~0.07', icon: Leaf }
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
              <Leaf className="w-6 h-6 text-green-500" />
              Saving Mode
            </div>
          </div>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          {/* Animated Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-96 h-96 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full blur-3xl animate-pulse" />
          </div>
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-600/30 rounded-full mb-6 backdrop-blur-sm">
              <Leaf className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-400 font-medium">Sustainability Focused</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-green-100 to-emerald-300 bg-clip-text text-transparent">
              Netflix Saving Mode
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Smart watching. Less energy. Better habits.
            </p>

            {/* Energy Icon */}
            <div className="mt-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 shadow-lg shadow-green-600/30">
              <Leaf className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Main Status Card */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-gray-800 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Status Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-4 h-4 rounded-full ${savingModeEnabled ? 'bg-green-500' : 'bg-gray-600'} animate-pulse`} />
                  <h2 className="text-3xl font-bold">
                    Saving Mode: {savingModeEnabled ? 'ON' : 'OFF'}
                  </h2>
                </div>
                <p className="text-lg text-gray-400 mb-2">
                  Current Mode: <span className="text-green-500 font-semibold capitalize">{currentMode}</span>
                </p>
                <p className="text-gray-500">
                  Automatically pauses or sleeps when no interaction is detected
                </p>
              </div>

              {/* Toggle Switch */}
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={() => setSavingModeEnabled(!savingModeEnabled)}
                  className={`relative w-20 h-10 rounded-full transition-all duration-300 ${
                    savingModeEnabled ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-8 h-8 rounded-full bg-white shadow-lg transition-transform duration-300 ${
                      savingModeEnabled ? 'translate-x-11' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-500">
                  {savingModeEnabled ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Settings className="w-6 h-6 text-green-500" />
            Choose Your Mode
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {modes.map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => setCurrentMode(mode.id)}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    currentMode === mode.id
                      ? 'border-green-500 bg-gradient-to-br from-green-950/50 to-black shadow-lg shadow-green-600/20'
                      : 'border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:border-gray-700'
                  }`}
                >
                  {/* Selected Indicator */}
                  {currentMode === mode.id && (
                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h4 className="text-xl font-bold mb-2">{mode.name}</h4>
                  <p className="text-sm text-gray-400">{mode.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Smart Controls */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Power className="w-6 h-6 text-green-500" />
            Smart Controls
          </h3>
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
            <div className="space-y-8">
              {/* Auto-pause Slider */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-green-500" />
                    <span className="font-semibold">Auto-pause after inactivity</span>
                  </div>
                  <span className="text-green-500 font-bold">{autoPauseTime} min</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={autoPauseTime}
                  onChange={(e) => setAutoPauseTime(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #10B981 0%, #10B981 ${((autoPauseTime - 5) / 55) * 100}%, #374151 ${((autoPauseTime - 5) / 55) * 100}%, #374151 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>5 min</span>
                  <span>60 min</span>
                </div>
              </div>

              {/* Night Mode Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-green-600/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                    <Moon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Night Mode</div>
                    <div className="text-sm text-gray-400">Stronger saving rules after midnight</div>
                  </div>
                </div>
                <button
                  onClick={() => setNightMode(!nightMode)}
                  className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
                    nightMode ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg transition-transform duration-300 ${
                      nightMode ? 'translate-x-9' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Battery-Aware Mode Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-green-600/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-600 to-orange-600 flex items-center justify-center">
                    <Battery className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Battery-Aware Mode</div>
                    <div className="text-sm text-gray-400">Optimizes for mobile devices</div>
                  </div>
                </div>
                <button
                  onClick={() => setBatteryAware(!batteryAware)}
                  className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
                    batteryAware ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg transition-transform duration-300 ${
                      batteryAware ? 'translate-x-9' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Energy & Impact Summary */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingDown className="w-6 h-6 text-green-500" />
            Your Impact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impactStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800 hover:border-green-600/30 transition-all hover:shadow-lg hover:shadow-green-600/10"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-green-500">{stat.value}</span>
                    <span className="text-lg text-gray-500">{stat.unit}</span>
                  </div>
                  <div className="text-xs text-gray-500">{stat.subtitle}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carbon Comparison */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-green-950/30 to-black rounded-2xl p-8 border border-green-800/30">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">What does 1.4 kg CO₂ mean?</h3>
                <p className="text-gray-400">Your energy savings this month equals:</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {carbonComparisons.map((comparison) => {
                const Icon = comparison.icon;
                return (
                  <div
                    key={comparison.label}
                    className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700"
                  >
                    <Icon className="w-8 h-8 text-green-500" />
                    <div>
                      <div className="font-bold text-green-500">{comparison.value}</div>
                      <div className="text-sm text-gray-400">{comparison.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Explanation Box */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">How It Works</h3>
              <div className="space-y-3 text-gray-400">
                <p>
                  <span className="text-green-500 font-semibold">Fell asleep while watching?</span> Netflix Saving Mode pauses automatically to save energy and protect your device.
                </p>
                <p>
                  Our smart system detects when you're not actively watching and gently pauses playback. It's seamless, non-intrusive, and helps reduce unnecessary energy consumption.
                </p>
                <p className="text-sm">
                  You're always in control. Adjust sensitivity, timing, and preferences to match your viewing habits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10B981;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10B981;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </div>
  );
};

export default NetflixSavingMode;