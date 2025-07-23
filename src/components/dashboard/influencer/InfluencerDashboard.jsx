import { Award, Calendar, DollarSign, Eye, MessageSquare, Star, Users } from 'lucide-react';

export function InfluencerDashboard() {
  const stats = [
    { icon: DollarSign, label: 'Total Earnings', value: '$3,240', change: '+$420 this month', color: 'bg-green-500' },
    { icon: MessageSquare, label: 'Active Collaborations', value: '5', change: '2 pending approval', color: 'bg-blue-500' },
    { icon: Eye, label: 'Profile Views', value: '1,234', change: '+15% this week', color: 'bg-purple-500' },
    { icon: Calendar, label: 'Pending Payouts', value: '$890', change: '3 payments pending', color: 'bg-orange-500' },
  ];

  const activeCampaigns = [
    { 
      id: 1, 
      campaign_title: 'Summer Fashion Collection', 
      brand_name: 'StyleCo', 
      status: 'in_progress', 
      deadline: '2024-08-15', 
      deal_amount: 1500,
      category: 'Fashion',
      deliverables: ['2 Instagram posts', '4 Story mentions']
    },
    { 
      id: 2, 
      campaign_title: 'Tech Product Review', 
      brand_name: 'TechBrand', 
      status: 'approved', 
      deadline: '2024-08-20', 
      deal_amount: 2500,
      category: 'Technology',
      deliverables: ['1 YouTube review', '2 Instagram posts']
    },
    { 
      id: 3, 
      campaign_title: 'Fitness Challenge', 
      brand_name: 'FitLife', 
      status: 'pending', 
      deadline: '2024-08-25', 
      deal_amount: 800,
      category: 'Health & Fitness',
      deliverables: ['3 Instagram posts', '5 Story updates']
    },
  ];

  const recentEarnings = [
    { date: '2024-07-25', amount: 1500, campaign: 'Summer Fashion Collection', status: 'completed' },
    { date: '2024-07-20', amount: 800, campaign: 'Fitness Challenge Campaign', status: 'completed' },
    { date: '2024-07-15', amount: 600, campaign: 'Food Blog Partnership', status: 'pending' },
    { date: '2024-07-10', amount: 340, campaign: 'Beauty Product Review', status: 'completed' }
  ];

  const profileStats = {
    followers: 125000,
    engagement_rate: 4.8,
    total_posts: 342,
    campaigns_completed: 28,
    visibility_tier: 'premium'
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Influencer Dashboard</h2>
          <p className="text-gray-600">Track your collaborations and earnings</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            <Star size={14} />
            {profileStats.visibility_tier}
          </div>
        </div>
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

      {/* Profile Overview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{(profileStats.followers / 1000).toFixed(0)}K</div>
            <div className="text-sm text-gray-600">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{profileStats.engagement_rate}%</div>
            <div className="text-sm text-gray-600">Engagement Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{profileStats.total_posts}</div>
            <div className="text-sm text-gray-600">Total Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{profileStats.campaigns_completed}</div>
            <div className="text-sm text-gray-600">Campaigns Completed</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Projects */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active Projects</h3>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {activeCampaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{campaign.campaign_title}</h4>
                    <p className="text-sm text-gray-600">{campaign.brand_name} • {campaign.category}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign.status)}`}>
                    {campaign.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Deliverables:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {campaign.deliverables.map((deliverable, index) => (
                      <span key={index} className="px-2 py-1 bg-white text-gray-700 text-xs rounded-md border">
                        {deliverable}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Deadline: {new Date(campaign.deadline).toLocaleDateString()}</span>
                  <span className="font-semibold text-gray-900">${campaign.deal_amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings Overview */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Earnings</h3>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">View All</button>
          </div>
          
          <div className="mb-6">
            <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">This Month</span>
                <span className="text-lg font-bold text-green-600">$1,240</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
              </div>
              <div className="text-xs text-gray-600 mt-1">75% of monthly goal</div>
            </div>
          </div>
          
          <div className="space-y-3">
            {recentEarnings.map((earning, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{earning.campaign}</h4>
                  <p className="text-xs text-gray-600">{new Date(earning.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">${earning.amount.toLocaleString()}</div>
                  <div className={`text-xs ${earning.status === 'completed' ? 'text-green-600' : 'text-orange-600'}`}>
                    {earning.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-6 rounded-xl text-white">
          <div className="flex items-center gap-3 mb-4">
            <Eye size={24} />
            <h3 className="text-lg font-semibold">Discover Campaigns</h3>
          </div>
          <p className="text-purple-100 mb-4">Find new brand collaboration opportunities</p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-all">
            Browse Campaigns
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-teal-500 p-6 rounded-xl text-white">
          <div className="flex items-center gap-3 mb-4">
            <Users size={24} />
            <h3 className="text-lg font-semibold">Update Profile</h3>
          </div>
          <p className="text-green-100 mb-4">Keep your profile fresh and engaging</p>
          <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-all">
            Edit Profile
          </button>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-xl text-white">
          <div className="flex items-center gap-3 mb-4">
            <Award size={24} />
            <h3 className="text-lg font-semibold">View Analytics</h3>
          </div>
          <p className="text-orange-100 mb-4">Track your performance and growth</p>
          <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-all">
            View Stats
          </button>
        </div>
      </div>
    </div>
  );
}