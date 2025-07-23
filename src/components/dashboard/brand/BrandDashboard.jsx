import { Lamp as Campaign, DollarSign, Plus, TrendingUp, Users } from 'lucide-react';

export function BrandDashboard() {
  const stats = [
    { icon: Campaign, label: 'Active Campaigns', value: '12', change: '+2 this month', color: 'bg-blue-500' },
    { icon: Users, label: 'Collaborating Influencers', value: '48', change: '+8 this week', color: 'bg-green-500' },
    { icon: TrendingUp, label: 'Total Reach', value: '2.4M', change: '+12% this month', color: 'bg-purple-500' },
    { icon: DollarSign, label: 'Budget Spent', value: '$24,500', change: '68% of total budget', color: 'bg-orange-500' },
  ];

  const recentCampaigns = [
    { 
      id: 1, 
      campaign_title: 'Summer Fashion Collection', 
      status: 'active', 
      applications: 24, 
      budget: 5000,
      category: 'Fashion',
      created_at: '2024-07-20',
      ended_at: '2024-08-30'
    },
    { 
      id: 2, 
      campaign_title: 'Tech Product Launch', 
      status: 'completed', 
      applications: 15, 
      budget: 8000,
      category: 'Technology',
      created_at: '2024-07-18',
      ended_at: '2024-09-15'
    },
    { 
      id: 3, 
      campaign_title: 'Fitness Challenge Campaign', 
      status: 'active', 
      applications: 31, 
      budget: 3500,
      category: 'Health & Fitness',
      created_at: '2024-07-15',
      ended_at: '2024-08-25'
    },
  ];

  const topInfluencers = [
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      username: '@fashionista_sarah', 
      category: 'Fashion',
      followers: 250000, 
      engagement_rate: 4.8, 
      campaigns: 3,
      total_earned: 4500
    },
    { 
      id: 2, 
      name: 'Mike Chen', 
      username: '@tech_reviewer_mike', 
      category: 'Technology',
      followers: 180000, 
      engagement_rate: 6.2, 
      campaigns: 2,
      total_earned: 3200
    },
    { 
      id: 3, 
      name: 'Emma Davis', 
      username: '@fitness_emma', 
      category: 'Health & Fitness',
      followers: 320000, 
      engagement_rate: 5.4, 
      campaigns: 4,
      total_earned: 5800
    },
  ];

  const recentCollaborations = [
    {
      id: 1,
      campaign_title: 'Summer Fashion Collection',
      influencer_name: 'Sarah Johnson',
      status: 'in_progress',
      deal_amount: 1500,
      created_at: '2024-07-20'
    },
    {
      id: 2,
      campaign_title: 'Tech Product Launch',
      influencer_name: 'Mike Chen',
      status: 'completed',
      deal_amount: 2500,
      created_at: '2024-07-18'
    },
    {
      id: 3,
      campaign_title: 'Fitness Challenge',
      influencer_name: 'Emma Davis',
      status: 'pending',
      deal_amount: 800,
      created_at: '2024-07-22'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'in_progress':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'paused':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Brand Dashboard</h2>
          <p className="text-gray-600">Overview of your campaigns and performance</p>
        </div>
        <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-600 hover:to-blue-600 transition-all flex items-center gap-2">
          <Plus size={20} />
          Create Campaign
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Campaigns */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Campaigns</h3>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentCampaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{campaign.campaign_title}</h4>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                    <span className="text-sm text-gray-600">{campaign.applications} applications</span>
                    <span className="text-sm text-gray-600">{campaign.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${campaign.budget.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Budget</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Influencers */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Influencers</h3>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {topInfluencers.map((influencer, index) => (
              <div key={influencer.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">#{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{influencer.name}</h4>
                  <p className="text-sm text-purple-600">{influencer.username}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-600">{influencer.category}</span>
                    <span className="text-xs text-gray-600">{(influencer.followers / 1000).toFixed(0)}K followers</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{influencer.engagement_rate}%</p>
                  <p className="text-sm text-gray-600">Engagement</p>
                  <p className="text-xs text-gray-500">${influencer.total_earned.toLocaleString()} earned</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Collaborations */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Collaborations</h3>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Campaign</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Influencer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentCollaborations.map((collab) => (
                <tr key={collab.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{collab.campaign_title}</td>
                  <td className="py-3 px-4 text-gray-600">{collab.influencer_name}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(collab.status)}`}>
                      {collab.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900">${collab.deal_amount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">{new Date(collab.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-6 rounded-xl text-white">
          <div className="flex items-center gap-3 mb-4">
            <Campaign size={24} />
            <h3 className="text-lg font-semibold">Create Campaign</h3>
          </div>
          <p className="text-purple-100 mb-4">Launch a new influencer marketing campaign</p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-all">
            Get Started
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-teal-500 p-6 rounded-xl text-white">
          <div className="flex items-center gap-3 mb-4">
            <Users size={24} />
            <h3 className="text-lg font-semibold">Find Influencers</h3>
          </div>
          <p className="text-green-100 mb-4">Discover content creators for your brand</p>
          <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-all">
            Browse Now
          </button>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-xl text-white">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={24} />
            <h3 className="text-lg font-semibold">View Analytics</h3>
          </div>
          <p className="text-orange-100 mb-4">Track your campaign performance</p>
          <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-all">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
}