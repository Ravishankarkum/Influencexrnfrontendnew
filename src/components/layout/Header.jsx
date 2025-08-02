import { Bell, LogOut, Menu, User, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export function Header({ isSidebarOpen, toggleSidebar }) {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              {user?.role === 'brand' ? 'Brand Dashboard' : 'Influencer Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications((prev) => !prev)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              >
                <Bell size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4 text-sm text-gray-700 font-medium border-b">
                    Notifications
                  </div>
                  <ul className="divide-y text-sm">
                    <li className="p-3 hover:bg-gray-50 cursor-pointer">
                      📢 New campaign offer from BrandX
                    </li>
                    <li className="p-3 hover:bg-gray-50 cursor-pointer">
                      💰 Your payment for Campaign Y has been processed
                    </li>
                    <li className="p-3 hover:bg-gray-50 cursor-pointer">
                      ✅ Campaign Z marked as completed
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="p-2 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Logout</h2>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  logout();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}