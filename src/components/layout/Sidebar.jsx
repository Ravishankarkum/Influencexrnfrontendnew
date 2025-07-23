import { BarChart3, Lamp as Campaign, FileText, Home, MessageSquare, Search, Settings, TrendingUp, Users, Wallet } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Sidebar({ activeSection, setActiveSection, isOpen }) {
  const { user } = useAuth();

  const brandMenuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'campaigns', icon: Campaign, label: 'My Campaigns' },
    { id: 'create-campaign', icon: FileText, label: 'Create Campaign' },
    { id: 'influencers', icon: Users, label: 'Find Influencers' },
    { id: 'collaborations', icon: MessageSquare, label: 'Collaborations' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const influencerMenuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'profile', icon: Users, label: 'My Profile' }, // ✅ FIXED: using Users icon
    { id: 'discover', icon: Search, label: 'Discover Campaigns' },
    { id: 'my-campaigns', icon: Campaign, label: 'My Applications' },
    { id: 'collaborations', icon: MessageSquare, label: 'Active Projects' },
    { id: 'earnings', icon: Wallet, label: 'Earnings' },
    { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const menuItems = user?.userType === 'brand' ? brandMenuItems : influencerMenuItems;

  return (
    <aside className={`
      bg-white shadow-lg border-r border-gray-200 transition-all duration-300 z-20
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 fixed lg:relative h-full w-64
    `}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            InfluenceXrN
          </h2>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${activeSection === item.id 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
