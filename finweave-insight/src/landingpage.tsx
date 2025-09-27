import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

interface VideoState {
  video1Loaded: boolean;
  video2Loaded: boolean;
  isLoading: boolean;
}

const Landing: React.FC = () => {
  const [videoState, setVideoState] = useState<VideoState>({
    video1Loaded: false,
    video2Loaded: false,
    isLoading: true
  });

  useEffect(() => {
    // Simulate video loading
    const timer = setTimeout(() => {
      setVideoState({
        video1Loaded: true,
        video2Loaded: true,
        isLoading: false
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const videoSources = {
    video1: "E:\\MIT\\finweave-insight\\videos\\0_Mobile_App_Financial_App_3840x2160.mp4",
    video2: "E:\\MIT\\finweave-insight\\videos\\18743334-hd_1920_1080_60fps.mp4"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-lg font-bold">F</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            FinPay
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium">
            Home
          </a>
          <a href="#features" className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium">
            Features
          </a>
          <a href="#products" className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium">
            Products
          </a>
          <a href="#resources" className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium">
            Resources
          </a>
          <a href="#community" className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium">
            Community
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/login">
            <button className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-purple-50">
              Sign in
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Sign up
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-12 lg:py-20">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl mb-12 lg:mb-0 lg:pr-12">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6">
            <span className="text-purple-600 font-medium text-sm">🚀 The Future of Banking</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Discover the
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 bg-clip-text text-transparent animate-pulse">
              freedom of digital banking
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            One wallet for all your everyday payments. Send money to friends
            <br />
            and family on FinPay for free – always.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link to="/register">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                Get Started Free
              </button>
            </Link>
            <button className="border-2 border-gray-300 hover:border-purple-600 text-gray-700 hover:text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-purple-50">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="flex space-x-8 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">1M+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">$5B+</div>
              <div className="text-sm text-gray-600">Transactions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
          </div>
        </div>

        {/* Right Content - Phone/Video Container */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative">
            {/* Phone Frame */}
            <div className="relative w-80 h-[640px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl transform rotate-6 hover:rotate-3 transition-all duration-700 hover:shadow-3xl">
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                {/* Status Bar */}
                <div className="flex justify-between items-center px-6 py-3 bg-white">
                  <span className="text-sm font-medium">9:41</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                    </div>
                    <div className="text-sm">100%</div>
                    <div className="w-6 h-3 border border-black rounded-sm">
                      <div className="w-full h-full bg-green-500 rounded-sm"></div>
                    </div>
                  </div>
                </div>

                {/* App Interface */}
                <div className="p-6">
                  {/* Card Section */}
                  <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl p-6 text-white mb-6 shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">Total Balance</p>
                        <p className="text-3xl font-bold">$7,520.20</p>
                        <p className="text-green-400 text-sm">+12.5% from last month</p>
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">💳</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-gray-400 text-xs">Card Holder</p>
                        <p className="text-sm font-semibold">Alex Morgan</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-xs">Expires</p>
                        <p className="text-sm">12/28</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <span className="text-purple-600">💸</span>
                      </div>
                      <p className="text-xs text-gray-600">Send</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <span className="text-green-600">💰</span>
                      </div>
                      <p className="text-xs text-gray-600">Receive</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <span className="text-blue-600">🏦</span>
                      </div>
                      <p className="text-xs text-gray-600">Bills</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <span className="text-orange-600">📊</span>
                      </div>
                      <p className="text-xs text-gray-600">Stats</p>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                    
                    {/* Transaction Items */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                            <span className="text-lg">🍔</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">McDonald's</p>
                            <p className="text-xs text-gray-500">Food & Dining • 2 hours ago</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-red-500">-$12.50</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center">
                            <span className="text-lg">💰</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Salary Deposit</p>
                            <p className="text-xs text-gray-500">Income • Yesterday</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-green-500">+$2,850.00</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center">
                            <span className="text-lg">🎵</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Spotify</p>
                            <p className="text-xs text-gray-500">Subscription • 3 days ago</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-red-500">-$9.99</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Loading Overlay */}
                {videoState.isLoading && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-white/80 text-sm font-medium">Loading preview...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Phone buttons */}
              <div className="absolute -right-1 top-20 w-1 h-12 bg-gray-600 rounded-full"></div>
              <div className="absolute -right-1 top-36 w-1 h-6 bg-gray-600 rounded-full"></div>
              <div className="absolute -right-1 top-44 w-1 h-6 bg-gray-600 rounded-full"></div>
              <div className="absolute -left-1 top-28 w-1 h-8 bg-gray-600 rounded-full"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <span className="text-xl">💳</span>
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-2xl">💰</span>
            </div>
            <div className="absolute top-1/2 -left-8 w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center shadow-lg animate-ping">
              <span className="text-base">📊</span>
            </div>
            <div className="absolute top-1/4 -right-6 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <span className="text-sm">⚡</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section with Videos */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Experience the <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Power</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how FinPay revolutionizes your financial experience with cutting-edge features
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Video 1 */}
          <div className="relative group">
            <div className="w-full h-80 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">
              {videoState.video1Loaded ? (
                <video 
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  controls
                  poster="/api/placeholder/600/400"
                >
                  <source src={videoSources.video1} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-2xl">📱</span>
                    </div>
                    <p className="text-gray-700 font-medium">Mobile Banking Experience</p>
                    <p className="text-gray-500 text-sm mt-2">Loading video...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">
              Seamless Mobile Banking
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Experience banking like never before with our intuitive mobile app. 
              Manage your finances, transfer money, and pay bills with just a few taps.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Instant transfers</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Real-time notifications</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Advanced security</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 lg:order-2">
            <h3 className="text-3xl font-bold text-gray-900">
              Smart Financial Insights
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Get personalized insights about your spending habits and financial health. 
              Make informed decisions with our AI-powered analytics.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Spending analytics</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Budget recommendations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Investment suggestions</span>
              </div>
            </div>
          </div>

          {/* Video 2 */}
          <div className="relative group lg:order-1">
            <div className="w-full h-80 bg-gradient-to-br from-green-100 to-teal-100 rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">
              {videoState.video2Loaded ? (
                <video 
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  controls
                  poster="/api/placeholder/600/400"
                >
                  <source src={videoSources.video2} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-2xl">📊</span>
                    </div>
                    <p className="text-gray-700 font-medium">Financial Analytics</p>
                    <p className="text-gray-500 text-sm mt-2">Loading video...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Banking?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join millions of users who have already made the switch to smarter banking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Start Your Journey
              </button>
            </Link>
            <Link to="/login">
              <button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;