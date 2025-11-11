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
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [campaignForm, setCampaignForm] = useState({
    title: '',
    description: '',
    budget: '',
    category: '',
    targetMarket: ''
  });

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

    const fetchCampaigns = async () => {
      if (activeTab === 'campaigns' && user) {
        setLoading(true);
        setError(null);
        try {
          const data = await apiService.campaigns.getAll();
          // Filter campaigns by current brand
          const brandCampaigns = data.filter(campaign => campaign.brand._id === user._id);
          setCampaigns(brandCampaigns);
        } catch (err) {
          console.error('Error fetching campaigns:', err);
          setError(err.message || 'Failed to load campaigns');
          setCampaigns([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();
    fetchCampaigns();
  }, [activeTab, user]);

  const handleCampaignFormChange = (e) => {
    const { name, value } = e.target;
    setCampaignForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const campaignData = {
        ...campaignForm,
        budget: parseFloat(campaignForm.budget)
      };
      
      await apiService.campaigns.create(campaignData);
      
      // Reset form
      setCampaignForm({
        title: '',
        description: '',
        budget: '',
        category: '',
        targetMarket: ''
      });
      
      // Refresh campaigns list
      const data = await apiService.campaigns.getAll();
      const brandCampaigns = data.filter(campaign => campaign.brand._id === user._id);
      setCampaigns(brandCampaigns);
      
      // Switch to campaigns tab to show the newly created campaign
      setActiveTab('campaigns');
      
      alert('Campaign created successfully!');
    } catch (err) {
      console.error('Error creating campaign:', err);
      setError(err.message || 'Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'create':
        return (
          <div className="bg-white p-6 rounded-xl shadow border space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Create New Campaign</h3>
            </div>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            <form onSubmit={handleCreateCampaign} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input 
                  name="title"
                  value={campaignForm.title}
                  onChange={handleCampaignFormChange}
                  className="border p-2 rounded w-full"
                  placeholder="Product Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
                <input 
                  name="budget"
                  type="number"
                  value={campaignForm.budget}
                  onChange={handleCampaignFormChange}
                  className="border p-2 rounded w-full"
                  placeholder="Budget ($)"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input 
                  name="category"
                  value={campaignForm.category}
                  onChange={handleCampaignFormChange}
                  className="border p-2 rounded w-full"
                  placeholder="Category (e.g., Fashion)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Market</label>
                <input 
                  name="targetMarket"
                  value={campaignForm.targetMarket}
                  onChange={handleCampaignFormChange}
                  className="border p-2 rounded w-full"
                  placeholder="Target Market (e.g., Teens, USA)"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  name="description"
                  value={campaignForm.description}
                  onChange={handleCampaignFormChange}
                  className="border p-2 rounded w-full"
                  placeholder="Campaign description"
                  rows="3"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`col-span-1 md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Creating Campaign...' : 'Create Campaign'}
              </button>
            </form>
          </div>
        );

      case 'campaigns':
        return (
          <div className="bg-white p-6 rounded-xl shadow border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">My Campaigns</h3>
              <button 
                onClick={() => setActiveTab('create')}
                className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                <Plus size={18} /> Create Campaign
              </button>
            </div>
            {loading ? (
              <div className="text-center py-4">Loading campaigns...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-600">Error: {error}</div>
            ) : campaigns.length > 0 ? (
              <ul className="space-y-3">
                {campaigns.map((campaign) => (
                  <li key={campaign._id} className="p-4 bg-gray-100 rounded-md border">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{campaign.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{campaign.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            Budget: ${campaign.budget}
                          </span>
                          {campaign.category && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              {campaign.category}
                            </span>
                          )}
                          {campaign.targetMarket && (
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                              {campaign.targetMarket}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">
                        {new Date(campaign.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>You haven't created any campaigns yet.</p>
                <button 
                  onClick={() => setActiveTab('create')}
                  className="mt-4 flex items-center gap-1 mx-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  <Plus size={18} /> Create Your First Campaign
                </button>
              </div>
            )}
          </div>
        );

      case 'search':
        return (
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Search Influencers</h3>
            <p className="text-sm text-gray-600 mb-4">
              Explore and invite top influencers for your campaigns.
            </p>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'influencers' }))}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Browse Influencers
            </button>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">My Profile</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><strong>Brand Name:</strong> {user?.brand_name || 'N/A'}</div>
              <div><strong>Email:</strong> {user?.email || 'N/A'}</div>
              <div><strong>Total Campaigns:</strong> {campaigns.length}</div>
              <div><strong>Total Budget:</strong> ${campaigns.reduce((total, campaign) => total + campaign.budget, 0)}</div>
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
    { id: 'create', label: 'Create Campaign', icon: <Plus size={18} /> },
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