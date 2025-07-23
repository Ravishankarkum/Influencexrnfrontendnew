import React, { useState } from 'react';
import { Calendar, Users, DollarSign, Eye, Edit, Trash2, Play, Pause, BarChart3 } from 'lucide-react';
import { CampaignStatus } from '../../types';

export function MyCampaigns() {
  const [campaigns, setCampaigns] = useState([
    {
      id: '1',
      campaign_title: 'Summer Fashion Collection 2024',
      description: 'Promote our latest summer fashion collection featuring sustainable materials and trendy designs.',
      category: 'Fashion',
      budget: 5000,
      status: CampaignStatus.ACTIVE,
      applications: 24,
      selected_influencers: 3,
      created_at: '2024-07-20',
      ended_at: '2024-08-30',
      total_reach: 450000,
      engagement_rate: 4.2
    },
    {
      id: '2',
      campaign_title: 'Tech Product Launch',
      description: 'Launch campaign for our new smartphone with tech reviewers.',
      category: 'Technology',
      budget: 8000,
      status: CampaignStatus.ACTIVE,
      applications: 15,
      selected_influencers: 2,
      created_at: '2024-07-18',
      ended_at: '2024-09-15',
      total_reach: 320000,
      engagement_rate: 5.8
    },
    {
      id: '3',
      campaign_title: 'Fitness Challenge Campaign',
      description: 'Join our 30-day fitness challenge and inspire your audience.',
      category: 'Health & Fitness',
      budget: 3500,
      status: CampaignStatus.COMPLETED,
      applications: 31,
      selected_influencers: 5,
      created_at: '2024-06-15',
      ended_at: '2024-07-20',
      total_reach: 280000,
      engagement_rate: 6.1
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case CampaignStatus.ACTIVE:
        return 'bg-green-100 text-green-800';
      case CampaignStatus.COMPLETED:
        return 'bg-gray-100 text-gray-800';
      case CampaignStatus.PAUSED:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleCampaignStatus = (campaignId) => {
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === campaignId) {
        return {
          ...campaign,
          status: campaign.status === CampaignStatus.ACTIVE ? CampaignStatus.PAUSED : CampaignStatus.ACTIVE
        };
      }
      return campaign;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">My Campaigns</h2>
          <p className="text-gray-600">Manage and track your active campaigns</p>
        </div>
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option value="all">All Campaigns</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="paused">Paused</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{campaign.campaign_title}</h3>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(campaign.status)}`}>
                  {campaign.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleCampaignStatus(campaign.id)}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  {campaign.status === CampaignStatus.ACTIVE ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{campaign.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">{campaign.applications}</div>
                <div className="text-xs text-gray-600">Applications</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">{campaign.selected_influencers}</div>
                <div className="text-xs text-gray-600">Selected</div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Budget:</span>
                <span className="font-semibold text-gray-900">${campaign.budget.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Reach:</span>
                <span className="font-semibold text-gray-900">{(campaign.total_reach / 1000).toFixed(0)}K</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Engagement:</span>
                <span className="font-semibold text-green-600">{campaign.engagement_rate}%</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2">
                <BarChart3 size={16} />
                Analytics
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
                <Eye size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}