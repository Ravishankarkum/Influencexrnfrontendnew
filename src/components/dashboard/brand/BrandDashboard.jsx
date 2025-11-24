// Icons from lucide-react library
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

// ===============================
// Brand Dashboard Component
// ===============================
const BrandDashboard = () => {
  // Current logged-in user from Auth Context
  const { user } = useAuth();

  // Active selected tab (create, campaigns, search, profile, analytics)
  const [activeTab, setActiveTab] = useState('create');

  // Analytics data from backend
  const [dashboardData, setDashboardData] = useState(null);

  // Campaign list for brand
  const [campaigns, setCampaigns] = useState([]);

  // Loading and error states for API calls
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Controlled form state for creating new campaign
  const [campaignForm, setCampaignForm] = useState({
    title: '',
    description: '',
    budget: '',
    category: '',
    targetMarket: ''
  });

  // ===============================
  // Fetch analytics/campaigns whenever tab changes
  // ===============================
  useEffect(() => {
    const fetchDashboardData = async () => {
      // Fetch analytics only when analytics tab is active
      if (activeTab === 'analytics' && user) {
        setLoading(true);
        setError(null);
        try {
          const data = await apiService.dashboard.getBrandDashboard();
          setDashboardData(data); // Set dashboard analytics
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
      // Fetch campaign list only when campaigns tab is active
      if (activeTab === 'campaigns' && user) {
        setLoading(true);
        setError(null);
        try {
          const data = await apiService.campaigns.getAll();

          // Filter campaigns that belong to current brand
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
  }, [activeTab, user]); // re-run whenever tab or user changes

  // ===============================
  // Handle input changes in create campaign form
  // ===============================
  const handleCampaignFormChange = (e) => {
    const { name, value } = e.target;

    // Update controlled inputs
    setCampaignForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ===============================
  // Create new campaign handler
  // ===============================
  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const campaignData = {
        ...campaignForm,
        budget: parseFloat(campaignForm.budget) // Convert budget to number
      };
      
      await apiService.campaigns.create(campaignData); // API call to create campaign
      
      // Reset form fields after success
      setCampaignForm({
        title: '',
        description: '',
        budget: '',
        category: '',
        targetMarket: ''
      });
      
      // Fetch updated campaign list
      const data = await apiService.campaigns.getAll();
      const brandCampaigns = data.filter(campaign => campaign.brand._id === user._id);
      setCampaigns(brandCampaigns);
      
      // Switch to campaigns tab after creating a campaign
      setActiveTab('campaigns');
      
      alert('Campaign created successfully!');
    } catch (err) {
      console.error('Error creating campaign:', err);
      setError(err.message || 'Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Render tab-specific UI content
  // ===============================
  const renderTabContent = () => {
    switch (activeTab) {

      // -------------------------------------
      // CREATE CAMPAIGN TAB
      // -------------------------------------
      case 'create':
        return (
          <div className="bg-white p-6 rounded-xl shadow border space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Create New Campaign</h3>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Campaign creation form */}
            <form onSubmit={handleCreateCampaign} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Title input */}
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

              {/* Budget input */}
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

              {/* Category input */}
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

              {/* Target market input */}
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

              {/* Description textarea */}
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

              {/* Submit button */}
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

      // -------------------------------------
      // MY CAMPAIGNS TAB
      // -------------------------------------
      case 'campaigns':
        return (
          <div className="bg-white p-6 rounded-xl shadow border">

            {/* Tab title + create button */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">My Campaigns</h3>
              <button 
                onClick={() => setActiveTab('create')}
                className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                <Plus size={18} /> Create Campaign
              </button>
            </div>

            {/* Loading, error, or campaign list */}
            {loading ? (
              <div className="text-center py-4">Loading campaigns...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-600">Error: {error}</div>
            ) : campaigns.length > 0 ? (

              // List of campaigns
              <ul className="space-y-3">
                {campaigns.map((campaign) => (
                  <li key={campaign._id} className="p-4 bg-gray-100 rounded-md border">
                    <div className="flex justify-between items-start">

                      {/* Campaign details */}
                      <div>
                        <h4 className="font-semibold text-gray-900">{campaign.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{campaign.description}</p>

                        {/* Tags */}
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

                      {/* Created date */}
                      <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">
                        {new Date(campaign.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

            ) : (
              // Empty state UI
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

      // -------------------------------------
      // SEARCH INFLUENCERS TAB
      // -------------------------------------
      case 'search':
        return (
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Search Influencers</h3>
            <p className="text-sm text-gray-600 mb-4">
              Explore and invite top influencers for your campaigns.
            </p>

            {/* Dispatch custom event to parent router */}
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'influencers' }))}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Browse Influencers
            </button>
          </div>
        );

      // -------------------------------------
      // BRAND PROFILE TAB
      // -------------------------------------
      case 'profile':
        return (
          <div className="bg-white p-6 rounded-xl shadow border">

            <h3 className="text-xl font-semibold text-gray-900 mb-4">My Profile</h3>

            {/* Basic brand details */}
            <div className="grid grid-cols-2 gap-4">
              <div><strong>Brand Name:</strong> {user?.brand_name || 'N/A'}</div>
              <div><strong>Email:</strong> {user?.email || 'N/A'}</div>
              <div><strong>Total Campaigns:</strong> {campaigns.length}</div>

              {/* Total budget of all campaigns */}
              <div>
                <strong>Total Budget:</strong> $
                {campaigns.reduce((total, campaign) => total + campaign.budget, 0)}
              </div>
            </div>
          </div>
        );

      // -------------------------------------
      // ANALYTICS TAB
      // -------------------------------------
      case 'analytics':
        return (
          <div className="bg-white p-6 rounded-xl shadow border">

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Analytics</h3>

            {/* Loading & error states */}
            {loading ? (
              <div className="text-center py-4">Loading analytics...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-600">Error: {error}</div>
            ) : dashboardData ? (

              // Analytics content
              <div className="space-y-4">

                {/* Stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dashboardData.stats?.map((stat, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change}</p>
                    </div>
                  ))}
                </div>

                {/* Profile analytics summary */}
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
              // Fallback demo analytics if API fails
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

  // ---------------------
  // Tab Navigation Items
  // ---------------------
  const navItems = [
    { id: 'create', label: 'Create Campaign', icon: <Plus size={18} /> },
    { id: 'campaigns', label: 'My Campaigns', icon: <FileText size={18} /> },
    { id: 'search', label: 'Find Influencers', icon: <Search size={18} /> },
    { id: 'profile', label: 'My Profile', icon: <UserCircle size={18} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
  ];

  return (
    <div className="space-y-6 p-4 md:p-8">
      
      {/* Page title */}
      <h2 className="text-2xl font-bold text-gray-900">Brand Dashboard</h2>

      {/* Tab Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)} // Change tab on click
            className={`p-3 rounded-lg shadow flex items-center gap-2 justify-center ${
              activeTab === item.id ? 'bg-blue-600 text-white' : 'bg-white border'
            }`}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>

      {/* Render selected tab content */}
      {renderTabContent()}
    </div>
  );
};

export default BrandDashboard;
