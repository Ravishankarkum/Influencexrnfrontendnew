import {
  BarChart3,
  FileText,
  Plus,
  Search,
  UserCircle
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { apiService } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';

const BrandDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('create');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (activeTab === 'analytics' && user) {
        setLoading(true);
        setError(null);
        try {
          const data = await apiService.dashboard.getBrandDashboard();
          setDashboardData(data);
        } catch (err) {
          console.error('Error fetching dashboard data:', err);
          setError(err.message || 'Failed to load dashboard data');
          setDashboardData(null);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();
  }, [activeTab, user]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'create':
        return (
          <div className="bg-white p-6 rounded-xl shadow border space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Create Campaign</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="border p-2 rounded" placeholder="Product Name" />
              <input className="border p-2 rounded" type="number" placeholder="Budget ($)" />
              <input className="border p-2 rounded" placeholder="Category (e.g., Fashion)" />
              <input className="border p-2 rounded" placeholder="Target Market (e.g., Teens, USA)" />
              <input className="border p-2 rounded" placeholder="Influencer Username" />
              <button
                type="submit"
                className="col-span-1 md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Submit Campaign
              </button>
            </form>
          </div>
        );

      case 'campaigns':
        return (
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">My Campaigns</h3>
            <ul className="space-y-3">
              <li className="p-3 bg-gray-100 rounded-md border">🎯 Campaign #1 - Influencer: @influencer123</li>
              <li className="p-3 bg-gray-100 rounded-md border">🎯 Campaign #2 - Category: Tech</li>
              <li className="p-3 bg-gray-100 rounded-md border">🎯 Campaign #3 - Budget: $5,000</li>
            </ul>
          </div>
        );

      case 'search':
        return (
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Search Influencers</h3>
            <p className="text-sm text-gray-600 mb-4">
              Explore and invite top influencers for your campaigns.
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Browse Influencers
            </button>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">My Profile</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><strong>Brand Name:</strong> YourBrand</div>
              <div><strong>Email:</strong> contact@yourbrand.com</div>
              <div><strong>Total Campaigns:</strong> 7</div>
              <div><strong>Total Budget:</strong> $32,500</div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Analytics</h3>
            {loading ? (
              <div className="text-center py-4">Loading analytics...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-600">Error: {error}</div>
            ) : dashboardData ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dashboardData.stats?.map((stat, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Profile Statistics</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><strong>Total Campaigns:</strong> {dashboardData.profileStats?.total_campaigns || 0}</div>
                    <div><strong>Collaborating Influencers:</strong> {dashboardData.profileStats?.collaborating_influencers || 0}</div>
                    <div><strong>Total Reach:</strong> {dashboardData.profileStats?.total_reach?.toLocaleString() || 0}</div>
                    <div><strong>Budget Spent:</strong> ${dashboardData.profileStats?.budget_spent?.toLocaleString() || 0}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p>📊 Campaign #1: 25K Reach, 3.2% Engagement</p>
                <p>📊 Campaign #2: 58K Reach, 5.1% Engagement</p>
                <p>📊 Campaign #3: 10K Reach, 2.0% Engagement</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const navItems = [
    { id: 'create', label: 'Create', icon: <Plus size={18} /> },
    { id: 'campaigns', label: 'My Campaigns', icon: <FileText size={18} /> },
    { id: 'search', label: 'Find Influencers', icon: <Search size={18} /> },
    { id: 'profile', label: 'My Profile', icon: <UserCircle size={18} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
  ];

  return (
    <div className="space-y-6 p-4 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900">Brand Dashboard</h2>

      {/* Tab Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`p-3 rounded-lg shadow flex items-center gap-2 justify-center ${
              activeTab === item.id ? 'bg-blue-600 text-white' : 'bg-white border'
            }`}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default BrandDashboard;