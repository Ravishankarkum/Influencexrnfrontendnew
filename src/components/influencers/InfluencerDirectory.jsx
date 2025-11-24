import React, { useState } from 'react';
import { Search, Filter, Users, TrendingUp, MapPin, ExternalLink, Heart, MessageCircle } from 'lucide-react';

export function InfluencerDirectory() {
  // State for search bar input
  const [searchTerm, setSearchTerm] = useState('');
  // State for filtering by category
  const [selectedCategory, setSelectedCategory] = useState('all');
  // State for filtering by visibility tier (premium / standard)
  const [selectedTier, setSelectedTier] = useState('all');

  // Mock influencer list (dummy data simulating backend)
  const mockInfluencers = [
    {
      id: '1',
      username: '@fashionista_sarah',
      name: 'Sarah Johnson',
      category: 'Fashion',
      followers: 250000,
      engagement_rate: 4.8,
      city: 'New York',
      bio: 'Fashion enthusiast sharing sustainable style tips and outfit inspiration.',
      portfolio_links: ['instagram.com/fashionista_sarah', 'tiktok.com/@fashionista_sarah'],
      visibility_tier: 'premium',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      recent_posts: 24,
      avg_likes: 12000,
      avg_comments: 450
    },
    {
      id: '2',
      username: '@tech_reviewer_mike',
      name: 'Mike Chen',
      category: 'Technology',
      followers: 180000,
      engagement_rate: 6.2,
      city: 'San Francisco',
      bio: 'Tech reviewer and gadget enthusiast. Honest reviews and tech tips.',
      portfolio_links: ['youtube.com/techreviewermike', 'instagram.com/tech_reviewer_mike'],
      visibility_tier: 'premium',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      recent_posts: 18,
      avg_likes: 8500,
      avg_comments: 320
    },
    {
      id: '3',
      username: '@fitness_emma',
      name: 'Emma Davis',
      category: 'Health & Fitness',
      followers: 320000,
      engagement_rate: 5.4,
      city: 'Los Angeles',
      bio: 'Certified personal trainer helping you achieve your fitness goals.',
      portfolio_links: ['instagram.com/fitness_emma', 'youtube.com/fitnessemma'],
      visibility_tier: 'premium',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      recent_posts: 32,
      avg_likes: 15000,
      avg_comments: 680
    },
    {
      id: '4',
      username: '@foodie_alex',
      name: 'Alex Rodriguez',
      category: 'Food',
      followers: 95000,
      engagement_rate: 7.1,
      city: 'Chicago',
      bio: 'Food blogger exploring the best restaurants and recipes in the city.',
      portfolio_links: ['instagram.com/foodie_alex', 'blog.foodiealex.com'],
      visibility_tier: 'standard',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      recent_posts: 28,
      avg_likes: 4200,
      avg_comments: 180
    }
  ];

  // Dropdown values for filtering
  const categories = ['all', 'Fashion', 'Technology', 'Health & Fitness', 'Food', 'Travel', 'Lifestyle', 'Beauty'];
  const tiers = ['all', 'premium', 'standard'];

  // Filter logic based on search input + selected category + tier
  const filteredInfluencers = mockInfluencers.filter(influencer => {
    const matchesSearch =
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.bio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || influencer.category === selectedCategory;
    const matchesTier = selectedTier === 'all' || influencer.visibility_tier === selectedTier;

    return matchesSearch && matchesCategory && matchesTier;
  });

  // Format followers as K / M
  const formatFollowers = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Influencers</h2>
        <p className="text-gray-600">Discover and connect with content creators for your campaigns</p>
      </div>

      {/* Search bar + filters container */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search influencers by name, username, or bio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Category + Tier Filters */}
          <div className="flex items-center gap-3">
            <Filter size={20} className="text-gray-400" />

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            {/* Tier Filter */}
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              {tiers.map(tier => (
                <option key={tier} value={tier}>
                  {tier === 'all' ? 'All Tiers' : tier.charAt(0).toUpperCase() + tier.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Influencer Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredInfluencers.map((influencer) => (
          
          // Individual Influencer Card
          <div key={influencer.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
            
            {/* Avatar + Username + Location + Tier */}
            <div className="flex items-start gap-4 mb-4">
              <img
                src={influencer.avatar}
                alt={influencer.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{influencer.name}</h3>
                <p className="text-purple-600 font-medium">{influencer.username}</p>

                {/* Location */}
                <div className="flex items-center gap-2 mt-1">
                  <MapPin size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-600">{influencer.city}</span>
                </div>
              </div>

              {/* Visibility Tier Badge */}
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                influencer.visibility_tier === 'premium' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {influencer.visibility_tier}
              </span>
            </div>

            {/* Short Bio */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{influencer.bio}</p>

            {/* Stats: Followers, Engagement, Posts */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">{formatFollowers(influencer.followers)}</div>
                <div className="text-xs text-gray-600">Followers</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">{influencer.engagement_rate}%</div>
                <div className="text-xs text-gray-600">Engagement</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">{influencer.recent_posts}</div>
                <div className="text-xs text-gray-600">Posts/Month</div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium text-gray-900">{influencer.category}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Avg. Likes:</span>
                <span className="font-medium text-gray-900">{formatFollowers(influencer.avg_likes)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Avg. Comments:</span>
                <span className="font-medium text-gray-900">{influencer.avg_comments}</span>
              </div>
            </div>

            {/* Portfolio Links (limited to 2) */}
            <div className="flex gap-2 mb-4">
              {influencer.portfolio_links.slice(0, 2).map((link, index) => (
                <a
                  key={index}
                  href={`https://${link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 bg-purple-50 px-2 py-1 rounded-md transition-colors"
                >
                  <ExternalLink size={12} />
                  {link.split('/')[0]}
                </a>
              ))}
            </div>

            {/* Contact + Favorite Button */}
            <div className="flex gap-2">
              <button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all">
                Contact
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
                <Heart size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No results message */}
      {filteredInfluencers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No influencers found</h3>
          <p className="text-gray-600">Try adjusting your search or filters to find more influencers.</p>
        </div>
      )}
    </div>
  );
}
