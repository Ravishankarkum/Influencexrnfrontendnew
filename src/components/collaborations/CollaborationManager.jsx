import React, { useState } from 'react';
import { MessageSquare, Calendar, DollarSign, CheckCircle, Clock, XCircle, User, Building } from 'lucide-react';
import { CollaborationStatus } from '../../types';

export function CollaborationManager() {
  const [activeTab, setActiveTab] = useState('all');
  const [collaborations, setCollaborations] = useState([
    {
      id: '1',
      campaign_title: 'Summer Fashion Collection 2024',
      brand_name: 'StyleCo',
      influencer_name: 'Sarah Johnson',
      influencer_username: '@fashionista_sarah',
      deal_amount: 1500,
      commission_charged: 150,
      status: CollaborationStatus.IN_PROGRESS,
      created_at: '2024-07-20',
      completed_on: null,
      deliverables: ['2 Instagram posts', '4 Story mentions', '1 Reel'],
      deadline: '2024-08-15',
      messages: 3
    },
    {
      id: '2',
      campaign_title: 'Tech Product Launch',
      brand_name: 'TechBrand',
      influencer_name: 'Mike Chen',
      influencer_username: '@tech_reviewer_mike',
      deal_amount: 2500,
      commission_charged: 250,
      status: CollaborationStatus.PENDING,
      created_at: '2024-07-18',
      completed_on: null,
      deliverables: ['1 YouTube review', '2 Instagram posts'],
      deadline: '2024-08-20',
      messages: 1
    },
    {
      id: '3',
      campaign_title: 'Fitness Challenge Campaign',
      brand_name: 'FitLife',
      influencer_name: 'Emma Davis',
      influencer_username: '@fitness_emma',
      deal_amount: 800,
      commission_charged: 80,
      status: CollaborationStatus.COMPLETED,
      created_at: '2024-06-15',
      completed_on: '2024-07-10',
      deliverables: ['3 Instagram posts', '5 Story updates'],
      deadline: '2024-07-15',
      messages: 8
    },
    {
      id: '4',
      campaign_title: 'Food Blog Partnership',
      brand_name: 'Gourmet Foods',
      influencer_name: 'Alex Rodriguez',
      influencer_username: '@foodie_alex',
      deal_amount: 600,
      commission_charged: 60,
      status: CollaborationStatus.REJECTED,
      created_at: '2024-07-10',
      completed_on: null,
      deliverables: ['2 Instagram posts', '1 Blog post'],
      deadline: '2024-08-10',
      messages: 2
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case CollaborationStatus.PENDING:
        return <Clock size={16} className="text-yellow-600" />;
      case CollaborationStatus.APPROVED:
        return <CheckCircle size={16} className="text-blue-600" />;
      case CollaborationStatus.IN_PROGRESS:
        return <Calendar size={16} className="text-purple-600" />;
      case CollaborationStatus.COMPLETED:
        return <CheckCircle size={16} className="text-green-600" />;
      case CollaborationStatus.REJECTED:
        return <XCircle size={16} className="text-red-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case CollaborationStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case CollaborationStatus.APPROVED:
        return 'bg-blue-100 text-blue-800';
      case CollaborationStatus.IN_PROGRESS:
        return 'bg-purple-100 text-purple-800';
      case CollaborationStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case CollaborationStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCollaborations = collaborations.filter(collab => {
    if (activeTab === 'all') return true;
    return collab.status === activeTab;
  });

  const tabs = [
    { id: 'all', label: 'All', count: collaborations.length },
    { id: CollaborationStatus.PENDING, label: 'Pending', count: collaborations.filter(c => c.status === CollaborationStatus.PENDING).length },
    { id: CollaborationStatus.IN_PROGRESS, label: 'In Progress', count: collaborations.filter(c => c.status === CollaborationStatus.IN_PROGRESS).length },
    { id: CollaborationStatus.COMPLETED, label: 'Completed', count: collaborations.filter(c => c.status === CollaborationStatus.COMPLETED).length }
  ];

  const updateCollaborationStatus = (id, newStatus) => {
    setCollaborations(collaborations.map(collab => 
      collab.id === id 
        ? { ...collab, status: newStatus, completed_on: newStatus === CollaborationStatus.COMPLETED ? new Date().toISOString().split('T')[0] : null }
        : collab
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Collaborations</h2>
        <p className="text-gray-600">Manage your brand partnerships and track progress</p>
      </div>

      {/* Tabs */}
      <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.label}
              <span className={`px-2 py-1 text-xs rounded-full ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Collaborations List */}
      <div className="space-y-4">
        {filteredCollaborations.map((collaboration) => (
          <div key={collaboration.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{collaboration.campaign_title}</h3>
                  <span className={`flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(collaboration.status)}`}>
                    {getStatusIcon(collaboration.status)}
                    {collaboration.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Building size={16} />
                    <span>{collaboration.brand_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{collaboration.influencer_name} ({collaboration.influencer_username})</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">${collaboration.deal_amount.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Deal Amount</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Deliverables</h4>
                <ul className="space-y-1">
                  {collaboration.deliverables.map((deliverable, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Timeline</h4>
                <div className="space-y-1">
                  <div className="text-sm text-gray-600">
                    Started: {new Date(collaboration.created_at).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    Deadline: {new Date(collaboration.deadline).toLocaleDateString()}
                  </div>
                  {collaboration.completed_on && (
                    <div className="text-sm text-green-600">
                      Completed: {new Date(collaboration.completed_on).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Financial</h4>
                <div className="space-y-1">
                  <div className="text-sm text-gray-600">
                    Commission: ${collaboration.commission_charged}
                  </div>
                  <div className="text-sm text-gray-600">
                    Net Amount: ${collaboration.deal_amount - collaboration.commission_charged}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MessageSquare size={16} />
                <span>{collaboration.messages} messages</span>
              </div>
              
              <div className="flex gap-2">
                <button className="px-4 py-2 text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-all flex items-center gap-2">
                  <MessageSquare size={16} />
                  Message
                </button>
                
                {collaboration.status === CollaborationStatus.PENDING && (
                  <>
                    <button
                      onClick={() => updateCollaborationStatus(collaboration.id, CollaborationStatus.APPROVED)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateCollaborationStatus(collaboration.id, CollaborationStatus.REJECTED)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                    >
                      Reject
                    </button>
                  </>
                )}
                
                {collaboration.status === CollaborationStatus.IN_PROGRESS && (
                  <button
                    onClick={() => updateCollaborationStatus(collaboration.id, CollaborationStatus.COMPLETED)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCollaborations.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No collaborations found</h3>
          <p className="text-gray-600">
            {activeTab === 'all' 
              ? 'Start by creating campaigns to connect with influencers.'
              : `No collaborations with ${activeTab.replace('_', ' ')} status.`
            }
          </p>
        </div>
      )}
    </div>
  );
}