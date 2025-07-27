import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

export function InfluencerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState([]);
  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [recentEarnings, setRecentEarnings] = useState([]);
  const [profileStats, setProfileStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

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

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Influencer Dashboard</h2>
          <p className="text-gray-600">Track your collaborations and earnings</p>
        </div>
        {profileStats?.visibility_tier && (
          <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            <Star size={14} />
            {profileStats.visibility_tier}
          </div>
        )}
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
      {profileStats && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {((profileStats.followers || 0) / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {profileStats.engagement_rate || 0}%
              </div>
              <div className="text-sm text-gray-600">Engagement Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {profileStats.total_posts || 0}
              </div>
              <div className="text-sm text-gray-600">Total Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {profileStats.campaigns_completed || 0}
              </div>
              <div className="text-sm text-gray-600">Campaigns Completed</div>
            </div>
          </div>
        </div>
      )}

      {/* Active Campaigns */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Active Campaigns</h3>
        </div>
        <div className="space-y-4">
          {activeCampaigns.length === 0 ? (
            <div className="text-sm text-gray-500">No active campaigns</div>
          ) : (
            activeCampaigns.map((campaign) => (
              <div
                key={campaign._id || campaign.id}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{campaign.campaign_title}</h4>
                    <p className="text-sm text-gray-600">
                      {campaign.brand_name} • {campaign.category}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      campaign.status
                    )}`}
                  >
                    {campaign.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Deadline: {new Date(campaign.deadline).toLocaleDateString()}
                  </span>
                  <span className="font-semibold text-gray-900">
                    ${campaign.deal_amount?.toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Earnings */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Earnings</h3>
        </div>
        <div className="space-y-3">
          {recentEarnings.length === 0 ? (
            <div className="text-sm text-gray-500">No recent earnings</div>
          ) : (
            recentEarnings.map((earning, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{earning.campaign}</h4>
                  <p className="text-xs text-gray-600">
                    {new Date(earning.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">
                    ${earning.amount?.toLocaleString()}
                  </div>
                  <div
                    className={`text-xs ${
                      earning.status === 'completed' ? 'text-green-600' : 'text-orange-600'
                    }`}
                  >
                    {earning.status}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
