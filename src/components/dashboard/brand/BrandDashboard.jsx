import {
  BarChart3,
  FileText,
  Plus,
  Search,
  UserCircle
} from 'lucide-react';
import { useState } from 'react';

const BrandDashboard = () => {
  const [activeTab, setActiveTab] = useState('create');

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
            <div className="space-y-3">
              <p>📊 Campaign #1: 25K Reach, 3.2% Engagement</p>
              <p>📊 Campaign #2: 58K Reach, 5.1% Engagement</p>
              <p>📊 Campaign #3: 10K Reach, 2.0% Engagement</p>
            </div>
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
