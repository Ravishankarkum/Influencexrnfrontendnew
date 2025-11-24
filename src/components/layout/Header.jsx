// Header Component
// This shows the top bar with menu button, help button,
// notifications, user info, and logout option.

import { Bell, HelpCircle, LogOut, Menu, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/api';

export function Header({ isSidebarOpen, toggleSidebar }) {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      if (user && showNotifications) {
        try {
          const data = await apiService.notifications.getAll();
          setNotifications(data);
          const unread = data.filter(notification => !notification.read).length;
          setUnreadCount(unread);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      }
    };

    fetchNotifications();
  }, [user, showNotifications]);
  
  // Determine what to display as the user's name
  const getUserDisplayName = () => {
    if (!user) return '';
    
    // For brands, show brand_name; for influencers, show username; fallback to email
    if (user.role === 'brand') {
      return user.brand_name || user.email;
    } else {
      return user.username || user.email;
    }
  };
  
  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      await apiService.notifications.markAsRead(id);
      setNotifications(prev => 
        prev.map(notification => 
          notification._id === id ? { ...notification, read: true } : notification
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Handle the "Need Help" button click
  const handleNeedHelp = () => {
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
    <>
      <header className="bg-white shadow-md border-b px-6 py-5" style={{ borderColor: '#e5e5e5' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-xl transition-all"
              style={{ color: '#0A192F' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6ffff'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <h1 className="text-2xl font-display font-semibold" style={{ color: '#0A192F' }}>
              {user?.role === 'brand' ? 'Brand Dashboard' : 'Influencer Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-5">
            {/* Need Help Button */}
            <button
              onClick={handleNeedHelp}
              className="p-3 rounded-xl transition-all group"
              style={{ color: '#222222' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6ffff'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              title="Need Help?"
            >
              <HelpCircle size={22} />
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications((prev) => !prev)}
                className="p-3 rounded-xl transition-all relative group"
                style={{ color: '#222222' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6ffff'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Bell size={22} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold" style={{ backgroundColor: '#00FFFF', color: '#0A192F' }}>
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-neutral-200 rounded-2xl shadow-soft-lg z-50 animate-slide-down">
                  <div className="p-5 text-base text-neutral-900 font-display font-semibold border-b border-neutral-200">
                    Notifications
                  </div>
                  <ul className="divide-y divide-neutral-100 text-sm max-h-96 overflow-y-auto scrollbar-thin">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <li 
                          key={notification._id} 
                          className={`p-4 hover:bg-primary-50 cursor-pointer transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                          onClick={() => markAsRead(notification._id)}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">
                              {notification.type === 'campaign_created' ? '📢' : '🔔'}
                            </span>
                            <div>
                              <p className="font-medium text-neutral-900">{notification.title}</p>
                              <p className="text-neutral-600">{notification.message}</p>
                              <p className="text-xs text-neutral-500 mt-1">
                                {new Date(notification.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="p-4 text-center text-neutral-500">
                        No notifications
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-neutral-50 transition-all cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-soft">
                <User size={18} className="text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-neutral-900">{getUserDisplayName()}</p>
                <p className="text-xs text-neutral-500 capitalize">{user?.role}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="p-3 rounded-xl hover:bg-error-50 hover:text-error-600 transition-all group"
              title="Logout"
            >
              <LogOut size={22} className="text-neutral-600 group-hover:text-error-600 transition-colors" />
            </button>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white p-8 rounded-2xl shadow-soft-xl w-96 animate-scale-in">
            <h2 className="text-2xl font-display font-semibold text-neutral-900 mb-3">Confirm Logout</h2>
            <p className="text-base text-neutral-600 mb-8">Are you sure you want to log out of your account?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="btn-outline px-6 py-3"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  logout();
                }}
                className="px-6 py-3 bg-error-500 text-white rounded-xl font-medium hover:bg-error-600 transition-all shadow-soft"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
