// Sidebar Component
// This shows the left menu for brand and influencer dashboards.
// It loads menu items based on user role and includes support button.

import {
  BarChart3,
  FileText,
  Handshake,
  Home,
  MessageSquare,
  Plus,
  Search,
  Settings,
  TrendingUp,
  Users,
  Wallet
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Sidebar({ isOpen, activeSection, setActiveSection, goToLanding }) {
  const { user } = useAuth();

  const brandMenuItems = [
    { id: 'create-campaign', icon: Plus, label: 'Create Campaign' },
    { id: 'campaigns', icon: FileText, label: 'My Campaigns' },
    { id: 'influencers', icon: Search, label: 'Find Influencers' },
    { id: 'profile', icon: Users, label: 'My Profile' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const influencerMenuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'profile', icon: Users, label: 'My Profile' },
    { id: 'discover', icon: Search, label: 'Discover Campaigns' },
    // { id: 'my-campaigns', icon: Campaign, label: 'My Applications' },
    { id: 'collaborations', icon: MessageSquare, label: 'Active Projects' },
    { id: 'earnings', icon: Wallet, label: 'Earnings' },
    { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const menuItems = user?.role === 'brand' ? brandMenuItems : influencerMenuItems;

  // Handle the "Get Support" button click
  const handleGetSupport = () => {
    // Create a support email with pre-filled information
    const subject = `Support Request - ${user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)} Dashboard`;
    const body = `
Hello Support Team,

I need help with the ${user?.role} dashboard.

User Information:
- User ID: ${user?._id || 'N/A'}
- Email: ${user?.email || 'N/A'}
- Role: ${user?.role || 'N/A'}
- Name: ${user?.brand_name || user?.username || 'N/A'}

Please describe your issue below:
[Please describe your issue in detail here]

Screenshots (if applicable):
[Attach any relevant screenshots here]
    `.trim();

    // Open the default email client with pre-filled information
    window.location.href = `mailto:support@collabify.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <aside
      className={`shadow-lg border-r transition-all duration-300 z-20
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 fixed lg:relative h-full w-72`}
      style={{ backgroundColor: '#0A192F', borderColor: '#0A192F' }}
    >
      <div className="p-8 h-full flex flex-col">
        {/* Made the logo container clickable to go to landing page */}
        <div className="flex items-center gap-3 mb-12 cursor-pointer" onClick={goToLanding}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#00FFFF' }}>
            <Handshake size={24} style={{ color: '#0A192F' }} />
          </div>
          <h2 className="text-2xl font-display font-bold" style={{ color: '#00FFFF' }}>
            Collabify
          </h2>
        </div>

        <nav className="space-y-2 flex-1">
          {menuItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 group
                ${activeSection === id
                  ? 'text-primary-500'
                  : 'text-white/70 hover:text-white'}
              `}
              style={activeSection === id ? { backgroundColor: '#00FFFF', color: '#0A192F' } : {}}
            >
              <Icon size={22} />
              <span className="font-medium text-base whitespace-nowrap">{label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 p-5 rounded-2xl border" style={{ backgroundColor: '#0A192F', borderColor: '#00FFFF' }}>
          <p className="text-sm font-medium text-white mb-2">Need Help?</p>
          <p className="text-xs mb-4" style={{ color: '#ffffff99' }}>Contact our support team</p>
          <button 
            className="w-full btn-primary text-sm py-2"
            onClick={handleGetSupport}
          >
            Get Support
          </button>
        </div>
      </div>
    </aside>
  );
}
