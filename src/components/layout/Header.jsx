import { Bell, LogOut, Menu, User, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export function Header({ isSidebarOpen, toggleSidebar }) {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

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
                <span className="absolute top-1 right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold" style={{ backgroundColor: '#00FFFF', color: '#0A192F' }}>
                  3
                </span>
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-neutral-200 rounded-2xl shadow-soft-lg z-50 animate-slide-down">
                  <div className="p-5 text-base text-neutral-900 font-display font-semibold border-b border-neutral-200">
                    Notifications
                  </div>
                  <ul className="divide-y divide-neutral-100 text-sm max-h-96 overflow-y-auto scrollbar-thin">
                    <li className="p-4 hover:bg-primary-50 cursor-pointer transition-colors">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">📢</span>
                        <div>
                          <p className="font-medium text-neutral-900">New campaign offer from BrandX</p>
                          <p className="text-xs text-neutral-500 mt-1">2 hours ago</p>
                        </div>
                      </div>
                    </li>
                    <li className="p-4 hover:bg-primary-50 cursor-pointer transition-colors">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">💰</span>
                        <div>
                          <p className="font-medium text-neutral-900">Payment processed</p>
                          <p className="text-xs text-neutral-500 mt-1">5 hours ago</p>
                        </div>
                      </div>
                    </li>
                    <li className="p-4 hover:bg-primary-50 cursor-pointer transition-colors">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">✅</span>
                        <div>
                          <p className="font-medium text-neutral-900">Campaign Z completed</p>
                          <p className="text-xs text-neutral-500 mt-1">1 day ago</p>
                        </div>
                      </div>
                    </li>
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
                <p className="text-sm font-semibold text-neutral-900">{user?.email}</p>
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
