import { Calendar, Filter, Search, Users } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CampaignStatus } from '../../types';

export function CampaignDiscovery() {
  // State for search input
  const [searchTerm, setSearchTerm] = useState('');
  // State for selected category filter
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Temporary mock data for campaigns (Replace later with API response)
  const mockCampaigns = [
    {
      id: '1',
      brand_id: 'brand1',
      campaign_title: 'Summer Fashion Collection 2024',
      description: 'Promote our latest summer fashion collection featuring sustainable materials and trendy designs. Looking for fashion influencers with engaged audiences.',
      category: 'Fashion',
      budget: 5000,
      requirements: ['Instagram posts', 'Story mentions', '50K+ followers'],
      ended_at: '2024-08-30',
      created_at: '2024-07-20',
      status: CampaignStatus.ACTIVE,
      applications: 24
    },
    {
      id: '2',
      brand_id: 'brand2',
      campaign_title: 'Tech Product Launch',
      description: 'Launch campaign for our new smartphone. Seeking tech reviewers and lifestyle influencers to showcase product features.',
      category: 'Technology',
      budget: 8000,
      requirements: ['YouTube review', 'Instagram posts', 'Tech expertise'],
      ended_at: '2024-09-15',
      created_at: '2024-07-18',
      status: CampaignStatus.ACTIVE,
      applications: 15
    },
    {
      id: '3',
      brand_id: 'brand3',
      campaign_title: 'Fitness Challenge Campaign',
      description: 'Join our 30-day fitness challenge and inspire your audience to live a healthier lifestyle. Perfect for fitness and wellness influencers.',
      category: 'Health & Fitness',
      budget: 3500,
      requirements: ['Fitness content', 'Progress updates', '25K+ followers'],
      ended_at: '2024-08-20',
      created_at: '2024-07-15',
      status: CampaignStatus.ACTIVE,
      applications: 31
    }
  ];

  // Available categories for the dropdown
  const categories = ['all', 'Fashion', 'Technology', 'Health & Fitness', 'Food', 'Travel', 'Lifestyle'];

  // Filter campaigns based on search + category selection
  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch =
      campaign.campaign_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || campaign.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Discover Campaigns</h2>
        <p className="text-gray-600">Find the perfect brand collaborations for your audience</p>
      </div>

      {/* Search + Category Filter */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-3">
            <Filter size={20} className="text-gray-400" />
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
          </div>
        </div>
      </div>

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
          >
            {/* Campaign Title + Budget */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{campaign.campaign_title}</h3>

                {/* Category Label */}
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                  {campaign.category}
                </span>
              </div>

              {/* Budget Display */}
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">${campaign.budget.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Budget</p>
              </div>
            </div>

            {/* Description (clamped to 3 lines) */}
            <p className="text-gray-600 mb-4 line-clamp-3">{campaign.description}</p>

            {/* Campaign Info (end date + application count) */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={16} />
                <span>Ends on {new Date(campaign.ended_at).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users size={16} />
                <span>{campaign.applications} applications</span>
              </div>
            </div>

            {/* Requirements List */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Requirements:</p>
              <div className="flex flex-wrap gap-2">
                {campaign.requirements.map((req, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <div className="flex">
              <Link
                to={`/apply/${campaign.id}`}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg font-medium text-center hover:from-purple-600 hover:to-blue-600 transition-all"
              >
                Apply Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* If no campaigns match search/filter */}
      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
          <p className="text-gray-600">Try adjusting your search or filters to find more campaigns.</p>
        </div>
      )}
    </div>
  );
}
