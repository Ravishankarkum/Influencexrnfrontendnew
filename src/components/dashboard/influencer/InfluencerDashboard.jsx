import { Clock, DollarSign, MessageSquare, Star, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

const iconMap = {
  DollarSign,
  MessageSquare,
  Clock,
  Target,
};

export function InfluencerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState([]);
  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [recentEarnings, setRecentEarnings] = useState([]);
  const [profileStats, setProfileStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!user?._id || !user?.token) {
        setLoading(false);
        setError("Unauthorized: User not found");
        return;
      }

      try {
        const response = await fetch(`/api/dashboard`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setStats(data?.stats || []);
        setActiveCampaigns(data?.activeCampaigns || []);
        setRecentEarnings(data?.recentEarnings || []);
        setProfileStats(data?.profileStats || {});
      } catch (err) {
        console.error('Error loading influencer dashboard:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [user]);

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

  if (loading) return <div className="text-center py-10 text-gray-500">Loading dashboard...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🎯 Influencer Dashboard</h2>
          <p className="text-gray-500">Track your performance and collaborations</p>
        </div>
        {profileStats?.visibility_tier && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-purple-200 to-purple-400 text-purple-900 px-4 py-1 rounded-full text-sm font-semibold shadow-md">
            <Star size={16} />
            {profileStats.visibility_tier}
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = iconMap[stat.icon];
          return (
            <div key={index} className="bg-gradient-to-tr from-indigo-100 to-indigo-200 p-5 rounded-2xl shadow hover:scale-[1.02] transition-transform duration-200 border">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-full bg-indigo-500 text-white shadow-lg">
                  {Icon && <Icon size={24} />}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-green-600 font-medium">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Profile Overview */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Profile Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-700">
              {((profileStats.followers || 0) / 1000).toFixed(0)}K
            </div>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">
              {profileStats.engagement_rate || 0}%
            </div>
            <p className="text-sm text-gray-500">Engagement Rate</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">
              {profileStats.total_posts || 0}
            </div>
            <p className="text-sm text-gray-500">Total Posts</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">
              {profileStats.campaigns_completed || 0}
            </div>
            <p className="text-sm text-gray-500">Campaigns Completed</p>
          </div>
        </div>
      </div>

      {/* Active Campaigns */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">🧾 Active Campaigns</h3>
        </div>
        <div className="space-y-4">
          {activeCampaigns.length === 0 ? (
            <p className="text-gray-500 text-sm">No active campaigns</p>
          ) : (
            activeCampaigns.map((campaign) => (
              <div
                key={campaign._id || campaign.id}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{campaign.campaign_title}</h4>
                    <p className="text-sm text-gray-500">{campaign.brand_name} • {campaign.category}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                    {campaign.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                  <span>📅 {new Date(campaign.deadline).toLocaleDateString()}</span>
                  <span className="font-semibold text-gray-900">${campaign.deal_amount?.toLocaleString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Earnings */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💰 Recent Earnings</h3>
        <div className="space-y-3">
          {recentEarnings.length === 0 ? (
            <p className="text-sm text-gray-500">No recent earnings</p>
          ) : (
            recentEarnings.map((earning, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div>
                  <p className="font-medium text-sm text-gray-900">{earning.campaign}</p>
                  <p className="text-xs text-gray-500">{new Date(earning.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800 text-sm">${earning.amount?.toLocaleString()}</p>
                  <p className={`text-xs ${earning.status === 'completed' ? 'text-green-600' : 'text-orange-600'}`}>
                    {earning.status}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
