// Analytics Component
// This page shows reach, engagement, ROI, top influencers, and campaign stats.
// All data is sample data for UI display and testing.

import { BarChart3, DollarSign, Eye, Heart, MessageCircle, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

export function Analytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const overviewStats = [
    { icon: TrendingUp, label: 'Total Reach', value: '2.4M', change: '+12%', color: 'bg-blue-500' },
    { icon: Users, label: 'Engagement Rate', value: '4.8%', change: '+0.3%', color: 'bg-green-500' },
    { icon: Eye, label: 'Impressions', value: '5.2M', change: '+18%', color: 'bg-purple-500' },
    { icon: DollarSign, label: 'ROI', value: '320%', change: '+45%', color: 'bg-orange-500' }
  ];

  const campaignPerformance = [
    { name: 'Summer Fashion Collection', reach: 850000, engagement: 4.2, roi: 280, spend: 5000 },
    { name: 'Tech Product Launch', reach: 650000, engagement: 6.1, roi: 420, spend: 8000 },
    { name: 'Fitness Challenge', reach: 480000, engagement: 5.8, roi: 350, spend: 3500 },
    { name: 'Food Blog Partnership', reach: 320000, engagement: 7.2, roi: 290, spend: 2000 }
  ];

  const topInfluencers = [
    { name: 'Sarah Johnson', username: '@fashionista_sarah', reach: 450000, engagement: 4.8, campaigns: 3 },
    { name: 'Mike Chen', username: '@tech_reviewer_mike', reach: 380000, engagement: 6.2, campaigns: 2 },
    { name: 'Emma Davis', username: '@fitness_emma', reach: 520000, engagement: 5.4, campaigns: 4 },
    { name: 'Alex Rodriguez', username: '@foodie_alex', reach: 180000, engagement: 7.1, campaigns: 1 }
  ];

  const engagementData = [
    { date: '2024-07-01', likes: 12000, comments: 450, shares: 230 },
    { date: '2024-07-08', likes: 15000, comments: 520, shares: 280 },
    { date: '2024-07-15', likes: 18000, comments: 680, shares: 340 },
    { date: '2024-07-22', likes: 16000, comments: 590, shares: 310 },
    { date: '2024-07-29', likes: 20000, comments: 750, shares: 420 }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h2>
          <p className="text-gray-600">Track your campaign performance and ROI</p>
        </div>
        
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Engagement Trends */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Trends</h3>
          <div className="space-y-4">
            {engagementData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">
                  {new Date(data.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Heart size={14} className="text-red-500" />
                    <span>{(data.likes / 1000).toFixed(1)}K</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={14} className="text-blue-500" />
                    <span>{data.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={14} className="text-green-500" />
                    <span>{data.shares}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Performance */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance</h3>
          <div className="space-y-4">
            {campaignPerformance.map((campaign, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                  <span className="text-sm font-semibold text-green-600">{campaign.roi}% ROI</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Reach:</span>
                    <div className="font-semibold">{(campaign.reach / 1000).toFixed(0)}K</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Engagement:</span>
                    <div className="font-semibold">{campaign.engagement}%</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Spend:</span>
                    <div className="font-semibold">${campaign.spend.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Influencers</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Influencer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Reach</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Engagement</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Campaigns</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Performance</th>
              </tr>
            </thead>
            <tbody>
              {topInfluencers.map((influencer, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{influencer.name}</div>
                      <div className="text-sm text-purple-600">{influencer.username}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">
                    {(influencer.reach / 1000).toFixed(0)}K
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 font-medium">{influencer.engagement}%</span>
                  </td>
                  <td className="py-3 px-4 text-gray-900">
                    {influencer.campaigns}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                          style={{ width: `${Math.min(influencer.engagement * 10, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {influencer.engagement > 6 ? 'Excellent' : influencer.engagement > 4 ? 'Good' : 'Average'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 size={20} className="text-purple-600" />
          Key Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Best Performing Category</h4>
            <p className="text-sm text-gray-600">Health & Fitness campaigns show 23% higher engagement rates</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Optimal Posting Time</h4>
            <p className="text-sm text-gray-600">Posts between 2-4 PM generate 35% more engagement</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">ROI Trend</h4>
            <p className="text-sm text-gray-600">Average ROI increased by 45% compared to last quarter</p>
          </div>
        </div>
      </div>
    </div>
  );
}
